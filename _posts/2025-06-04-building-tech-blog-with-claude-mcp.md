---
layout: post
title: "Claude Desktop + MCP로 기술 블로그 완전 구축하기: AI 페어 프로그래밍의 현실"
date: 2025-06-04 14:30:00 +0900
categories: [AI, 개발, 블로그, MCP]
tags: [Claude, MCP, Jekyll, GitHub Pages, AI, 페어프로그래밍, 기술블로그, 개발자도구, Claude Desktop]
author: Kevin Park
excerpt: "수년간 미뤄왔던 기술 블로그를 Claude Desktop + MCP 서버와 함께 하루 만에 완성했습니다. MD 포맷의 번거로움, 설정의 복잡함, 유지보수의 부담... 모든 걸림돌이 AI 페어 프로그래밍으로 해결된 실제 경험을 공유합니다."
---

# Claude Desktop + MCP로 기술 블로그 완전 구축하기: AI 페어 프로그래밍의 현실

## 🤔 솔직한 고백: 수년간 미뤄온 기술 블로그

사실 **기술 블로그를 만들어야겠다**는 생각은 몇 년 전부터 계속 있었습니다. 개발하면서 겪은 문제들, 해결한 방법들, 새로 배운 기술들... 정리해두면 나중에도 유용하고 다른 개발자들에게도 도움이 될 거라는 생각이었죠.

### 😅 그런데 왜 계속 미뤘을까?

**1. 마크다운 포맷의 번거로움**
```markdown
# 제목은 어떻게 쓰지?
## 소제목은 몇 개의 # 을 써야 하나?
- 목록은 - 인가 * 인가?
1. 번호 목록은 또 어떻게...
[링크](url)는 어떤 형식이었지?
```
매번 마크다운 문법을 찾아보는 것도 번거롭고, 일관성 있게 작성하는 것도 쉽지 않았습니다.

**2. 초기 설정의 복잡함**
```bash
# Jekyll 설치? Ruby 버전 관리?
gem install jekyll bundler
bundle init
# 테마는 뭘 쓸까? 
# _config.yml 설정은 또 어떻게?
# CSS 커스터마이징은?
```
블로그 하나 만들려고 하는데 설정해야 할 게 산더미. 정작 글 쓰기도 전에 지쳐버리는 경우가 많았습니다.

**3. 지속적인 업데이트와 유지보수**
```
- 댓글 시스템 추가해야지
- Google Analytics 연동도 해야 하고
- SEO 최적화도...
- 디자인이 마음에 안 드네
- 반응형은 되나?
```
한 번 만들어도 끝이 아니라 계속 손봐야 할 게 너무 많았습니다.

**4. 완벽주의의 함정**
```
"일단 기본적인 포스트 몇 개는 써놓고 시작해야지"
"디자인이 좀 더 예뻤으면..."
"기능이 좀 부족한 것 같은데..."
```
결국 **"나중에 제대로 해야지"**라며 무한 연기 모드 돌입.

## 🚀 Claude Desktop + MCP의 등장: 게임 체인저

그런데 2024년 말부터 **Claude Desktop + MCP 서버**라는 놀라운 조합을 접하게 되었습니다.

### 🎯 "이번엔 다를 것 같은데?"

기존의 AI 도구들과는 확실히 달랐습니다:

```
기존 AI 도구들:
"코드 좀 짜줘" → 복사 붙여넣기 → 수정 → 또 물어보기

Claude Desktop + MCP:
"이런 걸 만들고 싶어" → 실제 파일 생성 → 즉시 적용 → 실시간 개선 → 자동 배포
```

단순히 코드 조각을 제공하는 게 아니라, **실제 프로젝트를 함께 만들어가는 파트너**가 된 느낌이었습니다.

### 💡 "그래, 오늘 해보자!"

2025년 6월 4일 아침, 드디어 결심했습니다.

> **"오늘 하루 동안 Claude Desktop + MCP와 함께 기술 블로그를 완전히 만들어보자!"**

그리고 정말로... **하루 만에 완성했습니다**. 😱

- **Jekyll 설정부터 배포까지**
- **5개의 기술 포스트 작성**
- **Google Analytics, AdSense 연동**
- **개인정보처리방침 페이지**
- **완전한 반응형 디자인**
- **다크/라이트 모드 지원**
- **자동화된 포스팅 워크플로우**

그것도 제가 직접 하나하나 찾아보고 설정한 게 아니라, Claude Desktop + MCP와 **자연스러운 대화**를 통해서 말입니다.

