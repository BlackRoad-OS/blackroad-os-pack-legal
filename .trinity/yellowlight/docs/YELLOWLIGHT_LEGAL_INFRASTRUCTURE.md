# 💛⚖️ YellowLight Legal Infrastructure System
## Legal Service Deployment & Infrastructure for BlackRoad OS

**Version:** 1.0.0  
**Last Updated:** December 24, 2025  
**Pack:** blackroad-os-pack-legal

---

## Overview

The YellowLight Legal Infrastructure System manages the deployment, hosting, and infrastructure for legal services, document repositories, and compliance systems within BlackRoad OS. This extends the YellowLight infrastructure system with legal-specific deployment patterns and monitoring.

---

## Legal Infrastructure Components

### Legal Services
| Service | Platform | Purpose | Health Check |
|---------|----------|---------|--------------|
| legal-api | Railway | Legal workflow API, document management | `/health` |
| policy-portal | Cloudflare Pages | Public-facing policies (privacy, terms) | `/health.json` |
| legal-portal | Cloudflare Pages | Internal legal document access | `/health.json` |
| contract-service | Railway | Contract lifecycle management | `/health` |
| compliance-dashboard | Railway | Compliance tracking and reporting | `/health` |
| archive-connector | Railway | Integration with blackroad-os-archive | `/health` |

### Legal Repositories
| Repository | Description | Deployment Target |
|------------|-------------|-------------------|
| blackroad-os-pack-legal | Legal pack (this repo) | N/A (library) |
| legal-documents | Private document repository | S3/R2 + Railway |
| policy-site | Public policy hosting | Cloudflare Pages |
| legal-forms | Legal intake forms | Cloudflare Workers |

### Legal Data Stores
| Store | Type | Purpose | Platform |
|-------|------|---------|----------|
| legal-docs-db | PostgreSQL | Contract/policy metadata | Railway Postgres |
| legal-archive | Object Storage | Signed documents, PDFs | Cloudflare R2 |
| compliance-db | PostgreSQL | Compliance tracking | Railway Postgres |
| legal-cache | Redis | Fast access to policy versions | Railway Redis |

---

## Deployment Patterns

### Pattern 1: Policy Document Deployment

**Use Case:** Deploy updated privacy policy or terms of service to public website

```bash
source ~/.trinity/yellowlight/scripts/memory-yellowlight-templates.sh

# 1. Build policy site
yl_build_started "policy-site" "v2.1.0" "Building updated privacy policy"
npm run build
yl_build_succeeded "policy-site" "v2.1.0" "45s"

# 2. Deploy to Cloudflare Pages
yl_deployment_started "policy-site" "cloudflare" "production" "v2.1.0"
wrangler pages deploy ./dist --project-name=blackroad-policies
yl_pages_deploy "policy-site" "https://policies.blackroad.io" "v2.1.0"

# 3. Verify deployment
yl_health_check "policies.blackroad.io" "https://policies.blackroad.io/health.json" "5"

# 4. Update cache
yl_cache_invalidate "legal-cache" "policy-versions" "Privacy Policy v2.1 deployed"

# 5. Log to GreenLight
source ~/.trinity/greenlight/scripts/memory-greenlight-templates.sh
gl_policy_published "Privacy Policy" "v2.1" "2026-02-01" "https://policies.blackroad.io/privacy"
```

### Pattern 2: Legal API Deployment

**Use Case:** Deploy contract management API with database migrations

```bash
source ~/.trinity/yellowlight/scripts/memory-yellowlight-templates.sh

# 1. Run database migrations
yl_migration_started "legal-docs-db" "add_retention_fields"
railway run npm run migrate
yl_migration_succeeded "legal-docs-db" "add_retention_fields" "Applied 3 migrations"

# 2. Deploy API
yl_deployment_started "legal-api" "railway" "production" "v1.5.0"
railway up
yl_deployment_succeeded "legal-api" "railway" "https://legal-api.railway.app" "v1.5.0" "production"

# 3. Verify health
yl_health_check "legal-api" "https://legal-api.railway.app/health" "10"

# 4. Monitor for errors
yl_monitoring_active "legal-api" "datadog" "Legal API v1.5.0 deployed"

# 5. Update service mesh
yl_service_registered "legal-api" "service-mesh" "Added to mesh with /api/legal prefix"
```

