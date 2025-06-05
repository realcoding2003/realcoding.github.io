---
layout: post
title: "기존 MCP로 새로운 MCP 쉽게 설치하기 - Playwright MCP 설치 실전 가이드"
date: 2025-06-05 14:30:00 +0900
categories: [Tips, Development]
tags: [mcp, playwright, automation, installation, filesystem, desktop-commander, beginner]
author: "Kevin Park"
excerpt: "이미 설치된 filesystem, desktop-commander MCP를 활용해 새로운 MCP를 Claude가 직접 자동 설치하는 실전 방법을 알아보세요."
---

# 기존 MCP로 새로운 MCP 쉽게 설치하기 - Playwright MCP 설치 실전 가이드

## 🎯 Summary

**이미 설치된 filesystem, desktop-commander 등의 MCP를 활용하면 새로운 MCP 서버를 수동 설치 없이 Claude가 직접 설치해줍니다.**

### 핵심 설치 명령어

```
Claude에게 요청:
"playwright MCP 서버를 설치하고 설정 파일에 추가해줘"
```

### 자동화되는 과정
- **설정 파일 자동 수정**: filesystem MCP로 claude_desktop_config.json 편집
- **의존성 자동 설치**: desktop-commander로 NPX 명령어 실행
- **설정 검증**: 파일 내용 확인 및 문법 검사
- **재시작 안내**: Claude Desktop 재시작 가이드

### 한 번에 여러 MCP 설치하기
```
"GitHub, Google Drive, Playwright MCP를 모두 설치하고 설정해줘"
```

---

## 📚 상세 설명

### 기존 MCP 활용하는 이유

기존에 filesystem, desktop-commander 같은 MCP가 설치되어 있다면, Claude가 직접:
- 파일 시스템에 접근해서 설정 파일 수정
- 터미널 명령어 실행으로 패키지 설치
- 설정 검증 및 문제 해결

이 모든 과정을 자동화할 수 있습니다.

### 실제 설치 과정

#### 1단계: Claude에게 설치 요청

```
"playwright-mcp를 설치해줘. 설정 파일도 자동으로 수정해줘"
```

Claude가 자동으로 수행하는 작업:
1. 현재 claude_desktop_config.json 파일 읽기
2. playwright MCP 설정 추가
3. NPX로 의존성 확인
4. 설정 파일 저장

#### 2단계: 자동 설정 파일 수정

Claude가 filesystem MCP를 사용해서 다음과 같이 수정:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Documents"]
    },
    "desktop-commander": {
      "command": "npx", 
      "args": ["-y", "@executeautomation/desktop-commander-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

#### 3단계: 의존성 설치 확인

Claude가 desktop-commander를 통해 실행:
```bash
npx @playwright/mcp@latest --help
```

### 추천 MCP 서버 목록

Claude에게 한 번에 요청할 수 있는 유용한 MCP들:

```
"다음 MCP들을 모두 설치해줘:
- GitHub MCP (코드 저장소 관리)
- Google Drive MCP (파일 동기화)
- Slack MCP (메시지 관리)
- Brave Search MCP (웹 검색)
- Playwright MCP (브라우저 자동화)"
```

### 설치 검증 방법

#### 자동 검증 요청
```
"설치한 MCP들이 제대로 동작하는지 확인해줘"
```

Claude가 수행하는 검증:
1. 설정 파일 JSON 문법 검사
2. 각 MCP 서버 실행 테스트
3. 필요한 의존성 설치 확인
4. 권한 설정 검사

#### 수동 검증 방법
1. Claude Desktop 완전 재시작
2. 새 채팅에서 "Allow for This Chat" 클릭
3. 간단한 테스트 요청: "현재 디렉토리의 파일 목록을 보여줘"

### 실용적인 활용 팁

#### 1. 프로젝트별 MCP 설정

```
"현재 프로젝트에 맞는 MCP들을 추천하고 설치해줘"
```

웹 개발 프로젝트:
- Playwright (브라우저 테스트)
- GitHub (코드 관리)
- Filesystem (파일 작업)

데이터 분석 프로젝트:
- Filesystem (데이터 파일 접근)
- Google Drive (데이터 동기화)
- Desktop Commander (스크립트 실행)

#### 2. 배치 설치 스크립트

```
"다음 설정으로 MCP 환경을 구성해줘:
1. 개발용 MCP: GitHub, Filesystem, Playwright
2. 업무용 MCP: Slack, Google Drive, Calendar
3. 유틸리티 MCP: Desktop Commander, Brave Search"
```

#### 3. 설정 백업 및 복원

```
"현재 MCP 설정을 백업해줘"
"백업된 MCP 설정을 새 컴퓨터에 적용해줘"
```

### 문제 해결 가이드

#### 일반적인 문제들

**1. NPX 캐시 문제**
```
"NPX 캐시를 정리하고 MCP를 다시 설치해줘"
```

**2. 권한 문제**
```
"MCP 설정 파일의 권한을 확인하고 수정해줘"
```

**3. 포트 충돌**
```
"사용 중인 포트를 확인하고 MCP 포트를 변경해줘"
```

#### 고급 문제 해결

**설정 파일 복구**
```
"MCP 설정 파일이 손상됐어. 백업에서 복구해줘"
```

**선택적 MCP 비활성화**
```
"Playwright MCP만 일시적으로 비활성화해줘"
```

### 성능 최적화 팁

#### 1. 필요한 MCP만 활성화
```json
{
  "mcpServers": {
    // 자주 사용하는 것만 유지
    "filesystem": { ... },
    "playwright": { ... }
    // 사용하지 않는 MCP는 주석 처리
    // "heavy-mcp": { ... }
  }
}
```

#### 2. 리소스 사용량 모니터링
```
"현재 실행 중인 MCP 서버들의 리소스 사용량을 확인해줘"
```

## 결론

기존 MCP 도구들을 활용하면 새로운 MCP 설치가 매우 간단해집니다. Claude가 파일 시스템 접근부터 의존성 설치까지 모든 과정을 자동화해주므로, 개발자는 복잡한 설치 과정 대신 실제 기능 활용에 집중할 수 있습니다.

**핵심 팁**: "설치해줘"라고 간단히 요청하면, Claude가 알아서 최적의 방법으로 설치하고 설정까지 완료해줍니다.

**다음 단계**: 설치한 MCP들을 활용한 워크플로우 자동화를 구축해보세요.