---

> **TL;DR**: Claude Desktop + MCP 서버를 활용해서 Jekyll 기반 기술 블로그를 완전히 구축했습니다. 마크다운의 번거로움, 설정의 복잡함, 유지보수의 부담... 모든 걸림돌이 AI 페어 프로그래밍으로 해결된 실제 경험을 상세히 공유합니다.

## 🛠️ Claude Desktop + MCP 환경 구축

### 1. Claude Desktop 설치 및 설정

```bash
# Claude Desktop 다운로드 및 설치
# https://claude.ai/download에서 macOS/Windows 버전 다운로드

# 설치 후 로그인
# Anthropic 계정으로 로그인 필요
```

### 2. MCP 서버 로컬 구축

**프로젝트 초기화**:
```bash
mkdir blog-mcp-server
cd blog-mcp-server
npm init -y
npm install @anthropic-ai/mcp-sdk
```

**MCP 서버 구현 (mcp-server.js)**:
```javascript
import { Server } from '@anthropic-ai/mcp-sdk/server/index.js';
import { StdioServerTransport } from '@anthropic-ai/mcp-sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@anthropic-ai/mcp-sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

const server = new Server({
  name: 'blog-automation-server',
  version: '1.0.0',
});

// 블로그 자동화 도구들 등록
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'create_blog_post',
        description: '새 블로그 포스트를 생성합니다',
        inputSchema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            categories: { type: 'array', items: { type: 'string' } },
            tags: { type: 'array', items: { type: 'string' } }
          }
        }
      },
      {
        name: 'auto_deploy',
        description: 'Git commit 및 GitHub Pages 배포',
        inputSchema: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    ]
  };
});
```

**Claude Desktop 연결 설정 (~/.claude/config.json)**:
```json
{
  "mcp": {
    "servers": {
      "blog-automation": {
        "command": "node",
        "args": ["/Users/kevinpark/blog-mcp-server/mcp-server.js"],
        "env": {
          "BLOG_PATH": "/Users/kevinpark/Documents/projects/realcoding.github.io"
        }
      }
    }
  }
}
```

## 🎯 Claude Project 구성

### 1. 전용 프로젝트 생성

Claude Desktop에서 **"실전코딩 기술블로그"** 프로젝트를 생성했습니다.

**프로젝트 설정**:
```yaml
Name: 실전코딩 기술블로그 개발
Description: Jekyll 기반 기술 블로그 개발 및 콘텐츠 관리 전문 AI
Purpose: 블로그 포스팅, 사이트 개선, 자동화 구현
```

### 2. 커스텀 지침(Instructions) 설정

```markdown
# 🔧 실전코딩 기술블로그 AI 어시스턴트

## 핵심 역할
- Jekyll 기반 기술 블로그 풀스택 개발
- 전문적인 기술 콘텐츠 작성
- UI/UX 개선 및 성능 최적화
- 자동화 워크플로우 구축

## 블로그 정보
- **사이트**: 실전코딩 기술 블로그 (realcoding.blog)
- **저자**: Kevin Park (kevinpark@okyc.kr)  
- **GitHub**: realcoding2003
- **컨셉**: 실무 개발 경험과 기술 인사이트 공유

## 작업 모드
### Plan Mode (기본)
- 요구사항 분석 및 전략 수립
- 파일 구조 탐색 및 현황 파악  
- 해결 방안 제시 (신뢰도 95% 이상)

### Act Mode (실행)
- 실제 파일 생성/수정
- MCP를 통한 자동 배포
- 실시간 결과 확인

## 포스팅 가이드라인
### 구조
1. **문제 상황** - 구체적인 이슈 설명
2. **해결 과정** - 단계별 해결 방법
3. **코드 예시** - 실행 가능한 코드
4. **결과 및 검증** - 해결 결과 확인
5. **추가 팁** - 관련 노하우 공유

### 스타일
- 제목: SEO 친화적이고 구체적
- 톤: 전문적이지만 친근하게
- 코드: 주석과 설명 포함
- 이미지: 설명 중심의 스크린샷

## 기술 환경
- **Framework**: Jekyll + GitHub Pages
- **Styling**: CSS3 + JavaScript ES6+
- **Templating**: Liquid
- **Syntax Highlighting**: Prism.js
- **Analytics**: Google Analytics + AdSense

## 품질 기준
- ✅ 반응형 디자인 (모바일 우선)
- ✅ 웹 접근성 (WCAG 2.1 AA)
- ✅ SEO 최적화 (메타태그, 구조화 데이터)
- ✅ 성능 최적화 (Core Web Vitals)
- ✅ 브라우저 호환성 (ES6+ 지원 브라우저)

## 자동화 워크플로우
1. **콘텐츠 생성**: 아티팩트로 초안 작성
2. **로컬 생성**: MCP로 .md 파일 생성
3. **자동 배포**: Git commit + push 자동화
4. **결과 확인**: GitHub Pages 빌드 상태 체크
```

