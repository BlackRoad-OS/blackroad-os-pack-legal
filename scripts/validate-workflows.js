const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const YAML = require('yaml');

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const schema = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'schemas', 'workflow.schema.json'), 'utf8'));
const validate = ajv.compile(schema);

function validateWorkflow(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = YAML.parse(raw);
  const valid = validate(data);
  if (!valid) {
    console.error(`Validation failed for ${filePath}:`, validate.errors);
    process.exitCode = 1;
    return;
  }
  if (data.not_legal_advice !== true) {
    console.error(`Workflow ${filePath} must include not_legal_advice: true`);
    process.exitCode = 1;
  }
}

const workflowsDir = path.join(process.cwd(), 'workflows');
fs.readdirSync(workflowsDir)
  .filter((file) => file.endsWith('.workflow.yaml'))
  .forEach((file) => validateWorkflow(path.join(workflowsDir, file)));

console.log('Workflow validation complete');
