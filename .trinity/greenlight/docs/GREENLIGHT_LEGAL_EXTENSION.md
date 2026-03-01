# 💚⚖️ GreenLight Legal Extension
## Legal Workflow Tracking for BlackRoad OS

**Version:** 1.0.0  
**Last Updated:** December 24, 2025  
**Pack:** blackroad-os-pack-legal

---

## Overview

The GreenLight Legal Extension provides specialized workflow tracking, emoji states, and memory templates for legal operations within BlackRoad OS. This extension integrates legal lifecycle management into the unified GreenLight project management system.

---

## Legal-Specific Emoji States

### Legal Workflow States
| Emoji | State | Description | NATS Subject Pattern |
|-------|-------|-------------|---------------------|
| ⚖️ | Legal Review | Item requires legal counsel review | `greenlight.legal-review.{scale}.{domain}.{id}` |
| 📜 | Policy Draft | Policy document in draft state | `greenlight.policy-draft.{scale}.{domain}.{id}` |
| 🔏 | Contract Draft | Contract in drafting phase | `greenlight.contract-draft.{scale}.{domain}.{id}` |
| ✍️ | Signature Pending | Awaiting signatures | `greenlight.signature-pending.{scale}.{domain}.{id}` |
| 🔐 | Executed | Contract/policy fully executed | `greenlight.executed.{scale}.{domain}.{id}` |
| 🗄️ | Archived | Legal document archived | `greenlight.archived.{scale}.{domain}.{id}` |
| 🚨 | Compliance Alert | Compliance issue detected | `greenlight.compliance-alert.{scale}.{domain}.{id}` |
| 🛡️ | Risk Assessment | Risk evaluation in progress | `greenlight.risk-assessment.{scale}.{domain}.{id}` |

### Legal Priority Levels
| Emoji | Priority | Use Case | Response Time |
|-------|----------|----------|---------------|
| 🔥🔥🔥 | P0 - Legal Emergency | Regulatory deadline, litigation | Immediate |
| 🔥🔥 | P1 - High Legal Risk | Contract blocker, compliance gap | Same day |
| 🔥 | P2 - Medium Risk | Policy update needed | 1-3 days |
| ⚠️ | P3 - Low Risk | Template improvement | 1-2 weeks |
| 📋 | P4 - Legal Maintenance | Documentation cleanup | 1 month |

### Legal Domain Tags
| Emoji | Domain | Description |
|-------|--------|-------------|
| ⚖️ | Legal General | General legal operations |
| 📜 | Policy | Privacy policies, terms of service |
| 🔏 | Contracts | MSAs, NDAs, agreements |
| 🛡️ | Compliance | Regulatory compliance, audits |
| 🔒 | Data Privacy | GDPR, CCPA, data protection |
| 💼 | Corporate | Corporate governance, filings |
| 🏛️ | Regulatory | Government regulations, licensing |
| ⚔️ | Disputes | Litigation, disputes, claims |

### Legal Effort Sizing
| Emoji | Size | Typical Legal Tasks |
|-------|------|---------------------|
| 🫧 | Trivial | Review standard template |
| 🪶 | Small | Minor clause update |
| 🥊 | Medium | Contract negotiation |
| 🍖 | Large | New policy creation |
| 🌊 | Huge | Complex contract drafting |
| 🌍 | Colossal | Multi-jurisdiction compliance program |

---

## Memory Templates

### Contract Lifecycle

#### Start Contract Drafting
```bash
gl_contract_start() {
    local contract_name="$1"
    local parties="$2"
    local type="$3"        # "MSA", "NDA", "DPA", "SOW", etc.
    local priority="$4"    # 🔥🔥🔥, 🔥🔥, 🔥, ⚠️, 📋

    gl_log "🔏${priority}⚖️📣" \
        "contract_start" \
        "$contract_name" \
        "Type: ${type}. Parties: ${parties}. Drafting initiated."
}
```

#### Contract Review Request
```bash
gl_contract_review() {
    local contract_name="$1"
    local reviewer="$2"    # Legal counsel name/team
    local deadline="$3"
    local risk_level="$4"  # "low", "medium", "high", "critical"

    gl_log "⚖️🔥📜" \
        "contract_review" \
        "$contract_name" \
        "Reviewer: ${reviewer}. Deadline: ${deadline}. Risk: ${risk_level}."
}
```