### Pattern 3: Compliance Dashboard Deployment

**Use Case:** Deploy internal compliance tracking dashboard

```bash
source ~/.trinity/yellowlight/scripts/memory-yellowlight-templates.sh

# 1. Build dashboard
yl_build_started "compliance-dashboard" "v2.0.0" "Building compliance dashboard"
pnpm run build
yl_build_succeeded "compliance-dashboard" "v2.0.0" "120s"

# 2. Deploy to Railway
yl_deployment_started "compliance-dashboard" "railway" "internal" "v2.0.0"
railway up --service compliance-dashboard
yl_deployment_succeeded "compliance-dashboard" "railway" "https://compliance.internal.blackroad.io" "v2.0.0" "internal"

# 3. Configure authentication
yl_integration_configured "compliance-dashboard" "auth0" "oauth" "SSO configured for internal team access"

# 4. Connect to compliance DB
yl_database_connected "compliance-dashboard" "compliance-db" "PostgreSQL connection established"

# 5. Verify
yl_health_check "compliance-dashboard" "https://compliance.internal.blackroad.io/health" "15"
```

---

## Infrastructure as Code

### Cloudflare Configuration

#### Policy Site (Cloudflare Pages)
```yaml
# wrangler.toml for policy-site
name = "blackroad-policies"
compatibility_date = "2025-12-24"

[site]
bucket = "./dist"

[env.production]
routes = [
  { pattern = "policies.blackroad.io/*", zone_name = "blackroad.io" }
]

[[env.production.kv_namespaces]]
binding = "POLICY_VERSIONS"
id = "legal_policy_versions_prod"

[[env.production.r2_buckets]]
binding = "POLICY_ARCHIVE"
bucket_name = "blackroad-policy-archive"
```

#### Legal Forms (Cloudflare Workers)
```javascript
// legal-forms-worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Route to appropriate form handler
    if (url.pathname === '/forms/legal-review') {
      return handleLegalReviewForm(request, env);
    }
    
    if (url.pathname === '/forms/contract-request') {
      return handleContractRequestForm(request, env);
    }
    
    return new Response('Legal Forms API', { status: 200 });
  }
};
```

### Railway Configuration

#### Legal API Service
```toml
# railway.toml for legal-api
[build]
builder = "NIXPACKS"
buildCommand = "npm run build"

[deploy]
startCommand = "npm run start:prod"
healthcheckPath = "/health"
healthcheckTimeout = 30
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[services]]
name = "legal-api"

[services.env]
NODE_ENV = "production"
DATABASE_URL = "${{RAILWAY_POSTGRES_URL}}"
REDIS_URL = "${{RAILWAY_REDIS_URL}}"
```

#### Compliance Dashboard
```toml
# railway.toml for compliance-dashboard
[build]
builder = "NIXPACKS"
buildCommand = "pnpm run build"

[deploy]
startCommand = "pnpm run start"
healthcheckPath = "/health"

[[services]]
name = "compliance-dashboard"

[services.env]
NODE_ENV = "production"
COMPLIANCE_DB_URL = "${{RAILWAY_POSTGRES_URL}}"
AUTH_PROVIDER = "auth0"
```

---

## Database Schemas

