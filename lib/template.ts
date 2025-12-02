import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Liquid } from 'liquidjs';
import { validateMetadata, DocMetadata } from './schema';

const engine = new Liquid({
  extname: '.md',
  cache: false,
});

export type RenderResult = {
  metadata: DocMetadata;
  content: string;
};

export const renderTemplate = async (
  filePath: string,
  variables: Record<string, unknown>,
): Promise<RenderResult> => {
  const absolutePath = path.resolve(filePath);
  const raw = fs.readFileSync(absolutePath, 'utf-8');
  const parsed = matter(raw);
  const metadata = validateMetadata(parsed.data);
  const rendered = await engine.parseAndRender(parsed.content, variables);

  return {
    metadata,
    content: rendered.trim() + '\n',
  };
};

export const listTemplates = (dir: string) => {
  const absoluteDir = path.resolve(dir);
  return fs
    .readdirSync(absoluteDir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => path.join(absoluteDir, file));
};