#### Contract Executed
```bash
gl_contract_executed() {
    local contract_name="$1"
    local parties="$2"
    local effective_date="$3"
    local term="$4"        # e.g., "2 years", "perpetual"

    gl_log "🔐✅⚖️" \
        "contract_executed" \
        "$contract_name" \
        "Parties: ${parties}. Effective: ${effective_date}. Term: ${term}. All signatures obtained."
}
```

### Policy Management

#### Policy Draft Created
```bash
gl_policy_draft() {
    local policy_name="$1"
    local policy_type="$2"  # "privacy", "terms", "acceptable-use", "security"
    local version="$3"
    local author="$4"

    gl_log "📜⚖️✏️" \
        "policy_draft" \
        "$policy_name" \
        "Type: ${policy_type}. Version: ${version}. Author: ${author}."
}
```

#### Policy Review Request
```bash
gl_policy_review() {
    local policy_name="$1"
    local reviewers="$2"   # Comma-separated list
    local changes="$3"     # Summary of changes

    gl_log "⚖️📜🔍" \
        "policy_review" \
        "$policy_name" \
        "Reviewers: ${reviewers}. Changes: ${changes}. Review requested."
}
```

#### Policy Published
```bash
gl_policy_published() {
    local policy_name="$1"
    local version="$2"
    local effective_date="$3"
    local url="$4"

    gl_log "📜✅🌐" \
        "policy_published" \
        "$policy_name" \
        "Version: ${version}. Effective: ${effective_date}. Published at: ${url}."
}
```

### Compliance Tracking

#### Compliance Check Started
```bash
gl_compliance_check() {
    local check_type="$1"   # "GDPR", "CCPA", "SOC2", "HIPAA", etc.
    local scope="$2"        # What's being checked
    local auditor="$3"      # Internal team or external auditor

    gl_log "🛡️🔍⚖️" \
        "compliance_check" \
        "$check_type" \
        "Scope: ${scope}. Auditor: ${auditor}. Compliance check initiated."
}
```

#### Compliance Issue Detected
```bash
gl_compliance_issue() {
    local issue_type="$1"
    local severity="$2"     # "critical", "high", "medium", "low"
    local description="$3"
    local remediation="$4"  # Required actions

    gl_log "🚨${severity}🛡️" \
        "compliance_issue" \
        "$issue_type" \
        "Severity: ${severity}. Issue: ${description}. Remediation: ${remediation}."
}
```

#### Compliance Resolved
```bash
gl_compliance_resolved() {
    local issue_type="$1"
    local resolution="$2"
    local verified_by="$3"
    local date="$4"

    gl_log "✅🛡️⚖️" \
        "compliance_resolved" \
        "$issue_type" \
        "Resolution: ${resolution}. Verified by: ${verified_by}. Date: ${date}."
}
```

### Risk Assessment

#### Risk Assessment Started
```bash
gl_risk_assessment_start() {
    local subject="$1"      # What's being assessed
    local category="$2"     # "legal", "financial", "operational", "reputational"
    local assessor="$3"

    gl_log "🛡️📊⚖️" \
        "risk_assessment" \
        "$subject" \
        "Category: ${category}. Assessor: ${assessor}. Risk assessment initiated."
}
```

#### Risk Identified
```bash
gl_risk_identified() {
    local risk_name="$1"
    local likelihood="$2"   # "low", "medium", "high"
    local impact="$3"       # "low", "medium", "high", "critical"
    local mitigation="$4"

    gl_log "⚠️🛡️📊" \
        "risk_identified" \
        "$risk_name" \
        "Likelihood: ${likelihood}. Impact: ${impact}. Mitigation: ${mitigation}."
}
```

### Legal Archive

#### Document Archived
```bash
gl_legal_archived() {
    local document_name="$1"
    local document_type="$2"  # "contract", "policy", "filing", "correspondence"
    local archive_location="$3"
    local retention_period="$4"

    gl_log "🗄️⚖️📦" \
        "legal_archived" \
        "$document_name" \
        "Type: ${document_type}. Location: ${archive_location}. Retention: ${retention_period}."
}
```

### Legal Team Coordination

#### Legal Counsel Assigned
```bash
gl_legal_assigned() {
    local matter="$1"
    local counsel="$2"
    local expertise="$3"    # Area of law
    local urgency="$4"

    gl_log "⚖️👥📋" \
        "legal_assigned" \
        "$matter" \
        "Counsel: ${counsel}. Expertise: ${expertise}. Urgency: ${urgency}."
}
```

#### Legal Consultation Scheduled
```bash
gl_legal_consultation() {
    local topic="$1"
    local participants="$2"
    local date_time="$3"
    local agenda="$4"

    gl_log "⚖️📅🗣️" \
        "legal_consultation" \
        "$topic" \
        "Participants: ${participants}. When: ${date_time}. Agenda: ${agenda}."
}
```