### Legal Documents Database
```sql
-- Contract metadata
CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    contract_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    contract_type TEXT NOT NULL, -- MSA, NDA, DPA, SOW
    parties TEXT[] NOT NULL,
    effective_date DATE,
    expiration_date DATE,
    auto_renew BOOLEAN DEFAULT FALSE,
    jurisdiction TEXT,
    signed BOOLEAN DEFAULT FALSE,
    archive_location TEXT,
    retention_period TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Policy versions
CREATE TABLE policy_versions (
    id SERIAL PRIMARY KEY,
    policy_name TEXT NOT NULL,
    policy_type TEXT NOT NULL, -- privacy, terms, acceptable-use, security
    version TEXT NOT NULL,
    content TEXT NOT NULL,
    effective_date DATE NOT NULL,
    deprecated_date DATE,
    published_url TEXT,
    created_by TEXT,
    approved_by TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(policy_name, version)
);

-- Compliance records
CREATE TABLE compliance_checks (
    id SERIAL PRIMARY KEY,
    compliance_type TEXT NOT NULL, -- GDPR, CCPA, SOC2, HIPAA
    check_date DATE NOT NULL,
    status TEXT NOT NULL, -- pending, in_progress, passed, failed
    auditor TEXT,
    findings_count INTEGER DEFAULT 0,
    critical_findings INTEGER DEFAULT 0,
    report_location TEXT,
    next_check_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Legal team assignments
CREATE TABLE legal_assignments (
    id SERIAL PRIMARY KEY,
    matter_id TEXT UNIQUE NOT NULL,
    matter_name TEXT NOT NULL,
    matter_type TEXT NOT NULL, -- contract, compliance, risk, dispute
    assigned_counsel TEXT,
    priority TEXT, -- critical, high, medium, low
    status TEXT, -- open, in_progress, resolved, archived
    due_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contracts_type ON contracts(contract_type);
CREATE INDEX idx_contracts_expiration ON contracts(expiration_date);
CREATE INDEX idx_policy_effective ON policy_versions(effective_date);
CREATE INDEX idx_compliance_type ON compliance_checks(compliance_type);
CREATE INDEX idx_assignments_priority ON legal_assignments(priority);
```

---

## Monitoring & Alerts

### Health Checks

#### Policy Site Health
```json
// https://policies.blackroad.io/health.json
{
  "status": "healthy",
  "version": "2.1.0",
  "policies": {
    "privacy": "v2.1",
    "terms": "v3.0",
    "acceptable-use": "v1.5"
  },
  "last_updated": "2026-01-15T10:30:00Z",
  "cache_status": "warm"
}
```

#### Legal API Health
```json
// https://legal-api.railway.app/health
{
  "status": "healthy",
  "version": "1.5.0",
  "database": "connected",
  "redis": "connected",
  "archive_connector": "healthy",
  "uptime_seconds": 3600
}
```

### Alert Configuration

```yaml
# legal-infrastructure-alerts.yaml
alerts:
  - name: "Policy Site Down"
    condition: "health_check_failed"
    service: "policy-site"
    severity: "critical"
    notify: ["legal-team@blackroad.io", "ops@blackroad.io"]
    
  - name: "Legal API High Error Rate"
    condition: "error_rate > 5%"
    service: "legal-api"
    severity: "high"
    notify: ["legal-team@blackroad.io", "engineering@blackroad.io"]
    
  - name: "Contract Expiring Soon"
    condition: "expiration_date < 30_days"
    source: "legal-docs-db"
    severity: "medium"
    notify: ["legal-team@blackroad.io"]
    
  - name: "Compliance Check Overdue"
    condition: "next_check_date < today"
    source: "compliance-db"
    severity: "high"
    notify: ["legal-team@blackroad.io", "compliance@blackroad.io"]
```

---

## Memory Templates

### Deployment Templates

