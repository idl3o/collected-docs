# WRAS Security API Reference
**Version**: 4.0  
**Date**: July 4, 2025  
**Audience**: Developers, Integration Engineers  
**Status**: Production Ready - Security Integration Complete

---

## Overview

This document provides comprehensive API reference for the WRAS Security Engine, including all security validation methods, behavioral analysis functions, and smart contract auditing capabilities integrated into the production platform.

## Security Engine API

### Core Security Functions

#### `check_action_allowed(user_id, action_type, ip_address=None)`

Validates if a user action is permitted based on rate limits, anti-farming detection, and security policies.

**Parameters:**
- `user_id` (str): Unique user identifier
- `action_type` (str): Type of action ('paper_generation', 'achievement_attempt', 'marketplace_transaction', etc.)
- `ip_address` (str, optional): Client IP address for multi-account detection

**Returns:**
- `Tuple[bool, str]`: (allowed, reason_if_blocked)

**Security Validations:**
- Rate limiting (minute, hour, daily)
- Anti-farming detection
- IP-based multi-account detection
- Cooldown period enforcement

**Example:**
```python
from wras_security_engine import check_action_allowed

allowed, reason = check_action_allowed(
    user_id="user_123",
    action_type="paper_generation",
    ip_address="192.168.1.100"
)

if not allowed:
    return {"error": f"Action blocked: {reason}"}
```

#### `validate_quality_threshold(content_type, quality_score, user_id)`

Validates content meets quality thresholds before rewards are processed.

**Parameters:**
- `content_type` (str): Content type ('paper', 'achievement', 'contribution')
- `quality_score` (float): Calculated quality score (0.0-1.0)
- `user_id` (str): User identifier for logging and analysis

**Returns:**
- `Tuple[bool, str]`: (valid, reason_if_invalid)

**Quality Thresholds:**
- Papers: 0.60 minimum
- Achievements: 0.50 minimum  
- Contributions: 0.40 minimum

**Example:**
```python
from wras_security_engine import WRASSecurityEngine

security_engine = WRASSecurityEngine()

valid, reason = security_engine.validate_quality_threshold(
    content_type="paper",
    quality_score=0.75,
    user_id="user_123"
)

if not valid:
    return {"error": f"Quality validation failed: {reason}"}
```

#### `analyze_user_behavior(user_id)`

Performs comprehensive behavior analysis for a user including farming detection.

**Parameters:**
- `user_id` (str): User identifier to analyze

**Returns:**
- `UserBehaviorPattern`: Detailed behavior analysis object

**Analysis Includes:**
- Action frequency patterns
- Quality score trends
- Achievement farming indicators
- Risk level assessment

**Example:**
```python
from wras_security_engine import WRASSecurityEngine

security_engine = WRASSecurityEngine()
pattern = security_engine.analyze_user_behavior("user_123")

print(f"Risk Level: {pattern.risk_level}")
print(f"Farming Score: {pattern.achievement_farming_score:.2f}")
print(f"Suspicious Patterns: {pattern.suspicious_patterns}")
```

---

## Security Engine Class

### `WRASSecurityEngine`

Main security engine providing comprehensive protection.

#### Initialization

```python
from wras_security_engine import WRASSecurityEngine

security_engine = WRASSecurityEngine()
```

#### Configuration Methods

##### `update_quality_thresholds(new_thresholds)`

Updates quality validation thresholds.

**Parameters:**
- `new_thresholds` (Dict[str, float]): New threshold values

**Example:**
```python
security_engine.update_quality_thresholds({
    'min_paper_quality': 0.65,
    'min_achievement_quality': 0.55,
    'min_contribution_quality': 0.45
})
```

##### `reset_user_behavior(user_id)`

Resets behavior tracking for a user (appeals/testing).

**Parameters:**
- `user_id` (str): User to reset

**Example:**
```python
security_engine.reset_user_behavior("user_123")
```

#### Monitoring Methods