### 3. 지식베이스 구성

프로젝트에 다음 파일들을 업로드했습니다:

**핵심 설정 파일들**:
- `_config.yml` - Jekyll 설정
- `assets/css/main.css` - 현재 스타일시트
- `_layouts/default.html` - 기본 레이아웃
- `package.json` - 프로젝트 의존성

**참고 문서들**:
- Jekyll 공식 문서 (PDF)
- GitHub Pages 배포 가이드
- Liquid 템플릿 문법 가이드
- 기존 포스트 샘플 (작성 스타일 참고)

## 🎨 프롬프트 기반 스킨 커스터마이징

### 1. 스킨 수정 워크플로우

**단계별 접근법**:
```
사용자: "헤더 디자인을 더 모던하게 바꿔줘"
     ↓
AI: Plan Mode로 현재 스타일 분석
     ↓  
AI: 개선 방안 제시 (컬러, 타이포그래피, 레이아웃)
     ↓
사용자: "Act" 명령
     ↓
AI: CSS 수정 + 실시간 적용
```

**실제 대화 예시**:
```
👤 사용자: 현재 블로그 헤더가 너무 밋밋해 보여. 좀 더 프로페셔널하고 
         모던한 느낌으로 바꿔줄 수 있어?

🤖 Claude: 현재 헤더 스타일을 분석해보겠습니다.

[Plan Mode 분석 결과]
- 현재: 단순한 텍스트 로고 + 기본 네비게이션
- 문제점: 시각적 임팩트 부족, 브랜딩 요소 부재
- 개선 방안:
  1. 그라데이션 배경 + 글래스모피즘 효과
  2. 로고 타이포그래피 강화
  3. 네비게이션 호버 애니메이션
  4. 다크모드 지원 강화

신뢰도: 98%

👤 사용자: 좋아! Act

🤖 Claude: 헤더 스타일을 업데이트하겠습니다.
```

### 2. 스타일 컴포넌트 시스템

**CSS 변수 활용**:
```css
:root {
  /* 컬러 시스템 */
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  
  /* 타이포그래피 */
  --heading-font: 'Inter', -apple-system, sans-serif;
  --mono-font: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* 스페이싱 */
  --header-height: 80px;
  --container-width: 1200px;
}

/* 모던 헤더 */
.site-header {
  background: var(--primary-gradient);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.site-logo {
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: 1.5rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}
```

## 🚀 자동화된 블로그 포스팅 시스템

### 1. 아티팩트 기반 콘텐츠 생성

**프롬프트 예시**:
```
👤 사용자: "Docker Compose로 개발 환경 구축하기"라는 주제로 
         실무 경험을 바탕으로 한 기술 포스트를 작성해줘

🤖 Claude: Docker Compose 개발 환경 구축에 대한 포스트를 작성하겠습니다.

[아티팩트 생성]
- 제목: "Docker Compose로 효율적인 개발 환경 구축하기: 실무 적용 가이드"
- 카테고리: [Docker, DevOps, 개발환경]
- 태그: [docker-compose, containerization, development, workflow]
- 내용: 7000자 분량의 상세한 가이드
- 코드 예시: 12개의 실행 가능한 예제
```

**생성된 아티팩트 구조**:
```markdown
---
layout: post
title: "Docker Compose로 효율적인 개발 환경 구축하기: 실무 적용 가이드"
date: 2025-06-04 15:30:00 +0900
categories: [Docker, DevOps, 개발환경]
tags: [docker-compose, containerization, development, workflow]
author: Kevin Park
excerpt: "Docker Compose를 활용한 개발 환경 구축의 A-Z를 실무 경험을 바탕으로 정리했습니다."
---

# Docker Compose로 효율적인 개발 환경 구축하기

## 🤔 왜 Docker Compose인가?

개발할 때 이런 경험 있으신가요?

"내 컴퓨터에서는 잘 되는데?" 
"MySQL 버전이 달라서 안 돼요"
"Node.js 버전을 다운그레이드해야 하나요?"

... [상세 내용]
```

