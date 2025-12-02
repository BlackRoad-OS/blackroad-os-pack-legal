import { scanChecklist, generateQuestionsForCounsel } from '../agents/compliance_radar';

describe('compliance_radar', () => {
  it('flags missing DPA checklist items', () => {
    const flags = scanChecklist({ dpa_checklist: { data_subjects_identified: false } });
    expect(flags.length).toBeGreaterThan(0);
  });

  it('generates counsel questions from flags', () => {
    const flags = scanChecklist({ dpa_checklist: {} });
    const questions = generateQuestionsForCounsel(flags);
    expect(questions.some((q) => q.includes('DPA'))).toBe(true);
  });
});