```bash
# Policy deployment
yl_policy_deployed() {
    local policy_name="$1"
    local version="$2"
    local url="$3"
    
    yl_pages_deploy "$policy_name" "$url" "$version"
    
    echo "📜 Policy deployed: $policy_name v$version at $url"
}

# Legal service deployment
yl_legal_service_deployed() {
    local service_name="$1"
    local platform="$2"
    local url="$3"
    local version="$4"
    
    yl_deployment_succeeded "$service_name" "$platform" "$url" "$version" "production"
    
    echo "⚖️ Legal service deployed: $service_name v$version on $platform"
}

# Database migration for legal services
yl_legal_migration() {
    local database="$1"
    local migration_name="$2"
    local result="$3"
    
    yl_migration_succeeded "$database" "$migration_name" "$result"
    
    echo "🗄️ Legal database migration: $migration_name on $database - $result"
}

# Archive integration
yl_archive_synced() {
    local document_type="$1"
    local count="$2"
    local destination="$3"
    
    yl_integration_configured "legal-service" "archive-connector" "sync" \
        "Synced $count $document_type documents to $destination"
    
    echo "🗄️ Archive sync: $count $document_type → $destination"
}
```

---

## Integration Patterns

### Integration with GreenLight

Legal work is tracked in GreenLight, deployment in YellowLight:

```bash
# GreenLight: Track the legal work
source ~/.trinity/greenlight/scripts/memory-greenlight-templates.sh
gl_policy_draft "Privacy Policy" "privacy" "v2.1" "Legal Team"

# YellowLight: Deploy the policy
source ~/.trinity/yellowlight/scripts/memory-yellowlight-templates.sh
yl_policy_deployed "privacy-policy" "v2.1" "https://policies.blackroad.io/privacy"

# GreenLight: Mark as published
gl_policy_published "Privacy Policy" "v2.1" "2026-02-01" "https://policies.blackroad.io/privacy"
```

### Integration with BlackRoad Archive

Documents flow from legal services to archive:

```bash
# Deploy legal API with archive connector
yl_legal_service_deployed "legal-api" "railway" "https://legal-api.railway.app" "v1.5.0"

# Configure archive integration
yl_integration_configured "legal-api" "archive-connector" "webhook" \
    "Signed contracts auto-archive to blackroad-os-archive"

# Sync completed
yl_archive_synced "contracts" "45" "blackroad-os-archive/contracts/2026/"
```

### Integration with Service Mesh

Legal services register in service mesh:

```bash
# Register legal API in mesh
yl_service_registered "legal-api" "service-mesh" "Registered at /api/legal with JWT auth"

# Register policy site
yl_service_registered "policy-site" "service-mesh" "Registered at /policies/* with public access"

# Register compliance dashboard
yl_service_registered "compliance-dashboard" "service-mesh" "Registered at /internal/compliance with SSO"
```

---

## Security Considerations

### Secrets Management

**Never commit secrets to code.** Use Railway/Cloudflare environment variables:

```bash
# Set Railway secrets
railway secrets set LEGAL_DB_PASSWORD=...
railway secrets set AUTH0_CLIENT_SECRET=...
railway secrets set ARCHIVE_API_KEY=...

# Set Cloudflare secrets
wrangler secret put LEGAL_API_KEY
wrangler secret put POLICY_SIGNING_KEY
```

### Access Control

```yaml
# access-control.yaml
services:
  policy-site:
    access: public
    auth: none
    
  legal-api:
    access: internal
    auth: jwt
    allowed_roles: ["legal_team", "admin"]
    
  compliance-dashboard:
    access: internal
    auth: sso
    allowed_roles: ["legal_team", "compliance_team", "executive"]
    
  legal-forms:
    access: internal
    auth: jwt
    rate_limit: "100/hour"
```

### Data Encryption

- **At rest:** R2 objects encrypted with AES-256
- **In transit:** TLS 1.3 for all services
- **Database:** PostgreSQL with encryption enabled
- **Backups:** Encrypted backups to secure storage

---

## Rollback Procedures

### Policy Site Rollback

```bash
# Rollback to previous version
wrangler pages deployment list --project-name=blackroad-policies
wrangler pages deployment rollback --project-name=blackroad-policies --deployment-id=abc123

# Log rollback
yl_deployment_rollback "policy-site" "v2.1.0" "v2.0.5" "Rolled back due to formatting issue"
```

