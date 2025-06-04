---
layout: post
title: "Python timestamp 값 얻기 - 현재시간, 변환, 활용법 완벽 가이드"
date: 2025-06-04 14:30:00 +0900
categories: [Development, Python]
tags: [python, timestamp, time, datetime, database, beginner]
author: "Kevin Park"
excerpt: "Python에서 timestamp 값을 얻고 변환하는 방법부터 실제 프로젝트 활용까지. 바로 사용 가능한 코드 예시와 함께 설명합니다."
---

# Python timestamp 값 얻기 - 현재시간, 변환, 활용법 완벽 가이드

## 🎯 핵심 해결책 (바로 사용 가능)

### 가장 많이 사용되는 패턴

```python
import time

# 1. 현재 timestamp 얻기 (소수점 포함)
timestamp = time.time()
print(timestamp)
# 출력: 1717484200.256982

# 2. 정수형 timestamp 얻기 (가장 많이 사용)
timestamp_int = int(time.time())
print(timestamp_int)
# 출력: 1717484200

# 3. 밀리초 단위 timestamp (JavaScript 호환)
timestamp_ms = int(time.time() * 1000)
print(timestamp_ms)
# 출력: 1717484200256
```

### 실무에서 자주 사용하는 변환

```python
from datetime import datetime

# 4. datetime을 timestamp로 변환
dt = datetime.now()
timestamp_from_dt = int(dt.timestamp())

# 5. timestamp를 datetime으로 변환
dt_from_timestamp = datetime.fromtimestamp(timestamp_int)
print(dt_from_timestamp)
# 출력: 2025-06-04 14:30:00

# 6. 특정 날짜의 timestamp 얻기
specific_date = datetime(2025, 12, 25, 0, 0, 0)
christmas_timestamp = int(specific_date.timestamp())
```

### 데이터베이스 저장용 포맷

```python
# DynamoDB, MongoDB 등에서 사용
db_timestamp = {
    'created_at': int(time.time()),
    'updated_at': int(time.time())
}

# MySQL, PostgreSQL 등에서 사용
sql_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
```

---

## 📚 상세 설명

### 배경 및 필요성

Timestamp는 특정 시점을 숫자로 표현하는 방법으로, 1970년 1월 1일 00:00:00 UTC부터 경과한 초의 수를 나타냅니다. 개발에서 timestamp가 필요한 주요 상황들:

- **데이터베이스 저장**: 생성/수정 시간 기록
- **API 통신**: 시간 데이터 교환
- **로그 관리**: 이벤트 발생 시간 추적
- **캐시 만료**: TTL(Time To Live) 설정
- **성능 측정**: 실행 시간 계산

### 다양한 timestamp 생성 방법

#### 1. time 모듈 사용

```python
import time

# 현재 시간의 timestamp (float)
current_time = time.time()
print(f"Float timestamp: {current_time}")

# 정수형으로 변환 (초 단위)
int_timestamp = int(current_time)
print(f"Integer timestamp: {int_timestamp}")

# 밀리초 단위 (JavaScript와 호환)
ms_timestamp = int(current_time * 1000)
print(f"Millisecond timestamp: {ms_timestamp}")
```

#### 2. datetime 모듈 사용

```python
from datetime import datetime, timezone

# 현재 시간의 timestamp
now = datetime.now()
timestamp = int(now.timestamp())

# UTC 시간으로 변환
utc_now = datetime.now(timezone.utc)
utc_timestamp = int(utc_now.timestamp())

# 특정 날짜의 timestamp
specific_date = datetime(2025, 1, 1, 0, 0, 0)
new_year_timestamp = int(specific_date.timestamp())
```

### 실제 활용 사례

#### 1. DynamoDB TTL 설정

```python
import time

def create_session_data(user_id, session_data, expire_hours=24):
    """세션 데이터를 DynamoDB에 저장 (TTL 설정)"""
    ttl = int(time.time()) + (expire_hours * 3600)  # 24시간 후 만료
    
    item = {
        'user_id': user_id,
        'session_data': session_data,
        'created_at': int(time.time()),
        'ttl': ttl  # DynamoDB가 자동으로 삭제
    }
    return item

# 사용 예시
session = create_session_data('user123', {'login': True})
print(session)
```

#### 2. API 로그 시간 기록

