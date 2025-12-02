"""
Policy steward agent helpers for summarizing changes and suggesting communication plans.
All outputs are informational only and are not legal advice.
"""
from typing import Dict, List


def summarize_policy_change(old: Dict, new: Dict) -> Dict:
  """
  Produce a high-level diff summary between old and new policy representations.
  This function highlights keys added, removed, or modified for human review.
  """
  summary = {
      "added": [],
      "removed": [],
      "modified": [],
      "disclaimer": "Outputs are drafts only; consult counsel before relying on them.",
  }

  old_keys = set(old.keys())
  new_keys = set(new.keys())

  summary["added"] = sorted(new_keys - old_keys)
  summary["removed"] = sorted(old_keys - new_keys)

  modified = []
  for key in old_keys & new_keys:
      if old.get(key) != new.get(key):
          modified.append({
              "field": key,
              "from": old.get(key),
              "to": new.get(key),
          })
  summary["modified"] = modified
  return summary


def generate_change_log_entry(change_summary: Dict) -> str:
  """
  Generate a concise change log entry suitable for an internal update note.
  """
  added = ", ".join(change_summary.get("added", [])) or "no new sections"
  removed = ", ".join(change_summary.get("removed", [])) or "no removals"
  modified = ", ".join([item.get("field", "") for item in change_summary.get("modified", [])])
  modified_display = modified or "no modifications"
  return (
      "Policy update: added {added}; removed {removed}; modified {modified}. "
      "Draft only; confirm with legal counsel."
  ).format(added=added, removed=removed, modified=modified_display)


def suggest_communication_plan(change_summary: Dict) -> Dict:
  """
  Suggest a lightweight communication plan for policy updates.
  """
  impacted_sections: List[str] = [item.get("field") for item in change_summary.get("modified", []) if isinstance(item.get("field"), str)]
  cadence = "single announcement" if len(impacted_sections) <= 2 else "multi-touch campaign"

  return {
      "audience": "customers and internal stakeholders",
      "channels": ["email", "in-product banner", "help center article"],
      "timeline": "within 2 weeks of policy finalization",
      "key_messages": [
          "What changed and why in plain language",
          "Effective date and where to read the updated policy",
          "How to contact support or legal for questions",
      ],
      "risk_notes": "Risk note: Do not describe outputs as legally compliant; route legal questions to counsel.",
      "cadence": cadence,
  }
