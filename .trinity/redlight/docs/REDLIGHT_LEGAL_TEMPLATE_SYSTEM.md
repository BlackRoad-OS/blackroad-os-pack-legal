# 🔴⚖️ RedLight Legal Template System
## Visual Templates for Legal Documents & Portals

**Version:** 1.0.0  
**Last Updated:** December 24, 2025  
**Pack:** blackroad-os-pack-legal

---

## Overview

The RedLight Legal Template System provides branded, deploy-ready templates for legal documents, policy pages, legal portals, and compliance interfaces. All templates follow BlackRoad OS brand guidelines while meeting legal presentation requirements.

---

## Template Categories

### 1. Policy Document Templates
Professional web pages for public-facing legal policies

### 2. Contract Document Templates  
PDF and web-based contract presentation formats

### 3. Legal Portal Templates
Self-service legal document access portals

### 4. Compliance Dashboard Templates
Internal compliance tracking interfaces

### 5. Legal Form Templates
Interactive forms for legal requests and intake

---

## Policy Document Templates

### Privacy Policy Web Template
**File:** `privacy-policy.html`  
**Purpose:** Professional, accessible privacy policy presentation  
**Features:**
- Table of contents with anchor links
- Print-friendly formatting
- Mobile responsive
- WCAG 2.1 AA compliant
- Last updated timestamp
- Version history
- Download as PDF option

**Template Variables:**
- `{{company_name}}` - Organization name
- `{{effective_date}}` - Policy effective date
- `{{contact_email}}` - Privacy contact email
- `{{dpo_name}}` - Data Protection Officer name
- `{{jurisdiction}}` - Governing law jurisdiction

**Usage:**
```bash
source ~/.trinity/redlight/scripts/memory-redlight-legal-templates.sh

# Create privacy policy page
rl_legal_policy_create \
    "privacy-policy" \
    "privacy" \
    "BlackRoad OS, Inc." \
    "2026-02-01" \
    "privacy@blackroad.io"

# Deploy
rl_template_deploy \
    "privacy-policy" \
    "https://policies.blackroad.io/privacy" \
    "cloudflare"
```

### Terms of Service Web Template
**File:** `terms-of-service.html`  
**Purpose:** Clear presentation of service terms  
**Features:**
- Numbered sections
- Highlight important clauses
- Accept/decline flow
- Version tracking
- Archive previous versions

**Template Variables:**
- `{{company_name}}` - Organization name
- `{{service_name}}` - Service being offered
- `{{effective_date}}` - Terms effective date
- `{{contact_email}}` - Legal contact
- `{{jurisdiction}}` - Governing law
- `{{arbitration_clause}}` - Dispute resolution terms

### Acceptable Use Policy Template
**File:** `acceptable-use-policy.html`  
**Purpose:** Define acceptable use of services  
**Features:**
- Clear do's and don'ts
- Examples of violations
- Enforcement procedures
- Reporting mechanisms

### Cookie Policy Template
**File:** `cookie-policy.html`  
**Purpose:** GDPR/CCPA compliant cookie disclosure  
**Features:**
- Cookie categories
- Purpose descriptions
- Opt-out controls
- Cookie table with details

---

## Contract Document Templates

### Master Services Agreement (MSA) Template
**File:** `msa-template.html` / `msa-template.pdf`  
**Purpose:** Standard MSA for client engagements  
**Sections:**
1. Parties and Definitions
2. Scope of Services
3. Term and Termination
4. Fees and Payment Terms
5. Intellectual Property
6. Confidentiality
7. Warranties and Disclaimers
8. Limitation of Liability
9. Indemnification
10. General Provisions

**Template Variables:**
- `{{client_name}}` - Client legal entity name
- `{{client_address}}` - Client address
- `{{provider_name}}` - Service provider name
- `{{effective_date}}` - Contract effective date
- `{{term_length}}` - Initial term
- `{{payment_terms}}` - Payment schedule
- `{{jurisdiction}}` - Governing law

**Usage:**
```bash
# Generate MSA
rl_legal_contract_create \
    "msa-acme-corp" \
    "MSA" \
    "Acme Corp" \
    "BlackRoad OS, Inc." \
    "2026-01-15"

# Deploy for electronic signature
rl_contract_deploy \
    "msa-acme-corp" \
    "https://contracts.blackroad.io/msa/acme-2026" \
    "docusign"
```

