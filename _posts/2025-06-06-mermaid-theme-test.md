---
layout: post
title: "Mermaid 다크모드/라이트모드 자동 대응 테스트"
date: 2025-06-06 00:00:00 +0900
categories: [Test, Theme]
tags: [mermaid, dark-mode, light-mode, responsive-design]
author: "Kevin Park"
excerpt: "투명 배경과 자동 테마 대응으로 개선된 Mermaid 다이어그램을 테스트합니다. 사용자의 테마 설정에 따라 실시간으로 색상이 변경됩니다."
mermaid: true
---

# Mermaid 테마 자동 대응 테스트

이 포스트는 **투명 배경**과 **다크모드/라이트모드 자동 대응**이 적용된 Mermaid 다이어그램을 테스트합니다. 

## 🌓 **개선된 기능**

- ✅ **투명 배경**: 사이트 배경과 자연스럽게 조화
- ✅ **실시간 테마 감지**: 시스템/사이트 테마 변경 즉시 반영
- ✅ **적응형 색상**: 라이트/다크 모드별 최적화된 색상 팔레트
- ✅ **접근성**: 모든 모드에서 충분한 대비율 보장

---

## 📊 **플로우차트 - 라이트/다크 모드 자동 대응**

```mermaid
graph TD
    A[사용자 방문] --> B{시스템 테마 감지}
    B -->|라이트 모드| C[라이트 색상 적용]
    B -->|다크 모드| D[다크 색상 적용]
    
    C --> E[보라-핑크 그라데이션]
    D --> F[밝은 보라 그라데이션]
    
    E --> G{테마 변경?}
    F --> G
    
    G -->|예| H[실시간 색상 업데이트]
    G -->|아니오| I[현재 테마 유지]
    
    H --> J[새로운 색상 적용]
    I --> K[사용자 계속 사용]
    J --> K
    
    K --> L[최적의 사용자 경험]
```

## 🔄 **시퀀스 다이어그램 - 테마 변경 프로세스**

```mermaid
sequenceDiagram
    participant User as 👤 사용자
    participant Browser as 🌐 브라우저
    participant System as 🖥️ 시스템
    participant Mermaid as 🎨 Mermaid
    participant CSS as 💅 CSS

    User->>System: 다크모드 토글
    System->>Browser: prefers-color-scheme 변경
    Browser->>Mermaid: 테마 변경 이벤트
    
    activate Mermaid
    Mermaid->>Mermaid: detectDarkMode() 실행
    Mermaid->>Mermaid: getThemeVariables() 호출
    Mermaid->>CSS: 새로운 색상 변수 적용
    CSS->>Browser: 다이어그램 리렌더링
    deactivate Mermaid
    
    Browser-->>User: 업데이트된 테마 표시
    
    Note over User,CSS: 실시간 테마 변경 완료!
```

## 📈 **간트 차트 - 테마 시스템 개발 일정**

```mermaid
gantt
    title Mermaid 테마 시스템 개발
    dateFormat  YYYY-MM-DD
    
    section 기획
    요구사항 정의      :done, req, 2025-01-01, 1d
    색상 팔레트 설계   :done, palette, 2025-01-02, 1d
    
    section 개발
    기본 테마 구현     :done, basic, 2025-01-03, 2d
    다크모드 대응      :done, dark, 2025-01-05, 2d
    실시간 변경 기능   :done, realtime, 2025-01-07, 1d
    
    section 테스트
    브라우저 테스트    :active, browser, 2025-01-08, 2d
    접근성 검증        :access, 2025-01-10, 1d
    
    section 배포
    프로덕션 배포      :deploy, 2025-01-11, 1d
```

## 🏗️ **클래스 다이어그램 - 테마 시스템 구조**

