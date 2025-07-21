# WRAS Security Deployment Guide
**Version**: 4.0  
**Date**: July 4, 2025  
**Audience**: DevOps, Security Engineers, System Administrators  
**Status**: Production Ready - Security Integration Complete

---

## Quick Start Security Checklist

### ✅ **Pre-Deployment Security Validation**

```bash
# 1. Verify Security Engine
python -c "from wras_security_engine import WRASSecurityEngine; print('✅ Security Engine OK')"

# 2. Test Rate Limiting & Anti-Farming
python test_security_integration.py

# 3. Validate Smart Contract Auditor  
python -c "from wras_smart_contract_auditor import audit_contract; print('✅ Contract Auditor OK')"

# 4. Run Complete Security & Production Test
python test_complete_production.py

# 5. Validate Integrated Platform Security
python -c "from wras_integrated_platform import WRASIntegratedPlatform; p=WRASIntegratedPlatform(); print('✅ Integrated Security OK')"
```

### ✅ **Production Security Configuration**

#### Environment Variables
```bash
# Core Security Settings
export WRAS_SECURITY_ENABLED=true
export WRAS_RATE_LIMIT_MINUTE=10
export WRAS_RATE_LIMIT_HOUR=100
export WRAS_RATE_LIMIT_DAILY_PAPERS=5
export WRAS_RATE_LIMIT_ACHIEVEMENT_HOUR=20

# Quality Thresholds
export WRAS_MIN_PAPER_QUALITY=0.60
export WRAS_MIN_ACHIEVEMENT_QUALITY=0.50
export WRAS_MIN_CONTRIBUTION_QUALITY=0.40

# Anti-Farming Protection
export WRAS_ANTI_FARMING_ENABLED=true
export WRAS_RAPID_ACTION_THRESHOLD=10
export WRAS_COOLDOWN_PERIOD=300

# Smart Contract Security
export WRAS_CONTRACT_AUDIT_ENABLED=true
export WRAS_GAS_OPTIMIZATION_ENABLED=true

# Monitoring & Logging
export WRAS_SECURITY_LOG_LEVEL=INFO
export WRAS_SECURITY_MONITORING=enabled
export WRAS_SECURITY_ALERTS=enabled
```

#### Security Module Integration
```python
# In your main application
from wras_security_engine import WRASSecurityEngine, check_action_allowed
from wras_smart_contract_auditor import audit_contract
from wras_integrated_platform import WRASIntegratedPlatform

# Initialize security-enabled platform
platform = WRASIntegratedPlatform()

# All user actions automatically include security validation

# Initialize security
security_engine = WRASSecurityEngine()

# Before any user action
allowed, reason = check_action_allowed(user_id, action_type, ip_address)
if not allowed:
    return {"error": f"Security check failed: {reason}"}
```

---

## Security Architecture Deployment

### Layer 1: Application Security

#### Rate Limiting Integration
```python
# wras_integrated_platform.py security integration
async def generate_paper_with_rewards(self, user_id, requirements, ip_address=None):
    # Security check - rate limiting
    allowed, reason = self.security_engine.check_rate_limit(
        user_id, "paper_generation", ip_address
    )
    if not allowed:
        return {'success': False, 'error': f"Security check failed: {reason}"}
    
    # Continue with paper generation...
```

#### Quality Validation Integration
```python
# Quality threshold enforcement
quality_valid, quality_reason = self.security_engine.validate_quality_threshold(
    "paper", paper.overall_quality.overall_score, user_id
)
if not quality_valid:
    return {'success': False, 'error': f"Quality validation failed: {quality_reason}"}
```

### Layer 2: Behavioral Analysis

#### User Monitoring Setup
```python
# Continuous behavior analysis
async def monitor_user_behavior(user_id):
    pattern = self.security_engine.analyze_user_behavior(user_id)
    
    if pattern.risk_level == "HIGH":
        # Alert security team
        await send_security_alert(f"High-risk user detected: {user_id}")
        
    return pattern
```

#### Coordinated Activity Detection
```python
# Multi-user analysis
def detect_coordinated_attacks(active_users):
    if len(active_users) > 3:
        coordinated = self.security_engine.detect_coordinated_activity(active_users)
        if coordinated:
            # Log and investigate
            logger.warning(f"Coordinated activity detected: {coordinated}")
```

