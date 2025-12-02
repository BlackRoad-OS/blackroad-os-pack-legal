import { createTwoFilesPatch } from 'diff';

export type DiffOptions = {
  oldLabel?: string;
  newLabel?: string;
};

export const generateRedline = (
  oldContent: string,
  newContent: string,
  options: DiffOptions = {},
) => {
  const { oldLabel = 'previous', newLabel = 'current' } = options;
  return createTwoFilesPatch(oldLabel, newLabel, oldContent, newContent, '', '');
};