### Non-Disclosure Agreement (NDA) Template
**File:** `nda-template.html` / `nda-template.pdf`  
**Purpose:** Mutual or unilateral NDA  
**Variants:**
- Mutual NDA (both parties share confidential info)
- Unilateral NDA (one party discloses)
- Employee NDA
- Contractor NDA

**Template Variables:**
- `{{party_a_name}}` - Disclosing party
- `{{party_b_name}}` - Receiving party
- `{{nda_type}}` - "mutual" or "unilateral"
- `{{effective_date}}` - Agreement date
- `{{term_years}}` - Confidentiality period
- `{{jurisdiction}}` - Governing law

### Data Processing Agreement (DPA) Template
**File:** `dpa-template.html` / `dpa-template.pdf`  
**Purpose:** GDPR-compliant data processing agreement  
**Features:**
- Standard contractual clauses
- Processing details appendix
- Technical and organizational measures
- Sub-processor list
- Data subject rights

**Template Variables:**
- `{{controller_name}}` - Data controller entity
- `{{processor_name}}` - Data processor entity
- `{{processing_purpose}}` - Purpose of data processing
- `{{data_categories}}` - Types of personal data
- `{{data_subjects}}` - Categories of data subjects
- `{{retention_period}}` - Data retention period
- `{{security_measures}}` - Security measures description

### Statement of Work (SOW) Template
**File:** `sow-template.html` / `sow-template.pdf`  
**Purpose:** Project-specific work scope under MSA  
**Sections:**
- Project description
- Deliverables
- Timeline and milestones
- Acceptance criteria
- Project fees
- Change order process

---

## Legal Portal Templates

### Public Legal Portal
**File:** `legal-portal-public.html`  
**Purpose:** Public-facing legal document access  
**Features:**
- Policy document listing
- Version history
- Download options
- Search functionality
- Last updated indicators
- RSS feed for updates

**Sections:**
- Current Policies
  - Privacy Policy
  - Terms of Service
  - Cookie Policy
  - Acceptable Use Policy
- Legal Information
  - Company information
  - Contact legal team
  - Report abuse
- Archive
  - Previous policy versions

**Example URL Structure:**
```
https://legal.blackroad.io/
  ├── /privacy          (current privacy policy)
  ├── /terms            (current terms)
  ├── /cookies          (cookie policy)
  ├── /acceptable-use   (AUP)
  ├── /archive          (previous versions)
  └── /contact          (legal contact form)
```

### Internal Legal Portal
**File:** `legal-portal-internal.html`  
**Purpose:** Internal team access to legal resources  
**Features:**
- Contract repository
- Template library
- Legal request forms
- Matter tracking
- Counsel directory
- Legal calendar

**Sections:**
- Contracts
  - Active contracts
  - Expiring soon
  - Contract templates
- Policies
  - Internal policies
  - Draft policies
  - Policy approval workflow
- Legal Requests
  - Submit new request
  - Track request status
  - Request history
- Resources
  - Legal templates
  - External counsel contacts
  - Legal process guides

**Access Control:**
- Authentication required (SSO)
- Role-based permissions
- Audit logging

---

## Compliance Dashboard Templates

### Compliance Overview Dashboard
**File:** `compliance-dashboard.html`  
**Purpose:** Executive view of compliance status  
**Features:**
- Compliance score cards (GDPR, CCPA, SOC2, etc.)
- Recent audit findings
- Remediation tracking
- Upcoming deadlines
- Risk heat map

**Widgets:**
- Overall Compliance Score (0-100)
- Framework Status Cards
  - GDPR: ✅ Compliant
  - CCPA: ⚠️ 2 findings
  - SOC2: 🔄 In progress
- Recent Audits Timeline
- Open Findings (by severity)
- Upcoming Compliance Deadlines

### Audit Tracking Dashboard
**File:** `audit-tracking.html`  
**Purpose:** Detailed audit and finding management  
**Features:**
- Audit list with status
- Finding details and severity
- Remediation plans
- Evidence tracking
- Auditor communications

### Contract Management Dashboard
**File:** `contract-dashboard.html`  
**Purpose:** Contract lifecycle visibility  
**Features:**
- Active contracts list
- Expiration calendar
- Renewal tracking
- Value metrics
- Vendor/client breakdown

**Views:**
- Contracts by Status
- Contracts by Type
- Expiring Soon (next 90 days)
- Contract Value Summary
- Signature Pending

---

## Legal Form Templates

### Legal Review Request Form
**File:** `legal-review-form.html`  
**Purpose:** Request legal counsel review  
**Fields:**
- Request type (contract, policy, compliance, risk)
- Project/matter name
- Description
- Business context
- Legal questions
- Deadline
- Priority level
- Attachments