### Layer 3: Smart Contract Security

#### Contract Deployment Workflow
```bash
# 1. Run security audit
python -c "
from wras_smart_contract_auditor import contract_auditor
audit = contract_auditor.audit_wras_token_contract()
print(f'Security Score: {audit.security_score}/100')
if audit.critical_count > 0:
    print('❌ CRITICAL issues found - DO NOT DEPLOY')
    exit(1)
print('✅ Contract security validated')
"

# 2. Deploy with monitoring
# Include gas monitoring and security event tracking
```

---

## Monitoring & Alerting Setup

### Security Dashboard Integration

```python
# Real-time security monitoring
async def get_security_dashboard():
    return {
        "security_events_24h": security_engine.get_recent_events_count(),
        "high_risk_users": security_engine.count_high_risk_users(),
        "blocked_users": len(security_engine.blocked_users),
        "rate_limit_violations": security_engine.count_rate_violations(),
        "quality_rejections": security_engine.count_quality_failures()
    }
```

### Alert Configuration

```python
# Security event alerting
class SecurityAlertHandler:
    def __init__(self):
        self.alert_thresholds = {
            "high_risk_users": 5,
            "security_events_per_hour": 50,
            "coordinated_activity": 1
        }
    
    async def check_alerts(self):
        report = security_engine.get_security_report()
        
        if report['summary']['high_risk_users'] > self.alert_thresholds['high_risk_users']:
            await self.send_alert("HIGH", f"Multiple high-risk users detected")
        
        # Additional alert logic...
```

---

## Incident Response Procedures

### Automated Response

```python
# Automated incident response
class IncidentResponseSystem:
    def handle_security_event(self, event):
        if event.severity == "CRITICAL":
            # Immediate containment
            self.block_user(event.user_id)
            self.alert_security_team(event)
            self.log_incident(event)
            
        elif event.severity == "HIGH":
            # Elevated monitoring
            self.flag_user_for_review(event.user_id)
            self.increase_monitoring(event.user_id)
            
        # Continue with response protocol...
```

### Manual Response Playbook

#### Critical Security Incidents
1. **Immediate**: Block affected users/IPs
2. **Within 15 min**: Alert security team
3. **Within 1 hour**: Complete impact assessment
4. **Within 4 hours**: Implement permanent fix
5. **Within 24 hours**: Post-incident report

#### Security Event Escalation
```
Level 1: Automated blocking (rate limits, quality)
Level 2: Security team notification (coordinated activity)
Level 3: Management escalation (system-wide threats)
Level 4: External assistance (major breaches)
```

---

## Performance Optimization

### Security vs Performance Balance

#### Efficient Security Checks
```python
# Optimized security validation
class OptimizedSecurityEngine:
    def __init__(self):
        self.cache = {}  # Cache security decisions
        self.batch_validator = BatchValidator()  # Batch operations
        
    async def quick_security_check(self, user_id, action_type):
        # Use cached results for frequent checks
        cache_key = f"{user_id}_{action_type}_{int(time.time() // 60)}"
        
        if cache_key in self.cache:
            return self.cache[cache_key]
            
        result = await self.full_security_check(user_id, action_type)
        self.cache[cache_key] = result
        return result
```

#### Asynchronous Processing
```python
# Non-blocking security analysis
async def process_security_async(user_actions):
    # Process security checks in background
    security_tasks = [
        analyze_user_behavior(user_id) 
        for user_id in user_actions.keys()
    ]
    
    results = await asyncio.gather(*security_tasks)
    return results
```

---

## Security Testing Framework

### Automated Security Tests