### Legal API Rollback

```bash
# Railway rollback
railway rollback

# Or redeploy previous version
git checkout v1.4.0
railway up

# Log rollback
yl_deployment_rollback "legal-api" "v1.5.0" "v1.4.0" "Rolled back due to contract search bug"
```

---

## Disaster Recovery

### Backup Strategy

```yaml
backups:
  legal-docs-db:
    frequency: "daily"
    retention: "90 days"
    destination: "cloudflare-r2://backups/legal-db/"
    encryption: true
    
  compliance-db:
    frequency: "daily"
    retention: "90 days"
    destination: "cloudflare-r2://backups/compliance-db/"
    encryption: true
    
  legal-archive:
    frequency: "hourly"
    retention: "7 years"
    destination: "cloudflare-r2://archive/legal-docs/"
    encryption: true
    versioning: true
```

### Recovery Procedures

```bash
# Restore legal database
railway db restore --service legal-docs-db --backup-id latest

# Verify restoration
yl_database_restored "legal-docs-db" "2026-01-14T23:00:00Z" "Restored from daily backup"

# Test connections
yl_health_check "legal-api" "https://legal-api.railway.app/health" "30"
```

---

## Cost Optimization

### Resource Allocation

| Service | Platform | Size | Monthly Cost |
|---------|----------|------|--------------|
| legal-api | Railway | Pro | $20 |
| compliance-dashboard | Railway | Pro | $20 |
| legal-docs-db | Railway Postgres | 2GB | $10 |
| compliance-db | Railway Postgres | 1GB | $5 |
| legal-cache | Railway Redis | 512MB | $5 |
| policy-site | Cloudflare Pages | Free tier | $0 |
| legal-archive | Cloudflare R2 | 50GB | $0.75 |
| **Total** | | | **~$60/month** |

### Optimization Tips

- Use Cloudflare Pages for static content (free tier)
- Cloudflare R2 for document storage (cheaper than S3)
- Railway Redis for caching (reduce database load)
- Implement proper caching strategies
- Regular database optimization

---

## Compliance & Audit

### Audit Logging

All deployments, access, and changes are logged:

```bash
# Deployment audit log
yl_deployment_succeeded "legal-api" "railway" "https://legal-api.railway.app" "v1.5.0" "production"

# Access audit (via service logs)
# Database audit (PostgreSQL audit extension)
# Archive audit (R2 access logs)
```

### Compliance Reports

```bash
# Generate infrastructure compliance report
yl_compliance_report() {
    local report_type="$1"  # "soc2", "gdpr", "hipaa"
    local period="$2"       # "2025-Q4"
    
    echo "📊 Generating $report_type compliance report for $period"
    
    # Query deployment logs
    # Query access logs
    # Query database changes
    # Generate report
    
    yl_report_generated "$report_type" "$period" "Infrastructure compliance report"
}
```

---

## CLI Quick Reference

```bash
# Source templates
source ~/.trinity/yellowlight/scripts/memory-yellowlight-templates.sh

# Deploy policy
yl_policy_deployed "policy-name" "version" "url"

# Deploy legal service
yl_legal_service_deployed "service" "platform" "url" "version"

# Database migration
yl_legal_migration "database" "migration-name" "result"

# Archive sync
yl_archive_synced "doc-type" "count" "destination"

# Health check
yl_health_check "service" "url" "timeout"

# Rollback
yl_deployment_rollback "service" "from-version" "to-version" "reason"
```

---

## Support

**Infrastructure Issues?** Contact ops@blackroad.io  
**Legal Service Issues?** Contact legal-team@blackroad.io  
**Security Concerns?** Contact security@blackroad.io

---

**Built for:** Legal operations infrastructure  
**Maintained by:** BlackRoad OS Infrastructure & Legal Teams  
**Version:** 1.0.0

💛⚖️ **YellowLight Legal Infrastructure - Deploying Legal Excellence** 🚀📜
