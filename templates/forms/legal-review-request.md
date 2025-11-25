# 🧾 Legal Review Request Intake Form

> 🎯 **When This Is Used:** When requesting a legal review of any project, feature, content, or change.
> 
> 👥 **Who Fills This Out:** Anyone requesting legal review (product, engineering, marketing, etc.)
> 
> ✅ **What Happens Next:** Legal team triages, assigns reviewer, and tracks through approval flow.

---

## Form Metadata

| Field | Value |
|-------|-------|
| Form ID | `form-legal-review-001` |
| Version | `1.0.0` |
| Last Updated | `YYYY-MM-DD` |
| Submits To | Legal Review Queue |

---

## 📋 Legal Review Request

### Section 1: Requester Information

| Field | Value |
|-------|-------|
| **Requester Name** | |
| **Team/Department** | |
| **Email** | |
| **Slack/Contact** | |
| **Date of Request** | |

---

### Section 2: Request Details

**What is the title/name of this request?**

> _______________

**Describe what you need reviewed:**

> (Provide a clear description of the project, feature, content, or change that requires legal review)
> 
> _______________
> _______________
> _______________

**What type of review is this?**

- [ ] New product/feature review
- [ ] Marketing/advertising content review
- [ ] Contract/agreement review
- [ ] Policy/terms update review
- [ ] Partnership/vendor agreement review
- [ ] Privacy/data use review
- [ ] Intellectual property review
- [ ] Employment/HR matter
- [ ] Regulatory/compliance question
- [ ] Incident/issue response
- [ ] Other: _______________

**Supporting materials:**

| Document/Link | Description |
|---------------|-------------|
| | |
| | |
| | |

---

### Section 3: Risk Assessment

**Does this involve any of the following?** (Check all that apply)

#### High-Risk Indicators 🔴
```
// If any checked: HIGH-RISK LEGAL FLOW – HUMAN APPROVAL REQUIRED
```

- [ ] 💰 **Financial transactions** – Payments, money transmission, trading
- [ ] 🪪 **Identity data** – KYC, personal identification, verification
- [ ] 📊 **Personal data** – PII collection, processing, or sharing
- [ ] ⚖️ **Regulatory matters** – Filings, attestations, compliance
- [ ] 💳 **Payment card data** – PCI-DSS scope
- [ ] 🏥 **Health information** – HIPAA scope
- [ ] 👶 **Children's data** – COPPA considerations
- [ ] 📜 **Material contract terms** – Significant liability or commitment
- [ ] 🌍 **New jurisdiction** – Entering new markets/countries
- [ ] ⚠️ **Potential litigation** – Dispute or legal risk

#### Medium-Risk Indicators 🟡

- [ ] Marketing claims or advertising
- [ ] Third-party integrations
- [ ] Open source licensing
- [ ] Partnership arrangements
- [ ] Customer-facing content changes
- [ ] New vendor relationships

#### Low-Risk Indicators 🟢

- [ ] Internal documentation updates
- [ ] Minor content corrections
- [ ] Standard template usage
- [ ] FAQ updates

**Calculated Risk Level:**
- [ ] 🔴 **HIGH** – Any high-risk indicator checked
- [ ] 🟡 **MEDIUM** – Medium-risk indicators only
- [ ] 🟢 **LOW** – Low-risk indicators only

---

### Section 4: Timeline

**What is your deadline?**

| Deadline Type | Date |
|---------------|------|
| **Ideal completion date** | |
| **Hard deadline (if any)** | |
| **Launch/go-live date** | |

**Why this timeline?**

> (Explain any external dependencies, commitments, or reasons for urgency)
> 
> _______________

**Is this urgent?**

- [ ] 🔴 **Critical** – Blocking a launch or has legal/regulatory deadline
- [ ] 🟡 **High** – Important but some flexibility
- [ ] 🟢 **Normal** – Standard priority
- [ ] ⚪ **Low** – No specific deadline

---

### Section 5: Business Context

**Which product/service is this for?**

> _______________

**Who are the stakeholders?**

| Role | Name | Contact |
|------|------|---------|
| Product Owner | | |
| Engineering Lead | | |
| Business Sponsor | | |
| Other | | |

**What is the business impact if this is delayed?**

> _______________

**Are there any dependencies on this review?**

> (Other teams waiting, external parties, etc.)
> 
> _______________

---

### Section 6: Prior Reviews

**Has this or similar matter been reviewed before?**

- [ ] Yes – Reference: _______________
- [ ] No
- [ ] Not sure

**Is there existing approved language/template we should reference?**

- [ ] Yes – Reference: _______________
- [ ] No

---

### Section 7: Additional Information

**Anything else the legal team should know?**

> _______________
> _______________

**Preferred communication channel:**

- [ ] Email
- [ ] Slack
- [ ] Meeting
- [ ] Other: _______________

---

## 📤 Submission

**By submitting this request, I confirm that:**

- [ ] The information provided is accurate to the best of my knowledge
- [ ] I have attached all relevant supporting materials
- [ ] I understand the estimated timeline depends on complexity and queue

**Submitted by:** _______________  
**Date:** _______________

---

## 🔄 For Legal Team Use

### Triage

| Field | Value |
|-------|-------|
| **Request ID** | AUTO-GENERATED |
| **Received Date** | |
| **Triaged By** | |
| **Assigned To** | |
| **Priority** | 🔴 Critical / 🟡 High / 🟢 Normal / ⚪ Low |
| **Risk Level** | 🔴 High / 🟡 Medium / 🟢 Low |
| **Target Completion** | |

### State Tracking

| State | Date | By |
|-------|------|----|
| Requested | | |
| In Review | | |
| Needs Info | | |
| Approved/Rejected | | |
| Archived | | |

### Review Notes

> (Internal notes for legal team)
> 
> _______________

### Final Disposition

- [ ] **Approved** – Proceed as proposed
- [ ] **Approved with conditions** – See notes
- [ ] **Returned for revision** – See notes
- [ ] **Rejected** – See notes
- [ ] **Escalated** – Assigned to: _______________

**Reviewer:** _______________  
**Date:** _______________

---

## 🤖 Agent Automation Notes

**Agents CAN:**
- Auto-assign based on request type
- Calculate risk level from indicators
- Send status notifications
- Archive completed requests

**Agents CANNOT:**
- Approve or reject requests
- Change risk level classifications
- Skip required approvals

---

## 📁 Archive Reference

Upon completion, this request will be archived to:
- Repository: `blackroad-os-archive`
- Category: `legal-reviews`
- Request ID: [AUTO-GENERATED]

---

*This form is part of `blackroad-os-pack-legal`.*
