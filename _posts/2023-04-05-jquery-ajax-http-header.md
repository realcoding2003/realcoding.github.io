---
layout: post
title: "Javascript jQuery AJAX 통신 시 HTTP Header에 값 추가하기"
date: 2023-04-05 12:00:00 +0900
categories: [Development, Tutorial]
tags: [javascript, jquery, ajax, http-header, beforeSend, authorization]
author: "Kevin Park"
lang: ko
excerpt: "AJAX 통신 시 beforeSend와 setRequestHeader를 사용하여 HTTP 헤더에 인증 토큰을 추가하는 핵심 방법과 실제 활용 예시를 알아봅니다."
---

# Javascript jQuery AJAX 통신 시 HTTP Header에 값 추가하기

## 🎯 핵심 해결책 (바로 사용 가능)

AJAX 통신 시 HTTP 헤더에 값을 추가하려면 **`beforeSend`** 옵션을 사용합니다.

```javascript
$.ajax({
    method: "POST",
    url: "your-api-url",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer your-token");
        xhr.setRequestHeader("x-api-key", "your-api-key");
    },
    success: function(response) {
        console.log(response);
    },
    error: function(xhr, status, error) {
        console.error('Error:', error);
    }
});
```

### 가장 많이 사용되는 패턴

**1. Authorization 헤더 추가**
```javascript
beforeSend: function(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
}
```

**2. API Key 헤더 추가**
```javascript
beforeSend: function(xhr) {
    xhr.setRequestHeader("x-api-key", "your-api-key");
}
```

**3. 다중 헤더 추가**
```javascript
beforeSend: function(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-Custom-Header", "custom-value");
}
```

---

## 📚 상세 설명

### beforeSend가 필요한 이유

웹 애플리케이션에서 API 서버와 통신할 때 보안을 위해 HTTP 헤더에 인증 정보를 포함해야 하는 경우가 많습니다. 특히 다음과 같은 상황에서 필수적입니다:

- **REST API 인증**: JWT 토큰, Bearer 토큰
- **AWS API Gateway**: API Key, IAM 인증
- **타사 API 연동**: 각 서비스별 인증 키
- **CSRF 보안**: 토큰 기반 보안 처리

### 실제 개발 사례

아래는 AWS API Gateway와 Cognito 인증을 사용하는 실제 개발 코드입니다:

```javascript
$.ajax({
    method: "POST",
    url: "https://console-api.ciottb.com/dashboard",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", cognito.session.idToken.jwtToken);
    },
    error: function(xhr, status, error) {
        alert(xhr.responseJSON.errorMessage);
        Swal.fire({
            type: 'error',
            title: xhr.responseJSON.errorMessage,
            showConfirmButton: true,
        });
    },
    success: function(res) {
        $("#word_cloud").jqCloud(res.total.wordcloud);
        tot_wordList(res.total.word_cnt);
        risk(res.Apple, "#apple");
        risk(res.Canonical, "#Canonical");
        risk(res.Cisco, "#Cisco");
        risk(res.Debian, "#Debian");
        risk(res.Google, "#Google");
        risk(res.Linux, "#Linux");
        risk(res.Microsoft, "#Microsoft");
        risk(res.Redhat, "#Redhat");
        risk(res.Sqlite, "#Sqlite");
    }
});
```

### xhr.setRequestHeader() 메서드 상세

**구문**
```javascript
xhr.setRequestHeader(헤더명, 헤더값)
```

**매개변수**
- `헤더명`: HTTP 헤더의 이름 (문자열)
- `헤더값`: 해당 헤더에 설정할 값 (문자열)

**주의사항**
- `beforeSend` 콜백 내에서만 호출 가능
- 대소문자 구분하지 않음 (HTTP 표준)
- 동일한 헤더명으로 여러 번 호출 시 값이 누적됨

### 다양한 활용 예시

**1. 조건부 헤더 추가**
```javascript
$.ajax({
    method: "GET",
    url: "/api/data",
    beforeSend: function(xhr) {
        // 로그인 상태일 때만 토큰 추가
        const token = localStorage.getItem('accessToken');
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
        
        // 개발 환경에서만 디버그 헤더 추가
        if (window.location.hostname === 'localhost') {
            xhr.setRequestHeader("X-Debug-Mode", "enabled");
        }
    }
});
```

