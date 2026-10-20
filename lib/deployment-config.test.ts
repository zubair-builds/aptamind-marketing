import { describe, expect, it } from 'vitest';
import { assertDeploymentEnvironment, deploymentConfigurationIssues } from './deployment-config';

const validEnvironment = {
  PUBLIC_SITE_URL: 'https://aptamind.example',
  WAITLIST_DATABASE_URL: 'postgresql://runtime:secret@database.example/aptamind?sslmode=require',
  WAITLIST_HASH_KEY: 'a-random-secret-with-more-than-32-characters',
  NEXT_PUBLIC_CONTACT_EMAIL: 'privacy@aptamind.example',
};

describe('deployment environment', () => {
  it('accepts a complete production configuration', () => {
    expect(() => assertDeploymentEnvironment(validEnvironment)).not.toThrow();
  });

  it('requires an HTTPS origin without a path', () => {
    expect(
      deploymentConfigurationIssues({ ...validEnvironment, PUBLIC_SITE_URL: 'http://localhost:3001/site' }),
    ).toEqual(
      expect.arrayContaining([
        'PUBLIC_SITE_URL must use HTTPS.',
        'PUBLIC_SITE_URL must contain only the public origin.',
      ]),
    );
  });

  it('rejects placeholder secrets and contact details', () => {
    expect(
      deploymentConfigurationIssues({
        ...validEnvironment,
        WAITLIST_HASH_KEY: 'replace-with-at-least-32-random-characters',
        NEXT_PUBLIC_CONTACT_EMAIL: 'hello@example.com',
      }),
    ).toHaveLength(2);
  });

  it('rejects memory storage for a deployment', () => {
    expect(deploymentConfigurationIssues({ ...validEnvironment, WAITLIST_STORAGE: 'memory' })).toContain(
      'WAITLIST_STORAGE=memory is not permitted for deployment.',
    );
  });
});