##### `get_security_report()`

Generates comprehensive security report.

**Returns:**
- `Dict[str, Any]`: Detailed security status report

**Example:**
```python
report = security_engine.get_security_report()

print(f"Security Events (24h): {report['summary']['total_security_events_24h']}")
print(f"High Risk Users: {report['summary']['high_risk_users']}")
print(f"Currently Blocked: {report['summary']['currently_blocked_users']}")
```

##### `detect_coordinated_activity(user_ids, time_window=300)`

Detects coordinated activity between users.

**Parameters:**
- `user_ids` (List[str]): List of user IDs to analyze
- `time_window` (int): Time window in seconds (default: 5 minutes)

**Returns:**
- `Dict[str, Any]`: Coordinated activity analysis

**Example:**
```python
coordinated = security_engine.detect_coordinated_activity([
    "user_1", "user_2", "user_3"
])

if coordinated:
    print(f"Suspicious coordination detected: {coordinated}")
```

---

## Smart Contract Auditor API

### `WRASSmartContractAuditor`

Smart contract security analysis engine.

#### Initialization

```python
from wras_smart_contract_auditor import WRASSmartContractAuditor

auditor = WRASSmartContractAuditor()
```

#### Audit Methods

##### `audit_contract(contract_code, contract_name="Unknown")`

Performs comprehensive security audit of smart contract.

**Parameters:**
- `contract_code` (str): Solidity contract source code
- `contract_name` (str, optional): Contract name for reporting

**Returns:**
- `ContractAnalysis`: Detailed audit results

**Example:**
```python
contract_code = """
pragma solidity ^0.8.0;
contract MyContract {
    // Contract code here
}
"""

analysis = auditor.audit_contract(contract_code, "MyContract")

print(f"Security Score: {analysis.security_score}/100")
print(f"Critical Issues: {analysis.critical_count}")
print(f"High Issues: {analysis.high_count}")
```

##### `generate_audit_report(analysis)`

Generates human-readable audit report.

**Parameters:**
- `analysis` (ContractAnalysis): Audit results from audit_contract()

**Returns:**
- `str`: Formatted audit report

**Example:**
```python
analysis = auditor.audit_contract(contract_code)
report = auditor.generate_audit_report(analysis)

print(report)
# Outputs formatted security report
```

##### `audit_wras_token_contract()`

Audits the built-in WRAS token contract.

**Returns:**
- `ContractAnalysis`: WRAS token audit results

**Example:**
```python
analysis = auditor.audit_wras_token_contract()

print(f"WRAS Token Security Score: {analysis.security_score}/100")
print(f"Deployment Cost: {analysis.gas_analysis['estimated_deployment_cost']} gas")
```

---

## Integrated Platform Security API

### Security-Enhanced Methods

#### `generate_paper_with_full_security(user_id, requirements, ip_address=None)`

Generates paper with comprehensive security checks.

**Parameters:**
- `user_id` (str): User identifier
- `requirements` (PaperRequirements): Paper generation requirements
- `ip_address` (str, optional): Client IP address

**Returns:**
- `Dict[str, Any]`: Generation result with security analysis

**Example:**
```python
from wras_integrated_platform import WRASIntegratedPlatform
from wras_research_paper_generator import PaperRequirements, ResearchDomain

platform = WRASIntegratedPlatform()

requirements = PaperRequirements(
    topic="AI Security Research",
    domain=ResearchDomain.COMPUTER_SCIENCE,
    target_length=2000
)

result = await platform.generate_paper_with_full_security(
    user_id="user_123",
    requirements=requirements,
    ip_address="192.168.1.100"
)

if result.get('success', True):
    print(f"Paper generated: {result['paper']['title']}")
    print(f"Security risk: {result['security_analysis']['risk_level']}")
else:
    print(f"Generation failed: {result['error']}")
```

#### `check_user_security(user_id)`

Checks user security status and behavior.

**Parameters:**
- `user_id` (str): User to analyze

