#!/usr/bin/env ts-node
import fs from 'fs';
import path from 'path';
import { Command } from 'commander';
import matter from 'gray-matter';
import { renderContract } from '../agents/render_contract';
import { generateRedline } from '../agents/diff_versions';
import { listTemplates } from '../lib/template';
import { lintPolicies } from '../agents/policy_linter';

const program = new Command();

const contractsDir = path.join(__dirname, '..', 'contracts');
const policiesDir = path.join(__dirname, '..', 'policies');

const loadMetadata = (file: string) => {
  const raw = fs.readFileSync(file, 'utf-8');
  return matter(raw).data as Record<string, unknown>;
};

program
  .name('br-legal')
  .description('BlackRoad OS legal toolkit')
  .version('0.1.0');

program
  .command('list')
  .description('List contracts and policies')
  .action(() => {
    const contracts = listTemplates(contractsDir).map((file) => ({
      kind: 'contract',
      file: path.basename(file),
      ...(loadMetadata(file) as Record<string, string>),
    }));

    const policies = listTemplates(policiesDir).map((file) => ({
      kind: 'policy',
      file: path.basename(file),
      ...(loadMetadata(file) as Record<string, string>),
    }));

    console.table([...contracts, ...policies]);
  });

program
  .command('render')
  .argument('<slug>', 'contract slug, e.g., nda')
  .description('Render a contract with variables')
  .option('-v, --var <kv...>', 'variables as key=value pairs')
  .action(async (slug, options) => {
    const vars: Record<string, string> = {};
    (options.var || []).forEach((entry: string) => {
      const [key, ...valueParts] = entry.split('=');
      vars[key] = valueParts.join('=');
    });

    const result = await renderContract(slug, vars);
    process.stdout.write(result.content);
  });

program
  .command('diff')
  .argument('<oldFile>', 'path to old contract version')
  .argument('<newFile>', 'path to new contract version')
  .description('Generate a redline diff between two versions')
  .action((oldFile, newFile) => {
    const oldContent = fs.readFileSync(path.resolve(oldFile), 'utf-8');
    const newContent = fs.readFileSync(path.resolve(newFile), 'utf-8');
    const patch = generateRedline(oldContent, newContent, {
      oldLabel: oldFile,
      newLabel: newFile,
    });

    process.stdout.write(patch);
  });

program
  .command('lint-policies')
  .description('Check policies for required sections')
  .action(() => {
    const results = lintPolicies(policiesDir);
    results.forEach((result) => {
      if (result.issues.length === 0) {
        console.log(`✅ ${path.basename(result.file)} passed`);
      } else {
        console.warn(`⚠️ ${path.basename(result.file)} issues:`);
        result.issues.forEach((issue) => console.warn(` - ${issue}`));
      }
    });
  });

program.parse(process.argv);
