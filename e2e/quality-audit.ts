import { existsSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright-core';

const baseUrl = process.env.MARKETING_QA_URL ?? 'http://127.0.0.1:3001';
const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const executablePath = process.env.BROWSER_EXECUTABLE_PATH ?? (existsSync(macChrome) ? macChrome : undefined);

if (!executablePath) {
  throw new Error('Set BROWSER_EXECUTABLE_PATH to a Chromium-compatible browser.');
}

const routes = [
  { path: '/', heading: 'A clearer operating picture, assembled from every source.', status: 200 },
  { path: '/privacy', heading: 'Privacy notice', status: 200 },
  { path: '/terms', heading: 'Website terms', status: 200 },
  { path: '/missing-page', heading: "This page isn't connected.", status: 404 },
] as const;

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'compact-desktop', width: 1024, height: 768 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'minimum-mobile', width: 360, height: 800 },
] as const;

const failures: string[] = [];
const browser = await chromium.launch({ executablePath, headless: true });

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));

    for (const route of routes) {
      consoleErrors.length = 0;
      const response = await page.goto(new URL(route.path, baseUrl).href, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(150);
      const prefix = `${viewport.name} ${route.path}`;

      if (response?.status() !== route.status) {
        failures.push(`${prefix}: expected HTTP ${route.status}, received ${response?.status() ?? 'none'}`);
      }

      const headings = await page.getByRole('heading', { level: 1 }).allTextContents();
      if (headings.length !== 1 || headings[0]?.trim() !== route.heading) {
        failures.push(
          `${prefix}: expected one h1 named "${route.heading}", received ${JSON.stringify(headings)}`,
        );
      }

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 1) failures.push(`${prefix}: horizontal overflow is ${overflow}px`);

      const axe = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      for (const violation of axe.violations) {
        failures.push(
          `${prefix}: axe ${violation.id} (${violation.impact ?? 'unknown'}) at ${violation.nodes
            .map((node) => node.target.join(' '))
            .join(', ')}`,
        );
      }

      for (const error of consoleErrors) {
        const expectedDevCspWarning =
          error.includes('eval() is not supported in this environment') &&
          error.includes('React will never use eval() in production mode');
        const expectedNotFoundResource =
          route.status === 404 && error.includes('Failed to load resource') && error.includes('404');
        if (!expectedDevCspWarning && !expectedNotFoundResource) {
          failures.push(`${prefix}: console ${error}`);
        }
      }
    }

    await context.close();
  }

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  const internalLinks = await page
    .locator('a[href]')
    .evaluateAll((anchors) =>
      Array.from(
        new Set(
          anchors
            .map((anchor) => (anchor as HTMLAnchorElement).href)
            .filter((href) => href.startsWith(location.origin) && !href.includes('#')),
        ),
      ),
    );
  for (const href of internalLinks) {
    const response = await context.request.get(href);
    if (!response.ok()) failures.push(`link ${href}: HTTP ${response.status()}`);
  }
  await context.close();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`Marketing quality audit failed (${failures.length}):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Marketing quality audit passed (${routes.length} routes × ${viewports.length} viewports).`);
}
