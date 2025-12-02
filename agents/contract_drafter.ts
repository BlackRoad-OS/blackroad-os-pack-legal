export interface DealSummary {
  value: number;
  termMonths: number;
  exclusivity?: string;
  services: string[];
}

export interface PartyInfo {
  customerName: string;
  providerName: string;
  jurisdictions?: string[];
}

export interface ContractOutlineSection {
  title: string;
  notes: string[];
}

export interface ContractOutline {
  parties: PartyInfo;
  deal: DealSummary;
  sections: ContractOutlineSection[];
  counsel_questions: string[];
}

export interface RiskHighlight {
  section: string;
  concern: string;
  severity: "low" | "medium" | "high";
  advisory: string;
}

export function draftContractOutline(
  deal: DealSummary,
  partyInfo: PartyInfo
): ContractOutline {
  const sections: ContractOutlineSection[] = [
    {
      title: "Scope of Services",
      notes: [
        "Describe deliverables and milestones",
        "Clarify service levels and acceptance criteria",
      ],
    },
    {
      title: "Term & Termination",
      notes: [
        `Initial term: ${deal.termMonths} months`,
        "Termination for convenience vs. cause",
      ],
    },
    {
      title: "Fees & Payment",
      notes: [
        `Commercial value guidance: ${deal.value}`,
        "Invoicing cadence and late payment handling",
      ],
    },
    {
      title: "IP Ownership",
      notes: ["Clarify pre-existing vs. new IP", "License scope and restrictions"],
    },
    {
      title: "Confidentiality",
      notes: ["Definition of confidential information", "Exclusions and duration"],
    },
    {
      title: "Data Protection",
      notes: ["Security measures and data handling", "DPA requirements if applicable"],
    },
    {
      title: "Warranties / Disclaimers",
      notes: ["Align warranty scope to services", "No implied guarantees"],
    },
    {
      title: "Indemnity",
      notes: ["Who defends and indemnifies for what", "Caps and procedures"],
    },
    {
      title: "Limitation of Liability",
      notes: ["Overall cap tied to fees", "Exclusions like indirect damages"],
    },
    {
      title: "Governing Law / Venue",
      notes: ["Avoid changing without counsel", "Check alignment with operations"],
    },
    {
      title: "Miscellaneous",
      notes: ["Assignment, notices, entire agreement", "Order of precedence"],
    },
  ];

  const counsel_questions = [
    "Are exclusivity terms acceptable for the business context?",
    "Should any data protection addenda be attached?",
    "Are indemnity caps and baskets appropriate for the risk profile?",
  ];

  return { parties: partyInfo, deal, sections, counsel_questions };
}

export function highlightRiskAreas(outline: ContractOutline): RiskHighlight[] {
  const risks: RiskHighlight[] = [];

  const exclusivity = outline.deal.exclusivity?.toLowerCase() || "";
  if (exclusivity.includes("lifetime") || exclusivity.includes("exclusive")) {
    risks.push({
      section: "Term & Termination",
      concern: "Exclusivity terms may be too broad or lengthy",
      severity: "high",
      advisory: "Ask counsel to review exclusivity scope and escape rights.",
    });
  }

  const termMonths = outline.deal.termMonths;
  if (termMonths > 48) {
    risks.push({
      section: "Term & Termination",
      concern: "Unusually long initial term without review gates",
      severity: "medium",
      advisory: "Confirm renewal mechanics and termination rights.",
    });
  }

  if (!outline.sections.some((section) => section.title === "Data Protection")) {
    risks.push({
      section: "Data Protection",
      concern: "Data handling terms appear missing",
      severity: "high",
      advisory: "Include security and DPA alignment before execution.",
    });
  }

  return risks;
}