**Returns:**
- `Dict[str, Any]`: Security status and recommendations

**Example:**
```python
security_status = await platform.check_user_security("user_123")

print(f"Risk Level: {security_status['risk_level']}")
print(f"Blocked: {security_status['blocked']}")
print(f"Recommendations: {security_status['security_recommendations']}")
```

#### `perform_security_audit(user_ids=None)`

Performs comprehensive security audit.

**Parameters:**
- `user_ids` (List[str], optional): Specific users to analyze

**Returns:**
- `Dict[str, Any]`: Complete security audit results

**Example:**
```python
audit_result = await platform.perform_security_audit([
    "user_1", "user_2", "user_3"
])

print(f"Security Events: {audit_result['security_report']['summary']}")
print(f"Coordinated Activity: {audit_result['coordinated_activity']}")
```

---

## Data Models

### `SecurityEvent`

Represents a security event in the system.

```python
@dataclass
class SecurityEvent:
    event_type: str          # Event classification
    user_id: str            # Affected user
    timestamp: float        # Unix timestamp
    severity: str           # CRITICAL/HIGH/MEDIUM/LOW
    details: Dict[str, Any] # Event-specific data
    action_taken: str       # Response action
```

### `UserBehaviorPattern`

User behavior analysis results.

```python
@dataclass
class UserBehaviorPattern:
    user_id: str
    actions_per_hour: List[int]           # Hourly activity
    quality_scores: List[float]           # Quality history
    achievement_farming_score: float      # Farming likelihood
    suspicious_patterns: List[str]        # Detected anomalies
    risk_level: str                       # LOW/MEDIUM/HIGH
```

### `SecurityVulnerability`

Smart contract vulnerability finding.

```python
@dataclass
class SecurityVulnerability:
    severity: str           # CRITICAL/HIGH/MEDIUM/LOW
    category: str          # Vulnerability type
    description: str       # Issue description
    location: str          # Code location
    recommendation: str    # Fix recommendation
    cwe_id: Optional[str]  # Common Weakness Enumeration
    confidence: float      # Detection confidence
```

### `ContractAnalysis`

Smart contract audit results.

```python
@dataclass
class ContractAnalysis:
    contract_name: str
    file_path: str
    total_vulnerabilities: int
    critical_count: int
    high_count: int
    medium_count: int
    low_count: int
    vulnerabilities: List[SecurityVulnerability]
    gas_analysis: Dict[str, Any]
    security_score: float
    recommendations: List[str]
```

---

## Configuration Reference

### Rate Limiting Configuration

```python
@dataclass
class RateLimitConfig:
    max_actions_per_minute: int = 10
    max_actions_per_hour: int = 100
    max_paper_generations_per_day: int = 5
    max_achievement_attempts_per_hour: int = 20
    cooldown_period_seconds: int = 300
```

### Quality Thresholds

```python
QUALITY_THRESHOLDS = {
    'min_paper_quality': 0.60,      # Papers
    'min_achievement_quality': 0.50, # Achievements
    'min_contribution_quality': 0.40  # General contributions
}
```

### Vulnerability Patterns

```python
VULNERABILITY_PATTERNS = {
    "reentrancy": {
        "pattern": r"(call\.value\(|\.call\(|\.delegatecall\()",
        "severity": "CRITICAL",
        "cwe_id": "CWE-862"
    },
    "integer_overflow": {
        "pattern": r"(\+\+|\-\-|\+|\-|\*|\/|\%|\*\*)",
        "severity": "HIGH", 
        "cwe_id": "CWE-190"
    }
    # ... additional patterns
}
```

---

## Error Handling

### Security Exceptions

The security system uses standard error handling patterns:

```python
try:
    allowed, reason = check_action_allowed(user_id, action_type)
    if not allowed:
        raise SecurityError(f"Action blocked: {reason}")
        
except SecurityError as e:
    logger.warning(f"Security violation: {e}")
    return {"error": str(e), "code": "SECURITY_VIOLATION"}

except Exception as e:
    logger.error(f"Security system error: {e}")
    return {"error": "Security check failed", "code": "SECURITY_ERROR"}
```