```mermaid
classDiagram
    class ThemeDetector
    ThemeDetector : +Boolean isDarkMode
    ThemeDetector : +detectDarkMode()
    ThemeDetector : +handleThemeChange()
    ThemeDetector : +addEventListener()
    ThemeDetector : +MediaQueryList mediaQuery
    ThemeDetector : +MutationObserver observer
    
    class ThemeVariables
    ThemeVariables : +Object lightTheme
    ThemeVariables : +Object darkTheme
    ThemeVariables : +getThemeVariables(isDark)
    ThemeVariables : +updateColors()
    ThemeVariables : +String primaryColor
    ThemeVariables : +String secondaryColor
    ThemeVariables : +String textColor
    
    class MermaidRenderer
    MermaidRenderer : +initialize(themeVars)
    MermaidRenderer : +rerender()
    MermaidRenderer : +addGradients()
    MermaidRenderer : +updateElements()
    MermaidRenderer : +Array diagrams
    MermaidRenderer : +Object config
    
    class GradientManager
    GradientManager : +createGradient()
    GradientManager : +updateGradient()
    GradientManager : +removeGradient()
    GradientManager : +applyToSVG()
    
    ThemeDetector --> ThemeVariables
    ThemeVariables --> MermaidRenderer
    MermaidRenderer --> GradientManager
```

## 🔢 **파이 차트 - 색상 사용률 분석**

```mermaid
pie title 테마별 색상 사용률
    "Primary (보라계열)" : 40
    "Secondary (핑크계열)" : 25
    "Accent (노랑계열)" : 15
    "Success (초록계열)" : 10
    "기타 색상" : 10
```

## 🌊 **상태 다이어그램 - 테마 상태 관리**

```mermaid
stateDiagram-v2
    [*] --> 초기화
    
    초기화 --> 테마감지 : 시작
    테마감지 --> 라이트모드 : 라이트 감지
    테마감지 --> 다크모드 : 다크 감지
    
    라이트모드 --> 색상적용_라이트 : 색상 설정
    다크모드 --> 색상적용_다크 : 색상 설정
    
    색상적용_라이트 --> 렌더링완료 : 적용 완료
    색상적용_다크 --> 렌더링완료 : 적용 완료
    
    렌더링완료 --> 대기중 : 사용자 활동 대기
    
    대기중 --> 테마변경감지 : 테마 변경 이벤트
    테마변경감지 --> 라이트모드 : 라이트로 전환
    테마변경감지 --> 다크모드 : 다크로 전환
    
    note right of 테마변경감지
        실시간 감지:
        - prefers-color-scheme
        - data-theme 속성
        - CSS 클래스 변경
    end note
```

---

## 🎨 **색상 체계 비교**

### 라이트 모드 🌅
- **Primary**: `#667eea` → `#764ba2`
- **Text**: `#2d3748` (진한 회색)
- **Border**: `rgba(102, 126, 234, 0.3)` (연한 보라)
- **Shadow**: `rgba(102, 126, 234, 0.1)` (부드러운 그림자)

### 다크 모드 🌙
- **Primary**: `#8b7cf8` → `#a78bfa` 
- **Text**: `#f7fafc` (밝은 회색)
- **Border**: `rgba(139, 124, 248, 0.3)` (연한 보라)
- **Shadow**: `rgba(139, 124, 248, 0.1)` (부드러운 그림자)

## ✨ **기술적 특징**

### 🔄 **실시간 테마 감지**
```javascript
// 다중 방식 테마 감지
const detectDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches || 
         document.documentElement.getAttribute('data-theme') === 'dark' ||
         document.body.classList.contains('dark');
};
```

### 🎯 **투명 배경 처리**
```javascript
const baseVariables = {
  background: 'transparent',
  mainBkg: 'transparent',
  // 반투명 배경으로 자연스러운 통합
  secondaryBkg: 'rgba(102, 126, 234, 0.1)',
};
```

### 🌈 **동적 그라데이션**
- SVG 그라데이션이 테마 변경 시 자동 업데이트
- 라이트모드: `#667eea` → `#764ba2`
- 다크모드: `#8b7cf8` → `#a78bfa`

이제 시스템 다크모드를 토글해보세요! 모든 다이어그램이 **실시간으로 테마에 맞춰 변경**됩니다. 🌓✨ 