### 2. Act 명령으로 자동 배포

**자동화 명령어**:
```
👤 사용자: Act - 위 포스트를 블로그에 발행해줘

🤖 Claude: 포스트를 블로그에 발행하겠습니다.

[MCP 도구 실행]
1. ✅ create_blog_post 실행
   - 파일명: 2025-06-04-docker-compose-dev-environment.md
   - 경로: _posts/
   - 내용: 아티팩트 내용 적용

2. ✅ Git 자동 배포 실행
   - git add _posts/2025-06-04-docker-compose-dev-environment.md
   - git commit -m "feat: Docker Compose 개발 환경 구축 가이드 포스트 추가"
   - git push origin main

3. ✅ GitHub Pages 빌드 확인
   - 빌드 상태: 성공
   - 배포 시간: 약 2분
   - 접근 URL: https://realcoding.blog/docker/devops/2025/06/04/docker-compose-dev-environment/

완료! 새 포스트가 성공적으로 발행되었습니다. 🎉
```

### 3. 지능형 메타데이터 생성

**자동 생성되는 요소들**:
```yaml
# SEO 최적화
title: "Docker Compose로 효율적인 개발 환경 구축하기: 실무 적용 가이드"
description: "Docker Compose를 활용해서 팀 개발 환경을 통일하고 배포를 자동화하는 실무 가이드"
keywords: [docker, compose, 개발환경, devops, 컨테이너]

# 자동 카테고리 분류
categories: [Docker, DevOps, 개발환경]
tags: [docker-compose, containerization, development, workflow, automation]

# 메타 정보
reading_time: "15분"
word_count: 7234
code_examples: 12
difficulty: "중급"

# 소셜 미디어
og_title: "Docker Compose 개발 환경 구축 완전 가이드"
og_description: "실무에서 바로 적용할 수 있는 Docker Compose 활용법"
og_image: "/assets/images/docker-compose-guide-thumbnail.png"
```

## 💡 실제 사용 사례들

### 사례 1: 긴급 기술 이슈 포스팅

**상황**: 새벽에 발생한 Redis 메모리 이슈 해결

```
👤 사용자: 방금 Redis 메모리 부족으로 서비스 장애가 났어. 
         해결 과정을 정리해서 포스트로 만들어줘

🤖 Claude: 긴급 기술 이슈 해결 포스트를 작성하겠습니다.

[5분 후]
✅ "Redis 메모리 부족 장애 대응기: 새벽 3시의 서버 응급실" 포스트 완료
✅ 실시간 모니터링 설정 가이드 포함  
✅ 예방 조치 및 알람 설정 방법 추가
✅ 자동 배포 완료

👤 사용자: 완벽해! 이제 팀원들한테 공유할 수 있겠다.
```

### 사례 2: 시리즈 포스트 기획

```
👤 사용자: "실무 Git 워크플로우" 시리즈를 5편으로 기획하고 싶어

🤖 Claude: Git 워크플로우 시리즈를 기획하겠습니다.

[기획안]
1편: "Git Flow vs GitHub Flow: 팀에 맞는 전략 선택하기"
2편: "코드 리뷰 문화 구축하기: PR 템플릿부터 자동화까지" 
3편: "Git Hooks로 품질 관리 자동화하기"
4편: "대용량 파일과 바이너리 관리: Git LFS 실전 가이드"
5편: "Git 트러블슈팅: 자주 만나는 문제들과 해결법"

각 편당 예상 분량: 5000-7000자
발행 주기: 주 1회 (매주 화요일)
첫 발행일: 2025년 6월 10일

👤 사용자: 좋아! 1편부터 차례로 작성해줘

🤖 Claude: 1편을 작성하겠습니다...
```

## 🎯 프로젝트 설정의 핵심 가치

### 1. 일관성 있는 품질

**Before (프로젝트 설정 전)**:
- 매번 다른 스타일의 포스트
- 누락되는 메타데이터
- 불규칙한 카테고리 체계

**After (프로젝트 설정 후)**:
- 통일된 포스팅 포맷
- 완전한 SEO 최적화
- 체계적인 정보 구조

### 2. 작업 속도 혁신

```
기존 포스팅 프로세스:
아이디어 → 초안 작성 → 마크다운 변환 → 이미지 처리 → 
메타데이터 작성 → 파일 생성 → Git 커밋 → 배포 확인
(소요시간: 2-3시간)

AI 자동화 프로세스:  
아이디어 → "Act" 명령 → 완료
(소요시간: 5-10분)
```

