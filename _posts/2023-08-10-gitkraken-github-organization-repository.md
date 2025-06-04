---
layout: post
title: "GitKraken에서 Github 조직 계정 레파지토리 연동 완벽 가이드"
date: 2023-08-10 14:30:00 +0900
categories: [Tips, Development]
tags: [gitkraken, github, organization, repository, oauth, git-tools]
author: "Kevin Park"
excerpt: "GitKraken에서 조직 계정의 private 레파지토리가 안 보이는 문제를 OAuth 권한 설정으로 해결하는 방법"
---

# GitKraken에서 Github 조직 계정 레파지토리 연동 완벽 가이드

## 🎯 Summary

### 핵심 해결책
**문제**: GitKraken에서 Github 조직 계정의 레파지토리가 보이지 않음
**해결**: OAuth 앱 권한 설정을 통한 조직 접근 권한 부여

### 즉시 해결 방법
```
1. GitHub 로그인 → 우측 상단 프로필 아이콘 클릭
2. Settings → Applications 메뉴 선택
3. Authorized OAuth Apps → GitKraken 선택
4. Organization access → Grant 버튼 클릭
5. GitKraken 재시작 → 레파지토리 목록 확인
```

### 가장 많이 사용되는 시나리오
- **개인 계정 + 조직 계정 혼용**: 프로젝트별 조직으로 코드 관리
- **마이크로서비스 아키텍처**: 서비스별 레파지토리 분리 관리
- **팀 프로젝트**: 회사/프로젝트별 조직 계정 활용

---

## 📚 상세 설명

### 배경 및 필요성

GitHub의 무료 정책 변경으로 조직 계정의 Private 레파지토리도 무료로 사용할 수 있게 되면서, 많은 개발자들이 프로젝트나 회사별로 조직 계정을 만들어 소스 코드를 관리하고 있습니다. 

특히 마이크로서비스 아키텍처에서는 서비스별로 레파지토리를 분리하여 관리하는 것이 개발 효율성과 단위 테스트, 그리고 공동 작업에 매우 유리합니다.

### 문제 상황

GitKraken, SourceTree 등의 Git GUI 도구를 사용할 때 개인 레파지토리는 정상적으로 보이지만, 조직 계정의 레파지토리가 목록에 나타나지 않는 경우가 발생합니다.

이는 **OAuth 앱의 조직 접근 권한이 기본적으로 제한되어 있기 때문**입니다.

### 단계별 해결 방법

#### 1단계: GitHub 설정 페이지 접근
```
GitHub.com 로그인 → 우측 상단 프로필 아이콘 → Settings
```

#### 2단계: Applications 메뉴 진입
```
좌측 사이드바: Applications → Authorized OAuth Apps
```

#### 3단계: GitKraken 앱 선택 및 권한 설정
```
OAuth Apps 목록에서 GitKraken 선택
→ Organization access 섹션 확인
→ 원하는 조직의 Grant 버튼 클릭
```

#### 4단계: 권한 승인 및 확인
- Grant 버튼 클릭 시 해당 조직의 레파지토리 접근 권한이 부여됩니다
- GitKraken을 재시작하여 변경사항을 적용합니다
- Clone 메뉴에서 조직 레파지토리가 목록에 표시되는지 확인합니다

### 실제 활용 사례

#### 프로젝트별 조직 관리
```markdown
개인 계정: kevin-park
조직 계정들:
- company-a-projects (A회사 프로젝트)
- gnuboard-skins (그누보드 스킨 모음)
- microservice-platform (마이크로서비스 플랫폼)
```

#### 팀 협업 시나리오
1. **조직 생성**: 프로젝트나 회사별로 GitHub 조직 계정 생성
2. **레파지토리 분리**: 기능별, 서비스별로 레파지토리 분리
3. **권한 관리**: 팀원별 접근 권한 세분화
4. **도구 연동**: GitKraken 등 GUI 도구에서 OAuth 권한 설정

### 주의사항 및 팁

#### 권한 관리 best practices
- **최소 권한 원칙**: 필요한 조직에만 권한 부여
- **정기적 권한 검토**: 불필요한 OAuth 앱 권한 정리
- **팀원 교육**: 새로운 팀원에게 설정 방법 공유

#### 문제 해결 방법
```markdown
문제: Grant 버튼이 비활성화된 경우
해결: 조직 관리자에게 OAuth 앱 정책 확인 요청

문제: 권한 설정 후에도 레파지토리가 안 보이는 경우
해결: GitKraken 완전 재시작 또는 계정 재연결
```

## 결론

GitHub 조직 계정과 GitKraken의 연동은 OAuth 앱 권한 설정을 통해 간단히 해결할 수 있습니다. 개인 설정에서 `Applications → Authorized OAuth Apps → GitKraken → Grant` 순서로 진행하면 조직의 모든 레파지토리에 접근할 수 있습니다.

마이크로서비스 아키텍처나 팀 프로젝트에서 조직별 코드 관리는 개발 효율성을 크게 향상시킬 수 있으므로, 이러한 설정 방법을 숙지해두시면 개발 워크플로우가 한층 더 매끄러워질 것입니다.

### 다음 단계 제안
- 조직 계정 보안 정책 설정 방법 학습
- GitKraken의 고급 브랜치 관리 기능 활용
- GitHub Actions를 통한 CI/CD 파이프라인 구축