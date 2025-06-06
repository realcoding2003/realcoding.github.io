---
layout: post
title: "사이트 맞춤형 Mermaid 다이어그램 스타일링 테스트"
date: 2025-06-06 15:00:00 +0900
categories: [Test, Design]
tags: [mermaid, design-system, styling, custom-theme]
author: "Kevin Park"
excerpt: "사이트의 보라-핑크 그라데이션 톤앤매너에 맞춰 커스터마이징된 Mermaid 다이어그램을 테스트합니다."
mermaid: true
---

# 사이트 맞춤형 Mermaid 스타일링

이 포스트는 사이트의 **보라-핑크 그라데이션** 톤앤매너에 맞춰 커스터마이징된 Mermaid 다이어그램을 테스트합니다. 모든 다이어그램이 사이트의 디자인 시스템과 일관된 색상과 스타일을 사용합니다.

## 🎨 **사이트 색상 체계**

- **Primary**: `#667eea` (보라빛 블루)
- **Secondary**: `#764ba2` (진보라) 
- **Accent**: `#f093fb` (핑크)
- **Gradient**: Primary → Secondary 선형 그라데이션

---

## 📊 **커스텀 스타일 플로우차트**

```mermaid
graph TD
    A[프로젝트 기획] --> B{기술 스택 선택}
    B -->|React| C[React App 개발]
    B -->|Vue| D[Vue App 개발]
    B -->|Vanilla| E[순수 JS 개발]
    
    C --> F[컴포넌트 설계]
    D --> F
    E --> G[모듈 설계]
    
    F --> H{테스트 작성}
    G --> H
    
    H -->|Unit Test| I[단위 테스트]
    H -->|E2E Test| J[통합 테스트]
    
    I --> K[배포 준비]
    J --> K
    
    K --> L[프로덕션 배포]
    L --> M[모니터링 & 운영]
    

```

## 🔄 **시퀀스 다이어그램 - API 인증 플로우**

```mermaid
sequenceDiagram
    participant User as 👤 사용자
    participant Frontend as 🌐 프론트엔드
    participant Auth as 🔐 인증 서버
    participant API as 🛡️ API 서버
    participant DB as 🗄️ 데이터베이스

    User->>Frontend: 로그인 시도
    Frontend->>Auth: 인증 요청 (ID, PW)
    Auth->>DB: 사용자 정보 조회
    DB-->>Auth: 사용자 데이터 반환
    
    alt 인증 성공
        Auth-->>Frontend: JWT 토큰 발급
        Frontend-->>User: 로그인 완료
        
        User->>Frontend: API 요청
        Frontend->>API: JWT 토큰과 함께 요청
        API->>Auth: 토큰 검증
        Auth-->>API: 토큰 유효성 확인
        API->>DB: 데이터 조회
        DB-->>API: 요청된 데이터
        API-->>Frontend: 응답 데이터
        Frontend-->>User: 결과 표시
    else 인증 실패
        Auth-->>Frontend: 인증 오류
        Frontend-->>User: 오류 메시지 표시
    end
```

## 📈 **간트 차트 - 블로그 리뉴얼 프로젝트**

```mermaid
gantt
    title 실전코딩 블로그 리뉴얼 프로젝트
    dateFormat  YYYY-MM-DD
    
    section 기획 단계
    요구사항 분석     :done, planning, 2025-01-01, 2025-01-07
    UI/UX 설계       :done, design, 2025-01-05, 2025-01-14
    기술 스택 결정    :done, tech, 2025-01-10, 2025-01-12
    
    section 개발 단계
    환경 구축        :dev-env, 2025-01-15, 2025-01-17
    기본 레이아웃     :active, layout, 2025-01-18, 2025-01-25
    컴포넌트 개발     :components, 2025-01-26, 2025-02-10
    Mermaid 통합     :done, mermaid, 2025-01-20, 2025-01-22
    
    section 테스트 단계
    단위 테스트      :testing, 2025-02-11, 2025-02-18
    통합 테스트      :integration, 2025-02-19, 2025-02-25
    성능 최적화      :optimization, 2025-02-26, 2025-03-05
    
    section 배포 단계
    스테이징 배포     :staging, 2025-03-06, 2025-03-08
    프로덕션 배포     :production, 2025-03-09, 2025-03-10
    모니터링         :monitoring, 2025-03-11, 2025-03-20
```

## 🏗️ **클래스 다이어그램 - 블로그 시스템 설계**

