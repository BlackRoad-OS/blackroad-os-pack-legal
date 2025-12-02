export interface ComplianceChecklist {
  dpa_checklist?: Record<string, unknown>;
  data_flows?: string[];
}

export interface ComplianceFlag {
  area: string;
  issue: string;
  severity: "low" | "medium" | "high";
}

export function scanChecklist(checklist: ComplianceChecklist): ComplianceFlag[] {
  const flags: ComplianceFlag[] = [];

  const dpaChecklist = checklist.dpa_checklist || {};
  const requiredKeys = [
    "data_subjects_identified",
    "processors_listed",
    "subprocessor_mechanism_defined",
    "cross_border_transfers_considered",
    "security_measures_described",
  ];

  requiredKeys.forEach((key) => {
    let value: unknown = undefined;
    if (Object.prototype.hasOwnProperty.call(dpaChecklist, key)) {
      value = (dpaChecklist as Record<string, unknown>)[key];
    }
    if (value === false || value === undefined) {
      flags.push({
        area: "DPA",
        issue: `${key} appears incomplete`,
        severity: "medium",
      });
    }
  });

  const dataFlows = checklist.data_flows || [];
  if (dataFlows.length === 0) {
    flags.push({
      area: "Data Mapping",
      issue: "No data flows documented",
      severity: "medium",
    });
  }

  return flags;
}

export function generateQuestionsForCounsel(flags: ComplianceFlag[]): string[] {
  if (!flags.length) {
    return ["No flags detected; confirm assumptions with counsel before proceeding."];
  }
  return flags.map(
    (flag) =>
      `How should we address ${flag.issue} in the ${flag.area} area? Seek counsel guidance.`
  );
}
