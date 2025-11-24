from agents.policy_steward_legal import (
    summarize_policy_change,
    generate_change_log_entry,
    suggest_communication_plan,
)


def test_policy_change_summary_and_log_entry():
    old = {"data": "collected"}
    new = {"data": "updated", "retention": "90 days"}

    summary = summarize_policy_change(old, new)
    assert "added" in summary and "retention" in summary["added"]
    assert any(item["field"] == "data" for item in summary["modified"])

    log_entry = generate_change_log_entry(summary)
    assert "Policy update:" in log_entry

    comms_plan = suggest_communication_plan(summary)
    assert comms_plan["audience"] == "customers and internal stakeholders"
    assert "risk" in comms_plan["risk_notes"].lower()
