import { draftContractOutline, highlightRiskAreas, DealSummary, PartyInfo } from '../agents/contract_drafter';

describe('contract_drafter', () => {
  const deal: DealSummary = {
    value: 100000,
    termMonths: 60,
    exclusivity: 'lifetime exclusivity',
    services: ['implementation', 'support'],
  };

  const partyInfo: PartyInfo = {
    customerName: 'Example Corp',
    providerName: 'Service Co',
    jurisdictions: ['US'],
  };

  it('creates a contract outline with expected sections', () => {
    const outline = draftContractOutline(deal, partyInfo);
    const titles = outline.sections.map((section) => section.title);
    expect(titles).toEqual(
      expect.arrayContaining([
        'Scope of Services',
        'Fees & Payment',
        'Term & Termination',
      ])
    );
  });

  it('highlights risk areas for concerning terms', () => {
    const outline = draftContractOutline(deal, partyInfo);
    const risks = highlightRiskAreas(outline);
    expect(risks.length).toBeGreaterThan(0);
    const concernTitles = risks.map((risk) => risk.section);
    expect(concernTitles).toContain('Term & Termination');
  });
});
