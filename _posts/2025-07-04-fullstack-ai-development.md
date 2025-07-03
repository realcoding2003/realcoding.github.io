---
layout: post
title: "혼자서도 전체 프로젝트 개발이 가능해? CDK + Lambda + Cursor로 200% AI 활용기"
date: 2025-07-04 00:02:00 +0900
categories: [Development, AI]
tags: [CDK, Lambda, Cursor, AI개발, 모노레포, 풀스택, 개발생산성]
author: "Kevin Park"
lang: ko
excerpt: "람다 함수별로 레파지토리 만들던 과거를 벗어나 CDK + Lambda + Cursor로 혼자서도 전체 프로젝트 개발이 가능해진 경험담"
image: "/assets/images/posts/fullstack-ai-development/hero.png"
---

# 혼자서도 전체 프로젝트 개발이 가능해? CDK + Lambda + Cursor로 200% AI 활용기

![Hero Image](/assets/images/posts/fullstack-ai-development/hero.png)
*모노레포 구조로 인프라부터 프론트엔드까지 한 번에 관리하는 개발 환경*

## 🤦‍♂️ 예전엔 이런 식으로 개발했었다

**문제**: 람다 함수 하나마다 레파지토리 하나씩 만들어서 관리
- 프로젝트 10개 있으면 레파지토리 10개
- 공통 코드 복사붙여넣기 지옥
- 배포할 때마다 레파지토리 10개씩 돌아다니기

**현재**: CDK + Lambda + Cursor로 모든 걸 하나의 프로젝트에서 관리
- IaC 코드, 서버코드, 프론트코드, 데모페이지까지 한 곳에
- AI가 전체 컨텍스트를 이해하고 개발 도와줌
- 혼자서도 전체 프로젝트 개발 가능

```javascript
// 이제 이런 식으로 한 프로젝트에서 모든 걸 관리
project/
├── infrastructure/     # CDK 코드
├── lambda-functions/   # 서버 로직
├── frontend/          # 프론트엔드
├── demo-pages/        # 데모 페이지
└── docs/              # 룰북과 가이드
```

## 🚀 개발 속도와 유지보수가 동시에 올라가는 마법

### 개발 속도 200% 향상
**AI 컨텍스트 공유의 힘**
- Cursor가 전체 프로젝트 구조를 이해
- 인프라 코드 보고 서버 코드 자동 생성
- 서버 API 보고 프론트 연동 코드 자동 생성
- 일관된 패턴으로 새로운 기능 빠르게 추가

**실제 경험**: 새로운 API 하나 추가할 때
1. CDK에서 람다 함수 정의 (30초)
2. Cursor가 기존 패턴 보고 서버 코드 생성 (1분)
3. 프론트엔드 연동 코드도 자동 생성 (1분)
4. 배포 스크립트도 기존 패턴 그대로 (30초)

**총 3분**으로 끝. 예전엔 최소 30분은 걸렸었는데.

### 유지보수성 대폭 개선
**코드 일관성 확보**
```typescript
// 모든 람다 함수가 같은 패턴을 사용
export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    // 공통 미들웨어 적용
    const result = await processRequest(event);
    return successResponse(result);
  } catch (error) {
    return errorResponse(error);
  }
};
```

**버전 관리의 단순화**
- 하나의 레파지토리에서 모든 변경사항 추적
- 기능별 브랜치 대신 컴포넌트별 폴더 구조
- 배포도 한 번에 전체 또는 선택적으로 가능

## 💡 하지만 이런 어려움도 있었다

### 가장 큰 도전: 룰북 관리
**방대한 소스코드의 함정**
- AI가 프로젝트 전체를 이해하기엔 너무 복잡
- 과거의 시행착오를 AI가 반복하는 문제
- 일관성 없는 코드 패턴이 AI를 혼란스럽게 함