**Workflow:**
1. User submits form
2. Form validates and creates GreenLight task
3. Legal team receives notification
4. Legal assigns to counsel
5. Review completed, user notified

### Contract Request Form
**File:** `contract-request-form.html`  
**Purpose:** Request new contract creation  
**Fields:**
- Contract type (MSA, NDA, DPA, SOW)
- Counterparty information
- Business purpose
- Key terms
- Special requirements
- Desired timeline

### Compliance Incident Report Form
**File:** `compliance-incident-form.html`  
**Purpose:** Report compliance issues  
**Fields:**
- Incident type
- Severity
- Date discovered
- Description
- Affected systems/data
- Immediate actions taken
- Contact information

---

## Template Design Standards

### Brand Colors
All legal templates use BlackRoad gradient:
```css
/* Primary gradient */
background: linear-gradient(135deg, 
    #FF9D00 0%,     /* Amber */
    #FF006B 50%,    /* Hot Pink */
    #0066FF 100%    /* Electric Blue */
);

/* Legal accent colors */
--legal-primary: #0066FF;    /* Trust, authority */
--legal-secondary: #7700FF;  /* Professional */
--legal-accent: #FF006B;     /* Important clauses */
--legal-warning: #FF9D00;    /* Warnings, alerts */
```

### Typography
```css
/* Legal document typography */
font-family: 'Georgia', 'Times New Roman', serif;  /* Body text */
font-family: 'SF Pro Display', -apple-system, sans-serif;  /* UI elements */

/* Heading sizes */
h1: 32px, bold
h2: 24px, bold
h3: 20px, semi-bold
h4: 18px, semi-bold
body: 16px, regular
footnotes: 14px, regular
```

### Accessibility Standards
All legal templates must meet:
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Print-friendly formatting
- Mobile responsive (320px+)

### Performance Standards
- Load time: <2s
- First contentful paint: <1s
- Minimal JavaScript
- Optimized images
- CDN delivery

---

## Memory Templates

```bash
# Create legal policy template
rl_legal_policy_create() {
    local policy_id="$1"
    local policy_type="$2"    # privacy, terms, cookies, aup
    local company="$3"
    local effective_date="$4"
    local contact="$5"
    
    rl_template_create "$policy_id" "legal-policy" "Legal policy: $policy_type"
    
    echo "📜 Created legal policy template: $policy_id ($policy_type)"
}

# Create contract template
rl_legal_contract_create() {
    local contract_id="$1"
    local contract_type="$2"  # MSA, NDA, DPA, SOW
    local party_a="$3"
    local party_b="$4"
    local effective_date="$5"
    
    rl_template_create "$contract_id" "legal-contract" "Contract: $contract_type"
    
    echo "🔏 Created contract template: $contract_id ($contract_type)"
}

# Create legal portal
rl_legal_portal_create() {
    local portal_id="$1"
    local portal_type="$2"    # public, internal
    local features="$3"
    
    rl_template_create "$portal_id" "legal-portal" "Legal portal: $portal_type with $features"
    
    echo "⚖️ Created legal portal: $portal_id ($portal_type)"
}

# Deploy contract for signature
rl_contract_deploy() {
    local contract_id="$1"
    local url="$2"
    local signature_service="$3"  # docusign, adobe-sign, etc.
    
    rl_template_deploy "$contract_id" "$url" "$signature_service"
    
    echo "✍️ Contract deployed for signature: $contract_id at $url"
}

# Test legal template compliance
rl_legal_test() {
    local template_id="$1"
    local test_type="$2"      # wcag, performance, brand, legal-review
    
    rl_test_passed "$template_id" "$test_type" "Legal template compliance verified"
    
    echo "✅ Legal template test passed: $template_id ($test_type)"
}
```

---

## Deployment Examples

### Deploy Privacy Policy
```bash
source ~/.trinity/redlight/scripts/memory-redlight-legal-templates.sh

# 1. Create policy from template
rl_legal_policy_create \
    "privacy-policy-v2" \
    "privacy" \
    "BlackRoad OS, Inc." \
    "2026-02-01" \
    "privacy@blackroad.io"

# 2. Customize content
# Edit .trinity/redlight/templates/privacy-policy-v2.html

# 3. Test accessibility
rl_legal_test "privacy-policy-v2" "wcag"

# 4. Test performance
rl_legal_test "privacy-policy-v2" "performance"

# 5. Legal review
rl_legal_test "privacy-policy-v2" "legal-review"

# 6. Deploy
rl_template_deploy \
    "privacy-policy-v2" \
    "https://policies.blackroad.io/privacy" \
    "cloudflare"

# 7. Track in GreenLight
source ~/.trinity/greenlight/scripts/memory-greenlight-templates.sh
gl_policy_published "Privacy Policy" "v2.1" "2026-02-01" "https://policies.blackroad.io/privacy"
```