### 3. 창의성 집중

이제 **"어떻게 쓸까?"** 대신 **"무엇을 쓸까?"**에 집중할 수 있습니다:

- 마크다운 문법 고민 ❌
- 메타데이터 설정 ❌  
- 파일명 규칙 ❌
- Git 명령어 ❌

대신:
- 독자에게 도움이 될 내용 ✅
- 실무 경험 공유 ✅
- 기술적 인사이트 ✅
- 커뮤니티 기여 ✅

## 🚧 한계점과 개선 방향

### 현재 한계점

1. **이미지 자동화 부족**: 스크린샷, 다이어그램 자동 생성 미지원
2. **SEO 분석 부족**: 키워드 경쟁도, 검색량 분석 기능 없음  
3. **성능 모니터링**: 페이지 로딩 속도, Core Web Vitals 자동 체크 부족

### 개선 계획

**Phase 1: 이미지 자동화**
```javascript
// 계획 중인 기능
const imageAutomation = {
  screenshots: "Puppeteer 기반 자동 스크린샷",
  diagrams: "Mermaid, PlantUML 자동 생성",
  thumbnails: "AI 기반 썸네일 자동 생성"
};
```

**Phase 2: SEO 인텔리전스**
```javascript
const seoFeatures = {
  keywordResearch: "Google Keyword Planner API 연동",
  competitorAnalysis: "상위 랭킹 포스트 분석",
  contentOptimization: "읽기 쉬운 정도, 키워드 밀도 최적화"
};
```

**Phase 3: Analytics 자동화**
```javascript
const analyticsAutomation = {
  performanceMonitoring: "Lighthouse CI 연동",
  userEngagement: "Google Analytics 자동 리포트",
  contentPerformance: "인기 포스트 기반 추천 주제"
};
```

## 🎉 결론: AI 시대의 블로깅

Claude Desktop + MCP를 활용한 기술 블로그 구축은 단순한 **도구 사용법**을 넘어선 **패러다임의 전환**입니다.

### 핵심 인사이트

1. **AI는 창작의 파트너**: 단순 자동화가 아닌 창의적 협업
2. **진입장벽의 완전 제거**: 기술적 복잡성 없이 바로 시작
3. **품질의 상향평준화**: 전문가 수준의 결과물을 누구나
4. **지속가능한 콘텐츠 생산**: 번아웃 없는 꾸준한 포스팅

### 개발자들에게 보내는 메시지

```markdown
💡 더 이상 "나중에 블로그 해야지"라고 미루지 마세요.
   Claude Desktop + MCP가 있다면 오늘 당장 시작할 수 있습니다.

🚀 중요한 건 기술이 아니라 여러분의 경험과 인사이트입니다.
   AI가 기술적 부분을 담당하니, 창의성에 집중하세요.

🎯 미래의 개발자는 "코딩하는 사람"이 아니라
   "문제를 정의하고 해결하는 사람"이 될 것입니다.

📝 여러분의 개발 여정을 기록하고 공유하세요.
   그 경험들이 누군가에게는 큰 도움이 될 것입니다.
```

수년간 **"언젠가는..."** 하며 미뤄왔던 기술 블로그.
이제는 **"오늘 당장!"** 시작할 수 있습니다. 🚀

Claude Desktop + MCP와 함께라면, 여러분의 개발 경험과 지식이 가치 있는 콘텐츠로 쉽게 변화할 것입니다.

---

## 📖 참고 자료

- **Claude Desktop**: [Official Download](https://claude.ai/download)
- **MCP SDK**: [Anthropic MCP Documentation](https://docs.anthropic.com/claude/docs/mcp)
- **Jekyll 가이드**: [Jekyll Official Docs](https://jekyllrb.com/docs/)
- **GitHub Pages**: [Pages Documentation](https://pages.github.com/)
- **프로젝트 코드**: [GitHub Repository](https://github.com/realcoding2003/realcoding.github.io)

---

**💬 질문이나 경험을 공유해주세요!**

Claude Desktop + MCP로 개발하신 경험이나 궁금한 점이 있으시면 언제든 댓글로 남겨주세요. 함께 AI 시대의 개발 문화를 만들어가요! 🤝

**📧 연락처**: kevinpark@okyc.kr  
**🐙 GitHub**: [realcoding2003](https://github.com/realcoding2003)  
**💼 LinkedIn**: [realcoding](https://linkedin.com/in/realcoding)