---

## Workflow Examples

### Example 1: Contract Execution Flow
```bash
# 1. Initiate contract
gl_contract_start "Vendor MSA - Acme Corp" "BlackRoad OS, Inc. & Acme Corp" "MSA" "🔥🔥"

# 2. Request legal review
gl_contract_review "Vendor MSA - Acme Corp" "External Counsel" "2025-12-31" "medium"

# 3. Track negotiation
gl_wip "acme-msa" "Negotiating liability caps and indemnification" "🍖" "👉"

# 4. Execute contract
gl_contract_executed "Vendor MSA - Acme Corp" "BlackRoad OS, Inc. & Acme Corp" "2026-01-15" "3 years"

# 5. Archive
gl_legal_archived "Vendor MSA - Acme Corp" "contract" "blackroad-os-archive/contracts/vendor/acme-2026.pdf" "7 years"
```

### Example 2: Privacy Policy Update
```bash
# 1. Draft new version
gl_policy_draft "Privacy Policy" "privacy" "v2.1" "Legal Team"

# 2. Request reviews
gl_policy_review "Privacy Policy v2.1" "Legal Counsel, Security Team, Product" "Added GDPR data retention details"

# 3. Incorporate feedback
gl_progress "legal-pack" "Incorporated 15 review comments into Privacy Policy v2.1" "Final counsel review"

# 4. Publish
gl_policy_published "Privacy Policy" "v2.1" "2026-02-01" "https://blackroad.io/privacy"

# 5. Archive old version
gl_legal_archived "Privacy Policy v2.0" "policy" "blackroad-os-archive/policies/privacy-v2.0.md" "permanent"
```

### Example 3: Compliance Audit
```bash
# 1. Start compliance check
gl_compliance_check "GDPR" "Data processing activities across all services" "External Auditor - KPMG"

# 2. Issue detected
gl_compliance_issue "Data Retention" "high" "User data retained beyond stated policy period in logs" "Implement automated log rotation with 90-day max retention"

# 3. Remediation
gl_wip "gdpr-remediation" "Implementing automated log rotation system" "🥊" "🌸"

# 4. Verify fix
gl_compliance_resolved "Data Retention" "Automated log rotation deployed to all services, verified compliant" "External Auditor - KPMG" "2026-01-20"

# 5. Complete audit
gl_phase_done "compliance" "GDPR Audit 2025" "All 12 findings resolved. Full compliance achieved. Audit report archived." "🌌"
```

---

## Integration with Other Systems

### Integration with YellowLight
Legal deployments are tracked in both GreenLight and YellowLight:

```bash
# GreenLight tracks the legal work
gl_policy_draft "Terms of Service" "terms" "v3.0" "Legal Team"

# YellowLight tracks the deployment
source ~/memory-yellowlight-templates.sh
yl_pages_deploy "terms-of-service-v3" "https://blackroad.io/terms" "cloudflare"
```

### Integration with RedLight
Legal templates are created in RedLight and tracked in GreenLight:

```bash
# GreenLight tracks the project
gl_feature "Legal Portal" "Create web portal for legal document access" "🍖" "⭐"

# RedLight provides the template
source ~/memory-redlight-legal-templates.sh
rl_legal_portal_create "blackroad-legal-portal" "contracts, policies, compliance"
```

### Integration with BlackRoad Archive
Legal documents flow to archive with GreenLight tracking:

```bash
# Execute and archive
gl_contract_executed "Client MSA - Widget Inc" "parties" "2026-01-01" "2 years"
gl_legal_archived "Client MSA - Widget Inc" "contract" "blackroad-os-archive/contracts/client/widget-2026.pdf" "7 years"
```

---

## Database Schema Extensions

### Legal Items Table
```sql
CREATE TABLE greenlight_legal_items (
    id SERIAL PRIMARY KEY,
    greenlight_item_id INTEGER REFERENCES greenlight_items(id),
    legal_type TEXT NOT NULL CHECK(legal_type IN ('contract', 'policy', 'filing', 'compliance', 'risk')),
    document_id TEXT UNIQUE,
    parties TEXT[],
    effective_date DATE,
    expiration_date DATE,
    jurisdiction TEXT,
    signed BOOLEAN DEFAULT FALSE,
    archived BOOLEAN DEFAULT FALSE,
    archive_location TEXT,
    retention_period TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_legal_items_type ON greenlight_legal_items(legal_type);
CREATE INDEX idx_legal_items_effective ON greenlight_legal_items(effective_date);
CREATE INDEX idx_legal_items_expiration ON greenlight_legal_items(expiration_date);
```

