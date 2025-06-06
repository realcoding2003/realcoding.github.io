---
layout: post
title: "Mermaid 다이어그램 테스트 포스트"
date: 2025-01-01 10:00:00 +0900
categories: [Test, Mermaid]
tags: [mermaid, diagram, flowchart, test]
author: "Kevin Park"
excerpt: "사이트에 추가된 Mermaid 다이어그램 기능을 테스트하는 포스트입니다."
mermaid: true
---

# Mermaid 다이어그램 기능 테스트

이 포스트는 새롭게 추가된 Mermaid 다이어그램 기능을 테스트하기 위한 샘플 포스트입니다.

## 📊 플로우차트 예시

```mermaid
graph TD
    A[프로젝트 시작] --> B{요구사항 분석}
    B -->|명확함| C[설계 단계]
    B -->|불명확함| D[추가 조사]
    D --> B
    C --> E[개발 단계]
    E --> F[테스트]
    F --> G{테스트 통과?}
    G -->|통과| H[배포]
    G -->|실패| E
    H --> I[운영 및 유지보수]
```

## 🔄 시퀀스 다이어그램

```mermaid
sequenceDiagram
    participant U as 사용자
    participant F as 프론트엔드
    participant B as 백엔드
    participant D as 데이터베이스

    U->>F: 로그인 요청
    F->>B: 인증 정보 전송
    B->>D: 사용자 정보 조회
    D-->>B: 사용자 데이터 반환
    B-->>F: 인증 토큰 발급
    F-->>U: 로그인 완료
```

## 📈 간트 차트

```mermaid
gantt
    title 프로젝트 일정
    dateFormat  YYYY-MM-DD
    section 기획
    요구사항 분석    :done, planning, 2025-01-01, 2025-01-10
    설계            :done, design, 2025-01-05, 2025-01-15
    section 개발
    프론트엔드 개발  :active, frontend, 2025-01-10, 2025-02-10
    백엔드 개발      :backend, 2025-01-15, 2025-02-15
    section 테스트
    단위 테스트      :testing, 2025-02-01, 2025-02-20
    통합 테스트      :integration, 2025-02-15, 2025-02-25
```

## 🏗️ 클래스 다이어그램

```mermaid
classDiagram
    class User {
        +String name
        +String email
        +Date createdAt
        +login()
        +logout()
    }
    
    class Post {
        +String title
        +String content
        +Date publishedAt
        +User author
        +publish()
        +draft()
    }
    
    class Comment {
        +String content
        +Date createdAt
        +User author
        +Post post
        +create()
        +delete()
    }
    
    User ||--o{ Post : writes
    User ||--o{ Comment : writes
    Post ||--o{ Comment : has
```

## 🔢 파이 차트

```mermaid
pie title 기술 스택 사용률
    "JavaScript" : 35
    "Python" : 25
    "Java" : 20
    "TypeScript" : 15
    "기타" : 5
```

## 📋 상태 다이어그램

```mermaid
stateDiagram-v2
    [*] --> 초안
    초안 --> 검토중 : 제출
    검토중 --> 승인됨 : 승인
    검토중 --> 수정필요 : 거절
    수정필요 --> 초안 : 수정
    승인됨 --> 게시됨 : 게시
    게시됨 --> 보관됨 : 보관
    보관됨 --> [*]
```

## 🌐 ER 다이어그램

```mermaid
erDiagram
    USER ||--o{ POST : creates
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST }|--|| CATEGORY : belongs_to
    
    USER {
        int id PK
        string name
        string email UK
        datetime created_at
    }
    
    POST {
        int id PK
        string title
        text content
        int user_id FK
        int category_id FK
        datetime published_at
    }
    
    COMMENT {
        int id PK
        text content
        int user_id FK
        int post_id FK
        datetime created_at
    }
    
    CATEGORY {
        int id PK
        string name UK
        string description
    }
```

## ✅ 사용법 안내

포스팅에서 Mermaid 다이어그램을 사용하려면:

1. **Front Matter에 설정 추가:**
   ```yaml
   ---
   layout: post
   title: "포스트 제목"
   mermaid: true  # 이 줄 추가!
   ---
   ```

2. **마크다운에서 사용:**
   ````markdown
   ```mermaid
   graph TD
       A[시작] --> B[끝]
   ```
   ````

3. **지원되는 다이어그램 종류:**
   - 플로우차트 (`graph`, `flowchart`)
   - 시퀀스 다이어그램 (`sequenceDiagram`)
   - 클래스 다이어그램 (`classDiagram`)
   - 상태 다이어그램 (`stateDiagram`)
   - ER 다이어그램 (`erDiagram`)
   - 간트 차트 (`gantt`)
   - 파이 차트 (`pie`)
   - 그리고 더 많은 종류...

Mermaid 문법에 대한 자세한 정보는 [공식 문서](https://mermaid.js.org/)를 참고하세요! 