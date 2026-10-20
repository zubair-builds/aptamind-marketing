import { deploymentConfigurationIssues } from '../lib/deployment-config';

const issues = deploymentConfigurationIssues(process.env);

if (issues.length) {
  process.stderr.write(`Deployment environment is incomplete:\n- ${issues.join('\n- ')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write('Deployment environment is complete.\n');
}