### Common Error Codes

- `RATE_LIMIT_EXCEEDED`: User hit rate limits
- `QUALITY_THRESHOLD_VIOLATION`: Content below standards
- `FARMING_DETECTED`: Achievement farming detected
- `MULTI_ACCOUNT_DETECTED`: Multiple accounts from same IP
- `COORDINATED_ACTIVITY`: Suspicious coordination detected
- `SECURITY_ERROR`: General security system error

---

## Integration Examples

### Flask Integration

```python
from flask import Flask, request, jsonify
from wras_security_engine import check_action_allowed

app = Flask(__name__)

@app.before_request
def security_check():
    user_id = request.headers.get('User-ID')
    action_type = request.endpoint
    ip_address = request.remote_addr
    
    if user_id and action_type:
        allowed, reason = check_action_allowed(user_id, action_type, ip_address)
        if not allowed:
            return jsonify({"error": f"Security check failed: {reason}"}), 403
```

### FastAPI Integration

```python
from fastapi import FastAPI, HTTPException, Request
from wras_security_engine import check_action_allowed

app = FastAPI()

@app.middleware("http")
async def security_middleware(request: Request, call_next):
    user_id = request.headers.get("user-id")
    action_type = request.url.path
    ip_address = request.client.host
    
    if user_id:
        allowed, reason = check_action_allowed(user_id, action_type, ip_address)
        if not allowed:
            raise HTTPException(status_code=403, detail=f"Security check failed: {reason}")
    
    response = await call_next(request)
    return response
```

### WebSocket Integration

```python
import websockets
from wras_security_engine import check_action_allowed

async def websocket_handler(websocket, path):
    user_id = await websocket.recv()  # Get user ID
    ip_address = websocket.remote_address[0]
    
    # Check connection allowed
    allowed, reason = check_action_allowed(user_id, "websocket_connection", ip_address)
    if not allowed:
        await websocket.send(f"Connection denied: {reason}")
        await websocket.close()
        return
    
    # Continue with normal WebSocket handling
    async for message in websocket:
        # Process messages with security checks
        pass
```

---

## Testing the Security API

### Unit Test Example

```python
import pytest
from wras_security_engine import WRASSecurityEngine

def test_rate_limiting():
    security = WRASSecurityEngine()
    user_id = "test_user"
    
    # Should allow initial actions
    for i in range(5):
        allowed, _ = security.check_rate_limit(user_id, "paper_generation")
        assert allowed
    
    # Should block after daily limit
    allowed, reason = security.check_rate_limit(user_id, "paper_generation")
    assert not allowed
    assert "Daily paper generation limit exceeded" in reason

def test_quality_validation():
    security = WRASSecurityEngine()
    
    # High quality should pass
    valid, _ = security.validate_quality_threshold("paper", 0.75, "user1")
    assert valid
    
    # Low quality should fail
    valid, reason = security.validate_quality_threshold("paper", 0.35, "user2")
    assert not valid
    assert "below threshold" in reason
```

### Integration Test Example

```python
import asyncio
from wras_integrated_platform import WRASIntegratedPlatform

async def test_security_integration():
    platform = WRASIntegratedPlatform()
    
    # Test rate limiting
    for i in range(7):  # Exceed daily limit
        result = await platform.generate_paper_with_rewards(
            "test_user", requirements, "192.168.1.100"
        )
        
        if not result.get('success', True):
            assert "rate limit" in result['error'].lower()
            break
    
    # Test quality validation
    security_check = await platform.check_user_security("test_user")
    assert security_check['risk_level'] in ['LOW', 'MEDIUM', 'HIGH']
```

---

This API reference provides complete documentation for integrating WRAS security features into your applications. For additional support, contact: api-support@wras.com