**2. 동적 토큰 처리**
```javascript
function makeAuthenticatedRequest(url, data) {
    return $.ajax({
        method: "POST",
        url: url,
        beforeSend: function(xhr) {
            // 토큰 만료 체크 및 갱신
            const token = getValidToken(); // 토큰 검증 함수
            xhr.setRequestHeader("Authorization", "Bearer " + token);
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        data: JSON.stringify(data)
    });
}
```

**3. 전역 헤더 설정**
```javascript
// 모든 AJAX 요청에 공통 헤더 적용
$.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        
        // 인증 토큰이 있을 때만 추가
        const token = sessionStorage.getItem('authToken');
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    }
});

// 이후 모든 $.ajax() 호출에 자동으로 헤더 추가됨
$.get("/api/user/profile", function(data) {
    console.log(data);
});
```

### 자주 사용되는 헤더 타입

**1. 인증 관련 헤더**
```javascript
// JWT 토큰
xhr.setRequestHeader("Authorization", "Bearer " + jwtToken);

// API Key
xhr.setRequestHeader("x-api-key", apiKey);
xhr.setRequestHeader("X-API-KEY", apiKey);

// Basic 인증
xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
```

**2. 콘텐츠 관련 헤더**
```javascript
// JSON 데이터 전송
xhr.setRequestHeader("Content-Type", "application/json");

// 파일 업로드
xhr.setRequestHeader("Content-Type", "multipart/form-data");

// 응답 형식 지정
xhr.setRequestHeader("Accept", "application/json");
```

**3. 보안 관련 헤더**
```javascript
// CSRF 토큰
xhr.setRequestHeader("X-CSRF-Token", csrfToken);

// 요청 출처 확인
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

// 커스텀 보안 헤더
xhr.setRequestHeader("X-Client-Version", "1.0.0");
```

### 에러 처리 및 디버깅

**1. 헤더 관련 에러 처리**
```javascript
$.ajax({
    method: "POST",
    url: "/api/data",
    beforeSend: function(xhr) {
        try {
            xhr.setRequestHeader("Authorization", "Bearer " + getToken());
        } catch (error) {
            console.error("헤더 설정 오류:", error);
            return false; // 요청 중단
        }
    },
    error: function(xhr, status, error) {
        if (xhr.status === 401) {
            alert("인증이 필요합니다. 다시 로그인해주세요.");
            window.location.href = "/login";
        } else if (xhr.status === 403) {
            alert("권한이 없습니다.");
        }
    }
});
```

**2. 헤더 값 확인하기**
```javascript
$.ajax({
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        
        // 개발자 도구에서 헤더 확인
        console.log("설정된 헤더:", {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        });
    }
});
```

### AWS API Gateway 특화 예시

**1. Cognito 사용자 풀 인증**
```javascript
function callApiWithCognito(endpoint, data) {
    const cognitoUser = userPool.getCurrentUser();
    
    cognitoUser.getSession((err, session) => {
        if (err) {
            console.error('세션 오류:', err);
            return;
        }
        
        $.ajax({
            method: "POST",
            url: `https://your-api-id.execute-api.region.amazonaws.com/prod/${endpoint}`,
            beforeSend: function(xhr) {
                // Cognito JWT 토큰
                xhr.setRequestHeader("Authorization", session.getIdToken().getJwtToken());
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            data: JSON.stringify(data),
            success: function(response) {
                console.log('성공:', response);
            }
        });
    });
}
```

**2. IAM 서명 인증 (AWS Signature V4)**
```javascript
$.ajax({
    method: "POST",
    url: "https://api.amazonaws.com/service",
    beforeSend: function(xhr) {
        // AWS SDK로 생성된 서명 헤더들
        xhr.setRequestHeader("Authorization", awsSignature);
        xhr.setRequestHeader("X-Amz-Date", amzDate);
        xhr.setRequestHeader("X-Amz-Security-Token", sessionToken);
    }
});
```

## 결론

jQuery AJAX에서 HTTP 헤더 추가는 `beforeSend` 옵션과 `xhr.setRequestHeader()` 메서드를 사용하여 간단하게 구현할 수 있습니다. 

**핵심 포인트**:
- `beforeSend` 콜백에서 `xhr.setRequestHeader(헤더명, 헤더값)` 사용
- 인증 토큰, API 키 등 보안 정보 전송에 필수
- 조건부 헤더 추가 및 에러 처리 고려
- AWS API Gateway 등 클라우드 서비스 연동 시 활용

이 방법을 통해 안전하고 효율적인 API 통신을 구현할 수 있습니다.