**해결책: 체계적인 룰북 작성**
```markdown
# 프로젝트 룰북 (docs/rulebook.md)

## 1. 람다 함수 작성 규칙
- 모든 함수는 common/middleware.ts 사용
- 에러 처리는 standardError 클래스 활용
- 환경변수는 config/environment.ts에서 관리

## 2. CDK 인프라 패턴
- 람다 함수는 constructs/lambda-construct.ts 사용
- API Gateway 경로는 kebab-case로 통일
- 모든 리소스에 프로젝트 태그 필수

## 3. 금지 사항
- 직접 AWS SDK 호출 금지 (wrapper 함수 사용)
- 하드코딩된 ARN 금지 (CDK 참조 사용)
- console.log 대신 structured logging 사용
```

이 룰북을 Cursor에게 잘 인식시켜놓으면 AI가 일관된 패턴으로 개발해줌.

## 🎯 이제 혼자서도 전체 프로젝트가 가능해

### MSA 설계 + 모노레포 관리의 장점
**설계는 분리, 관리는 통합**

| 구분 | 예전 방식 | 현재 방식 |
|------|-----------|-----------|
| 레파지토리 | 함수별 분리 | 프로젝트 통합 |
| 배포 | 개별 배포 | 선택적 일괄 배포 |
| 코드 재사용 | 복사붙여넣기 | 공통 모듈 |
| AI 활용도 | 제한적 | 전체 컨텍스트 |
| 개발 속도 | 느림 | 빠름 |

### 실제 프로젝트 구조
```
my-fullstack-project/
├── cdk/
│   ├── lib/
│   │   ├── api-stack.ts      # API Gateway + Lambda
│   │   ├── frontend-stack.ts  # S3 + CloudFront
│   │   └── database-stack.ts  # DynamoDB
│   └── bin/app.ts
├── lambdas/
│   ├── user-service/
│   ├── auth-service/
│   └── common/               # 공통 유틸리티
├── frontend/
│   ├── src/
│   └── dist/
├── demo/
│   └── landing-page/
└── docs/
    ├── rulebook.md           # AI를 위한 룰북
    └── architecture.md
```

## 🔧 Cursor와 함께하는 개발 워크플로우

### 새로운 기능 추가 과정
1. **요구사항 정의** (1분)
   - "사용자 프로필 조회 API 만들어줘"

2. **Cursor가 자동 생성** (2분)
   - CDK 스택에 람다 함수 추가
   - 람다 함수 구현 (룰북 기반)
   - 프론트엔드 연동 코드 생성

3. **배포 및 테스트** (2분)
   - `npm run deploy`
   - 데모 페이지에서 바로 테스트

**총 5분**으로 끝. 이게 바로 AI 200% 활용의 힘이지.

### 토큰 소비 최적화 팁
**Ultra 버전 쓰면서 배운 것들**
- 룰북을 잘 만들어두면 AI가 헤매지 않음
- 컨텍스트 창에 관련 파일만 포함
- 자주 사용하는 패턴은 스니펫으로 등록

```typescript
// 자주 쓰는 람다 함수 템플릿을 스니펫으로 등록
const lambdaTemplate = `
export const handler = async (event: APIGatewayProxyEvent) => {
  // 룰북 기반 표준 패턴
};
`;
```

## 💡 결론: 혼자서도 풀스택 개발이 현실이 됐다

**장점 정리**
- 개발 속도 200% 향상
- 유지보수성 대폭 개선
- AI 컨텍스트 공유로 일관된 코드 품질
- 혼자서도 전체 프로젝트 개발 가능

**주의사항**
- 룰북 관리가 핵심
- 초기 구조 설계에 시간 투자 필요
- 토큰 소비 고려 (Ultra 버전 권장)

이런 방식으로 개발하니까 정말 생산성이 다르더라고요. 혹시 비슷한 경험 있으신 분들은 어떤 방식으로 관리하시는지 궁금하네요! 

더 좋은 팁 있으시면 댓글로 공유해주세요 🙏