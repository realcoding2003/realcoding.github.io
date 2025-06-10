---
layout: post
title: "AI 개발 현실 체크: 블로그 자동화로 깨달은 것들"
date: 2025-06-10 08:30:00 +0900
categories: [Development, DevDiary]
tags: [AI개발, 깃헙페이지, 자동화, 개발경험, 신입개발자]
author: "Kevin Park"
lang: ko
excerpt: "며칠간 깃헙 페이지 블로그를 AI로 만들면서 깨달은 현실적인 이야기. AI 개발의 명과 암"
image: "/assets/images/posts/ai-dev-reality-diary/hero.png"
---

# AI 개발 현실 체크: 블로그 자동화로 깨달은 것들

![AI Development Reality](/assets/images/posts/ai-dev-reality-diary/hero.png)
*AI 개발의 현실적인 모습: 편리함과 복잡함의 공존*

## 📝 오늘의 문제

며칠동안 깃헙 페이지로 블로그 만들고 자동화하는 AI 프롬프트 작업에 완전히 빠져있었다. 

AI가 코드를 척척 생성해주니까 "와, 이거 진짜 쉽네!"라고 생각했는데, 막상 실제로 돌려보면 여기저기 안 되는 부분들이 속출했다.

## 💡 해결 과정

### AI의 장점: 빠른 프로토타이핑

```yaml
# Jekyll 설정을 AI가 1분만에 생성
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

collections:
  posts:
    output: true
    permalink: /:year/:month/:day/:title/
```

**좋았던 점**: 기본 구조나 템플릿은 정말 빠르게 만들어줌

### AI의 한계: 세부 디버깅

```bash
# 실제로는 이런 에러들이 계속 발생
Error: Liquid syntax error: Unknown tag 'mermaid'
Error: Github Pages build failed
```

**문제점**: AI가 생성한 코드가 실제 환경에서 작동하지 않을 때, 어디가 잘못되었는지 찾아내는 건 결국 개발자 몫

## 🎯 깨달은 점

### 1. AI + 기존 지식의 필수 조합

- AI는 코드를 생성해주지만, **올바른 방향으로 가이드**하는 건 개발자의 역할
- 생성된 결과물을 **검증하고 수정**할 수 있는 기존 지식이 필수

### 2. 신입 개발자의 새로운 딜레마

```javascript
// 예전 신입의 목표
const juniorGoal = "Hello World부터 차근차근";

// 현재 신입의 현실
const currentReality = "AI로 이정도는 기본이죠?";
```

**역설적 상황**: 

- 학습은 더 쉬워졌지만, 기대치는 5-6년차 수준으로 상승
- AI 도구 활용 능력까지 추가로 요구됨

### 3. AI 개발의 핵심 스킬

- **프롬프트 엔지니어링**: AI에게 정확한 요구사항 전달
- **결과물 검증**: 생성된 코드의 문제점 파악
- **점진적 개선**: AI와 함께 반복적으로 완성도 높이기

## 📈 결론

AI 개발은 **도구의 혁신**이지 **개발 지식의 대체**가 아니다.

오히려 기존 개발 지식이 있어야 AI를 제대로 활용할 수 있고, AI가 틀렸을 때 "이건 아니야"라고 판단할 수 있다.

**새로운 개발자의 필수 역량**:

- 전통적 개발 지식 (기본기)
- AI 도구 활용 능력 (새로운 기본기)
- 두 영역을 연결하는 통찰력

참 아이러니하지만, 이게 현실이다. AI 시대의 개발자는 더 많이 알아야 한다.