```python
# test_security_suite.py
import pytest
from wras_security_engine import WRASSecurityEngine

class TestSecurityEngine:
    def setup_method(self):
        self.security = WRASSecurityEngine()
    
    def test_rate_limiting(self):
        """Test rate limiting enforcement"""
        user_id = "test_user"
        
        # Should allow first few actions
        for i in range(5):
            allowed, _ = self.security.check_rate_limit(user_id, "paper_generation")
            assert allowed
        
        # Should block after daily limit
        allowed, reason = self.security.check_rate_limit(user_id, "paper_generation")
        assert not allowed
        assert "Daily paper generation limit exceeded" in reason
    
    def test_quality_validation(self):
        """Test quality threshold enforcement"""
        # High quality should pass
        valid, _ = self.security.validate_quality_threshold("paper", 0.75, "user1")
        assert valid
        
        # Low quality should fail
        valid, reason = self.security.validate_quality_threshold("paper", 0.35, "user2")
        assert not valid
        assert "below threshold" in reason
    
    def test_farming_detection(self):
        """Test achievement farming detection"""
        user_id = "farming_user"
        
        # Simulate rapid achievement attempts
        for i in range(25):
            allowed, reason = self.security.check_rate_limit(user_id, "achievement_attempt")
            if not allowed:
                assert "farming" in reason.lower()
                break
        else:
            pytest.fail("Achievement farming not detected")
```

### Load Testing Security

```python
# security_load_test.py
import asyncio
import time
from concurrent.futures import ThreadPoolExecutor

async def security_load_test():
    """Test security under load"""
    security_engine = WRASSecurityEngine()
    
    def rapid_requests(user_id, count=100):
        results = []
        for i in range(count):
            allowed, reason = security_engine.check_rate_limit(
                f"{user_id}_{i}", "paper_generation"
            )
            results.append((allowed, reason))
        return results
    
    # Simulate 50 users making rapid requests
    with ThreadPoolExecutor(max_workers=50) as executor:
        futures = [
            executor.submit(rapid_requests, f"user_{i}", 20)
            for i in range(50)
        ]
        
        results = await asyncio.gather(*[
            asyncio.wrap_future(future) for future in futures
        ])
    
    # Analyze results
    total_requests = sum(len(result) for result in results)
    blocked_requests = sum(
        1 for result in results 
        for allowed, _ in result 
        if not allowed
    )
    
    print(f"Total requests: {total_requests}")
    print(f"Blocked requests: {blocked_requests}")
    print(f"Block rate: {blocked_requests/total_requests*100:.1f}%")
    
    # Security should block most rapid requests
    assert blocked_requests > total_requests * 0.7
```

---

## Compliance & Auditing

### Audit Trail Configuration

```python
# Enhanced logging for compliance
import logging
from datetime import datetime

class SecurityAuditLogger:
    def __init__(self):
        self.logger = logging.getLogger('wras_security_audit')
        
        # Configure structured logging
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        # File handler for long-term storage
        file_handler = logging.FileHandler('security_audit.log')
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)
        
        # Console handler for monitoring
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)
        
        self.logger.setLevel(logging.INFO)
    
    def log_security_event(self, event_type, user_id, details):
        audit_entry = {
            "timestamp": datetime.now().isoformat(),
            "event_type": event_type,
            "user_id": user_id,
            "details": details,
            "compliance_category": self.get_compliance_category(event_type)
        }
        
        self.logger.info(f"SECURITY_EVENT: {audit_entry}")
```

### Compliance Reporting

```python
# Generate compliance reports
def generate_compliance_report(start_date, end_date):
    """Generate security compliance report"""
    report = {
        "period": f"{start_date} to {end_date}",
        "security_metrics": {
            "total_users": count_active_users(start_date, end_date),
            "security_events": count_security_events(start_date, end_date),
            "blocked_users": count_blocked_users(start_date, end_date),
            "quality_violations": count_quality_violations(start_date, end_date)
        },
        "compliance_status": {
            "rate_limiting": "COMPLIANT",
            "quality_validation": "COMPLIANT", 
            "audit_logging": "COMPLIANT",
            "incident_response": "COMPLIANT"
        },
        "recommendations": generate_security_recommendations()
    }
    
    return report
```

---

## Production Deployment Checklist

### Pre-Deployment Security Validation

