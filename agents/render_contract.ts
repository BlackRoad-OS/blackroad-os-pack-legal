import path from 'path';
import { renderTemplate, RenderResult } from '../lib/template';

const CONTRACT_DIR = path.join(__dirname, '..', 'contracts');

export const resolveContractPath = (slug: string) =>
  path.join(CONTRACT_DIR, `${slug}.md`);

export const renderContract = async (
  slug: string,
  variables: Record<string, unknown>,
): Promise<RenderResult> => {
  const contractPath = resolveContractPath(slug);
  return renderTemplate(contractPath, variables);
};
