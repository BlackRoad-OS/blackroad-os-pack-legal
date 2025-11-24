const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const YAML = require('yaml');

const ajv = new Ajv();

function validateFile(schemaPath, dataPath, format = 'json') {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const validator = ajv.compile(schema);
  const raw = fs.readFileSync(dataPath, 'utf8');
  const data = format === 'yaml' ? YAML.parse(raw) : JSON.parse(raw);
  const valid = validator(data);
  if (!valid) {
    console.error(`Validation failed for ${dataPath}:`, validator.errors);
    process.exitCode = 1;
  }
}

const repoRoot = process.cwd();
validateFile(path.join(repoRoot, 'schemas', 'legal_pack.schema.json'), path.join(repoRoot, 'pack.yaml'), 'yaml');
console.log('pack.yaml validated against legal_pack.schema.json');