### Compliance Tracking Table
```sql
CREATE TABLE greenlight_compliance (
    id SERIAL PRIMARY KEY,
    compliance_type TEXT NOT NULL, -- GDPR, CCPA, SOC2, etc.
    check_date DATE NOT NULL,
    status TEXT CHECK(status IN ('pending', 'in_progress', 'passed', 'failed', 'remediation')),
    auditor TEXT,
    findings INTEGER DEFAULT 0,
    critical_findings INTEGER DEFAULT 0,
    remediation_deadline DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_compliance_type ON greenlight_compliance(compliance_type);
CREATE INDEX idx_compliance_status ON greenlight_compliance(status);
```

---

## NATS Event Patterns

### Legal Events Published
```
greenlight.legal.contract.started
greenlight.legal.contract.reviewed
greenlight.legal.contract.executed
greenlight.legal.policy.drafted
greenlight.legal.policy.published
greenlight.legal.compliance.issue
greenlight.legal.compliance.resolved
greenlight.legal.risk.identified
greenlight.legal.archived
```

### Event Payload Example
```json
{
  "event_type": "contract_executed",
  "timestamp": "2026-01-15T10:30:00Z",
  "contract_id": "msa-acme-2026",
  "contract_name": "Vendor MSA - Acme Corp",
  "parties": ["BlackRoad OS, Inc.", "Acme Corp"],
  "effective_date": "2026-01-15",
  "term": "3 years",
  "signed_by": ["ceo@blackroad.io", "ceo@acme.com"],
  "priority": "🔥🔥",
  "scale": "🌸",
  "domain": "⚖️"
}
```

---

## Best Practices

### Legal Review Requirements
1. **🔥🔥🔥 P0 Legal Emergency** - Engage counsel immediately, escalate to leadership
2. **🔥🔥 P1 High Risk** - Legal counsel review required before proceeding
3. **🔥 P2 Medium Risk** - Legal team review, counsel available for questions
4. **⚠️ P3 Low Risk** - Use approved templates, legal team spot check
5. **📋 P4 Maintenance** - Self-service with templates

### Documentation Standards
- **Always log to GreenLight** - All legal activities tracked
- **Use consistent emoji states** - Clear visual status
- **Include key metadata** - Parties, dates, jurisdictions
- **Archive properly** - Retention periods, secure storage
- **NATS publishing** - Real-time visibility across systems

### Compliance Workflows
- **Regular audits** - Schedule compliance checks
- **Issue tracking** - Log all findings in GreenLight
- **Remediation tracking** - Monitor fixes to completion
- **External auditor integration** - Share GreenLight status

---

## CLI Quick Reference

```bash
# Source the templates
source ~/.trinity/greenlight/scripts/memory-greenlight-templates.sh

# Contract lifecycle
gl_contract_start "Name" "Parties" "Type" "Priority"
gl_contract_review "Name" "Reviewer" "Deadline" "Risk"
gl_contract_executed "Name" "Parties" "Date" "Term"

# Policy management
gl_policy_draft "Name" "Type" "Version" "Author"
gl_policy_review "Name" "Reviewers" "Changes"
gl_policy_published "Name" "Version" "Date" "URL"

# Compliance
gl_compliance_check "Type" "Scope" "Auditor"
gl_compliance_issue "Type" "Severity" "Description" "Remediation"
gl_compliance_resolved "Type" "Resolution" "Verifier" "Date"

# Risk assessment
gl_risk_assessment_start "Subject" "Category" "Assessor"
gl_risk_identified "Name" "Likelihood" "Impact" "Mitigation"

# Archive
gl_legal_archived "Name" "Type" "Location" "Retention"

# Coordination
gl_legal_assigned "Matter" "Counsel" "Expertise" "Urgency"
gl_legal_consultation "Topic" "Participants" "DateTime" "Agenda"
```

---

## Support & Compliance

**Questions?** Check the main GreenLight documentation or consult legal counsel.

**Issues?** Report in blackroad-os-pack-legal repository.

**Legal Advice?** This system is for tracking only. Always engage licensed counsel for legal decisions.

---

**Built for:** Legal operations teams, compliance professionals, in-house counsel  
**Maintained by:** BlackRoad OS Legal Pack Team  
**Version:** 1.0.0

💚⚖️ **GreenLight Legal Extension - Tracking Legal Excellence** 📜✅