```mermaid
classDiagram
    class BlogPost {
        +String title
        +String content
        +Date publishedAt
        +String[] tags
        +Category category
        +Author author
        +Boolean mermaid
        +publish()
        +draft()
        +addTag(tag)
        +setCategory(category)
    }
    
    class Author {
        +String name
        +String email
        +String bio
        +String avatar
        +Date joinedAt
        +write(post)
        +updateProfile()
    }
    
    class Category {
        +String name
        +String description
        +String color
        +Integer postCount
        +addPost(post)
        +removePost(post)
    }
    
    class Comment {
        +String content
        +Date createdAt
        +Author author
        +BlogPost post
        +Boolean approved
        +create()
        +approve()
        +delete()
    }
    
    class Tag {
        +String name
        +String color
        +Integer usageCount
        +increaseUsage()
        +decreaseUsage()
    }
    
    Author ||--o{ BlogPost : writes
    Category ||--o{ BlogPost : contains
    BlogPost ||--o{ Comment : has
    BlogPost }|--|| Tag : tagged_with
    Author ||--o{ Comment : writes
```

## 🌊 **상태 다이어그램 - 포스트 게시 워크플로우**

```mermaid
stateDiagram-v2
    [*] --> 초안작성
    
    초안작성 --> 내용검토 : 작성 완료
    내용검토 --> 초안작성 : 수정 필요
    내용검토 --> 메타데이터설정 : 내용 승인
    
    메타데이터설정 --> 미리보기 : 메타데이터 입력
    미리보기 --> 메타데이터설정 : 수정 요청
    미리보기 --> 최종검토 : 미리보기 확인
    
    최종검토 --> 게시대기 : 승인
    최종검토 --> 메타데이터설정 : 거절
    
    게시대기 --> 게시됨 : 자동 게시
    게시대기 --> 게시됨 : 수동 게시
    
    게시됨 --> 수정중 : 수정 요청
    수정중 --> 게시됨 : 수정 완료
    
    게시됨 --> 보관됨 : 보관
    보관됨 --> 게시됨 : 복원
    
    게시됨 --> [*] : 삭제
    보관됨 --> [*] : 영구 삭제
```

## 🔢 **파이 차트 - 블로그 포스트 카테고리 분포**

```mermaid
pie title 블로그 포스트 카테고리별 분포
    "프론트엔드" : 35
    "백엔드" : 28
    "DevOps" : 15
    "AI/ML" : 12
    "튜토리얼" : 10
```

## 🌐 **ER 다이어그램 - 블로그 데이터베이스 설계**

```mermaid
erDiagram
    AUTHOR ||--o{ POST : creates
    AUTHOR ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : receives
    POST }|--|| CATEGORY : belongs_to
    POST }|--o{ TAG : tagged_with
    POST ||--o{ VIEW : generates
    
    AUTHOR {
        int id PK
        string name
        string email UK
        string bio
        string avatar_url
        datetime created_at
        datetime updated_at
    }
    
    POST {
        int id PK
        string title
        text content
        text excerpt
        string slug UK
        boolean mermaid
        boolean published
        datetime published_at
        int author_id FK
        int category_id FK
        datetime created_at
        datetime updated_at
    }
    
    CATEGORY {
        int id PK
        string name UK
        string description
        string color
        string icon
        datetime created_at
    }
    
    TAG {
        int id PK
        string name UK
        string color
        int usage_count
        datetime created_at
    }
    
    COMMENT {
        int id PK
        text content
        boolean approved
        int author_id FK
        int post_id FK
        datetime created_at
        datetime updated_at
    }
    
    VIEW {
        int id PK
        string ip_address
        string user_agent
        int post_id FK
        datetime viewed_at
    }
```

---

## ✨ **스타일링 특징**

### 🎯 **적용된 커스터마이징**

1. **색상 체계**
   - Primary: `#667eea` → `#764ba2` 그라데이션
   - 사이트 CSS 변수와 완벽 연동
   - 라이트/다크 모드 자동 대응

2. **타이포그래피**
   - Inter 폰트 패밀리 사용 (사이트와 동일)
   - 적절한 폰트 크기와 가중치

3. **레이아웃**
   - 카드 스타일 배경과 그림자
   - 호버 효과 (약간의 리프트)
   - 반응형 패딩과 마진

4. **접근성**
   - 모션 감소 설정 대응
   - 인쇄 모드 최적화
   - 모바일 반응형 지원

### 🛠 **기술적 구현**

- **Mermaid 11** Base 테마 + 커스텀 변수
- **자동 다크모드** 감지 및 색상 조정
- **SVG 그라데이션** 동적 삽입
- **CSS 변수** 활용으로 사이트 테마와 동기화

이제 모든 Mermaid 다이어그램이 **실전코딩 블로그**의 세련된 톤앤매너와 완벽하게 조화를 이룹니다! 🎨✨ 