```python
import time
import json

def log_api_request(endpoint, method, response_time):
    """API 요청 로그 기록"""
    log_entry = {
        'timestamp': int(time.time()),
        'endpoint': endpoint,
        'method': method,
        'response_time_ms': response_time,
        'date_readable': datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
    }
    
    # 로그 파일에 저장
    with open('api_logs.json', 'a') as f:
        f.write(json.dumps(log_entry) + '\n')

# 사용 예시
log_api_request('/api/users', 'GET', 150)
```

#### 3. 성능 측정

```python
import time

def measure_execution_time(func):
    """함수 실행 시간 측정 데코레이터"""
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        
        execution_time = end_time - start_time
        print(f"{func.__name__} 실행 시간: {execution_time:.4f}초")
        return result
    return wrapper

@measure_execution_time
def slow_function():
    time.sleep(2)  # 2초 대기
    return "완료"

# 사용 예시
slow_function()
# 출력: slow_function 실행 시간: 2.0021초
```

### 시간대 처리 및 변환

```python
from datetime import datetime, timezone
import pytz

# UTC timestamp 생성
utc_now = datetime.now(timezone.utc)
utc_timestamp = int(utc_now.timestamp())

# 한국 시간으로 변환
kst = pytz.timezone('Asia/Seoul')
kst_time = datetime.fromtimestamp(utc_timestamp, tz=kst)

# 다양한 시간대의 timestamp
timezones = {
    'UTC': timezone.utc,
    'KST': pytz.timezone('Asia/Seoul'),
    'PST': pytz.timezone('US/Pacific'),
    'EST': pytz.timezone('US/Eastern')
}

for tz_name, tz in timezones.items():
    local_time = datetime.now(tz)
    timestamp = int(local_time.timestamp())
    print(f"{tz_name}: {timestamp} ({local_time.strftime('%Y-%m-%d %H:%M:%S %Z')})")
```

### 에러 처리 및 예외 상황

```python
from datetime import datetime

def safe_timestamp_conversion(date_string, format_string='%Y-%m-%d %H:%M:%S'):
    """안전한 날짜 문자열을 timestamp로 변환"""
    try:
        dt = datetime.strptime(date_string, format_string)
        return int(dt.timestamp())
    except ValueError as e:
        print(f"날짜 형식 오류: {e}")
        return None
    except Exception as e:
        print(f"예상치 못한 오류: {e}")
        return None

# 사용 예시
valid_date = "2025-06-04 14:30:00"
invalid_date = "2025-13-40 25:70:70"

print(safe_timestamp_conversion(valid_date))    # 정상 변환
print(safe_timestamp_conversion(invalid_date))  # None 반환
```

### 유용한 헬퍼 함수들

```python
import time
from datetime import datetime

class TimestampHelper:
    """Timestamp 관련 유틸리티 클래스"""
    
    @staticmethod
    def now():
        """현재 timestamp (정수)"""
        return int(time.time())
    
    @staticmethod
    def now_ms():
        """현재 timestamp (밀리초)"""
        return int(time.time() * 1000)
    
    @staticmethod
    def to_readable(timestamp):
        """timestamp를 읽기 쉬운 형태로 변환"""
        return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')
    
    @staticmethod
    def days_ago(days):
        """N일 전의 timestamp"""
        return int(time.time() - (days * 24 * 3600))
    
    @staticmethod
    def days_later(days):
        """N일 후의 timestamp"""
        return int(time.time() + (days * 24 * 3600))

# 사용 예시
helper = TimestampHelper()

print(f"현재: {helper.now()}")
print(f"현재 (ms): {helper.now_ms()}")
print(f"읽기 쉬운 형태: {helper.to_readable(helper.now())}")
print(f"7일 전: {helper.days_ago(7)}")
print(f"30일 후: {helper.days_later(30)}")
```

## 결론

Python에서 timestamp를 다루는 것은 개발의 기본이지만, 실제 프로젝트에서는 시간대 처리, 데이터베이스 저장, API 통신 등 다양한 상황을 고려해야 합니다. 이 포스트에서 제공한 코드 예시들을 참고하여 여러분의 프로젝트에 적합한 방식을 선택하시기 바랍니다.

**핵심 포인트**:
- 대부분의 경우 `int(time.time())`으로 충분
- 데이터베이스 저장 시 정수형 timestamp 권장
- 시간대가 중요한 경우 UTC 기준으로 저장
- 에러 처리를 통한 안전한 변환 구현

**다음 단계**: 
- Django나 Flask에서의 timestamp 활용
- 시계열 데이터베이스와 timestamp
- 마이크로서비스 간 시간 동기화 방법