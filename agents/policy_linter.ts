import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PolicyLint = {
  file: string;
  issues: string[];
};

const requiredSections = ['GDPR', 'CCPA'];

const hasSection = (content: string, keyword: string) => {
  // Match lines that start with one or more '#' followed by optional whitespace and the keyword as a word
  const headerRegex = new RegExp(`^#+\\s*${keyword}\\b`, 'im');
  return headerRegex.test(content);
};

export const lintPolicy = (filePath: string): PolicyLint => {
  const absolutePath = path.resolve(filePath);
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  const parsed = matter(raw);
  const issues = requiredSections
    .filter((section) => !hasSection(parsed.content, section))
    .map((section) => `Missing ${section} section`);

  return { file: absolutePath, issues };
};

export const lintPolicies = (dir: string): PolicyLint[] => {
  const absoluteDir = path.resolve(dir);
  return fs
    .readdirSync(absoluteDir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => path.join(absoluteDir, file))
    .map((file) => lintPolicy(file));
};