### Deploy Legal Portal
```bash
# 1. Create portal
rl_legal_portal_create \
    "blackroad-legal-portal" \
    "public" \
    "policies, archive, contact"

# 2. Configure
# Add all policy links
# Setup search functionality
# Configure RSS feed

# 3. Test
rl_legal_test "blackroad-legal-portal" "wcag"
rl_legal_test "blackroad-legal-portal" "performance"

# 4. Deploy
rl_template_deploy \
    "blackroad-legal-portal" \
    "https://legal.blackroad.io" \
    "cloudflare"

# 5. Track
gl_deployed "legal-portal" "https://legal.blackroad.io" "Public legal portal deployed"
```

---

## Template File Checklist

For each legal template, ensure:
- [ ] Brand colors and typography applied
- [ ] WCAG 2.1 AA compliance verified
- [ ] Mobile responsive (320px - 2560px)
- [ ] Print stylesheet included
- [ ] Load time <2 seconds
- [ ] Legal review completed
- [ ] Version metadata included
- [ ] Effective date displayed
- [ ] Last updated timestamp
- [ ] Contact information included
- [ ] Archive/download option available
- [ ] Analytics tracking configured

---

## Integration Examples

### With GreenLight (Workflow Tracking)
```bash
# Create policy in GreenLight
gl_policy_draft "Privacy Policy" "privacy" "v2.1" "Legal Team"

# Create RedLight template
rl_legal_policy_create "privacy-v2.1" "privacy" "BlackRoad OS, Inc." "2026-02-01" "privacy@blackroad.io"

# Deploy via YellowLight
source ~/.trinity/yellowlight/scripts/memory-yellowlight-templates.sh
yl_pages_deploy "privacy-policy" "https://policies.blackroad.io/privacy" "v2.1"

# Update GreenLight
gl_policy_published "Privacy Policy" "v2.1" "2026-02-01" "https://policies.blackroad.io/privacy"
```

### With YellowLight (Deployment)
```bash
# Build legal portal
cd legal-portal
npm run build

# Deploy via YellowLight
yl_deployment_started "legal-portal" "cloudflare" "production" "v1.0.0"
wrangler pages deploy ./dist --project-name=blackroad-legal
yl_pages_deploy "legal-portal" "https://legal.blackroad.io" "v1.0.0"

# Log in RedLight
rl_template_deploy "legal-portal" "https://legal.blackroad.io" "cloudflare"
```

---

## Template Maintenance

### Version Control
All templates versioned with semantic versioning:
- `v1.0.0` - Initial release
- `v1.1.0` - Minor updates (new section, minor content changes)
- `v2.0.0` - Major updates (structural changes, legal updates)

### Update Process
1. Create new version in RedLight
2. Legal review
3. Test (WCAG, performance, brand)
4. Deploy to staging
5. Final approval
6. Deploy to production
7. Archive previous version
8. Update GreenLight tracking

### Template Archive
Previous versions stored in:
- `.trinity/redlight/templates/archive/`
- Cloudflare R2: `legal-templates-archive/`
- GreenLight: marked as archived

---

## Support

**Template Issues?** Contact legal-team@blackroad.io  
**Design Issues?** Contact design@blackroad.io  
**Accessibility Issues?** Contact accessibility@blackroad.io

---

## CLI Quick Reference

```bash
# Source templates
source ~/.trinity/redlight/scripts/memory-redlight-legal-templates.sh

# Create policy
rl_legal_policy_create "id" "type" "company" "date" "contact"

# Create contract
rl_legal_contract_create "id" "type" "party_a" "party_b" "date"

# Create portal
rl_legal_portal_create "id" "type" "features"

# Deploy contract
rl_contract_deploy "id" "url" "signature-service"

# Test template
rl_legal_test "id" "test-type"

# Deploy template
rl_template_deploy "id" "url" "platform"
```

---

**Built for:** Legal document presentation and access  
**Maintained by:** BlackRoad OS Legal & Design Teams  
**Version:** 1.0.0

🔴⚖️ **RedLight Legal Templates - Beautiful Legal Documents** 📜✨
