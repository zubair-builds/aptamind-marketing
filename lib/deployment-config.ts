type Environment = Record<string, string | undefined>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parsedUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export function deploymentConfigurationIssues(environment: Environment) {
  const issues: string[] = [];
  const siteUrl = parsedUrl(environment.PUBLIC_SITE_URL);
  if (!siteUrl) {
    issues.push('PUBLIC_SITE_URL must be a valid URL.');
  } else {
    if (siteUrl.protocol !== 'https:') issues.push('PUBLIC_SITE_URL must use HTTPS.');
    if (siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
      issues.push('PUBLIC_SITE_URL must contain only the public origin.');
    }
    if (siteUrl.username || siteUrl.password) {
      issues.push('PUBLIC_SITE_URL must not contain credentials.');
    }
  }

  const databaseUrl = parsedUrl(environment.WAITLIST_DATABASE_URL);
  if (!databaseUrl || !['postgres:', 'postgresql:'].includes(databaseUrl.protocol)) {
    issues.push('WAITLIST_DATABASE_URL must be a PostgreSQL connection URL.');
  }

  const hashKey = environment.WAITLIST_HASH_KEY ?? '';
  if (hashKey.length < 32 || hashKey.includes('replace-with')) {
    issues.push('WAITLIST_HASH_KEY must be a non-placeholder value of at least 32 characters.');
  }

  const contactEmail = environment.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? '';
  if (!emailPattern.test(contactEmail) || contactEmail.endsWith('@example.com')) {
    issues.push('NEXT_PUBLIC_CONTACT_EMAIL must be a monitored, non-placeholder email address.');
  }

  if (environment.WAITLIST_STORAGE === 'memory') {
    issues.push('WAITLIST_STORAGE=memory is not permitted for deployment.');
  }

  return issues;
}

export function assertDeploymentEnvironment(environment: Environment) {
  const issues = deploymentConfigurationIssues(environment);
  if (issues.length) {
    throw new Error(`Deployment environment is incomplete:\n- ${issues.join('\n- ')}`);
  }
}