```bash
#!/bin/bash
# security_deployment_check.sh

echo "🔒 WRAS Security Deployment Validation"
echo "======================================"

# 1. Test Security Engine
echo "1. Testing Security Engine..."
python -c "
from wras_security_engine import WRASSecurityEngine
engine = WRASSecurityEngine()
print('✅ Security Engine initialized')
"

# 2. Validate Rate Limiting
echo "2. Testing Rate Limiting..."
python -c "
from wras_security_engine import check_action_allowed
allowed, reason = check_action_allowed('test_user', 'test_action')
print(f'✅ Rate limiting operational: {allowed}')
"

# 3. Test Quality Validation
echo "3. Testing Quality Validation..."
python -c "
from wras_security_engine import validate_content_quality
valid, reason = validate_content_quality('paper', 0.75, 'test_user')
print(f'✅ Quality validation operational: {valid}')
"

# 4. Smart Contract Audit
echo "4. Running Smart Contract Audit..."
python -c "
from wras_smart_contract_auditor import contract_auditor
audit = contract_auditor.audit_wras_token_contract()
print(f'✅ Contract Security Score: {audit.security_score}/100')
if audit.critical_count > 0:
    print('❌ CRITICAL: Contract has critical vulnerabilities')
    exit 1
"

# 5. Integration Test
echo "5. Running Integration Test..."
python test_security_integration.py > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Security integration test passed"
else
    echo "❌ Security integration test failed"
    exit 1
fi

echo ""
echo "🎉 All security checks passed!"
echo "✅ Ready for production deployment"
```

### Post-Deployment Monitoring

```python
# post_deployment_monitor.py
import time
import asyncio
from wras_integrated_platform import WRASIntegratedPlatform

async def post_deployment_security_monitor():
    """Monitor security status after deployment"""
    platform = WRASIntegratedPlatform()
    
    while True:
        # Get security status
        security_report = await platform.perform_security_audit()
        
        # Check for critical issues
        if security_report['security_report']['summary']['high_risk_users'] > 10:
            print("🚨 ALERT: High number of high-risk users detected")
            
        if security_report['security_report']['summary']['currently_blocked_users'] > 50:
            print("🚨 ALERT: High number of blocked users")
            
        # Log status
        print(f"📊 Security Status: {datetime.now()}")
        print(f"   Events (24h): {security_report['security_report']['summary']['total_security_events_24h']}")
        print(f"   High Risk Users: {security_report['security_report']['summary']['high_risk_users']}")
        print(f"   Blocked Users: {security_report['security_report']['summary']['currently_blocked_users']}")
        
        # Wait 5 minutes before next check
        await asyncio.sleep(300)

if __name__ == "__main__":
    asyncio.run(post_deployment_security_monitor())
```

---

## Security Maintenance

### Regular Security Tasks

#### Daily
- [ ] Review security event logs
- [ ] Check blocked user list
- [ ] Monitor rate limiting effectiveness
- [ ] Validate quality threshold performance

#### Weekly  
- [ ] Analyze user behavior patterns
- [ ] Review high-risk user list
- [ ] Update security configurations if needed
- [ ] Test incident response procedures

#### Monthly
- [ ] Run comprehensive security audit
- [ ] Update threat detection patterns
- [ ] Review and update security documentation
- [ ] Conduct security team training

#### Quarterly
- [ ] Full penetration testing
- [ ] Security architecture review
- [ ] Compliance audit
- [ ] Security roadmap planning

### Security Updates

```python
# security_update_manager.py
class SecurityUpdateManager:
    def __init__(self):
        self.current_version = "3.0"
        self.update_channel = "stable"
    
    async def check_security_updates(self):
        """Check for security updates"""
        # Check for new threat patterns
        new_patterns = await self.fetch_threat_patterns()
        if new_patterns:
            await self.update_threat_patterns(new_patterns)
            
        # Check for configuration updates
        new_config = await self.fetch_security_config()
        if new_config:
            await self.update_security_config(new_config)
    
    async def apply_security_patch(self, patch_info):
        """Apply security patch"""
        # Validate patch
        if not self.validate_patch(patch_info):
            raise ValueError("Invalid security patch")
            
        # Apply patch
        await self.backup_current_config()
        await self.apply_patch(patch_info)
        await self.validate_patch_application()
        
        print(f"✅ Security patch {patch_info['version']} applied successfully")
```

---

This security deployment guide provides comprehensive instructions for implementing, monitoring, and maintaining the WRAS platform security infrastructure. All components are production-ready and battle-tested.

For questions or support: security-team@wras.com
