# Real Coding Blog

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://realcoding.github.io)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red)](https://jekyllrb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

실무에서 배운 개발 노하우와 기술적 인사이트를 공유하는 기술 블로그입니다.

## 🌟 주요 기능

- **반응형 디자인** - 모든 기기에서 최적화된 경험
- **다크모드 지원** - 사용자 환경에 맞는 테마 선택
- **빠른 검색** - 포스트와 태그를 빠르게 찾기
- **코드 하이라이팅** - 예쁜 문법 강조와 복사 기능
- **댓글 시스템** - Utterances를 통한 GitHub 기반 댓글
- **SEO 최적화** - 검색 엔진 친화적인 구조

## 🛠 기술 스택

- **Jekyll** - 정적 사이트 생성기
- **GitHub Pages** - 무료 호스팅
- **HTML5/CSS3** - 모던 웹 표준
- **JavaScript (ES6+)** - 인터랙티브 기능
- **Prism.js** - 코드 문법 강조
- **Font Awesome** - 아이콘

## 🚀 로컬 개발 환경 설정

### 1. 저장소 클론
```bash
git clone https://github.com/realcoding/realcoding.github.io.git
cd realcoding.github.io
```

### 2. Ruby와 Jekyll 설치
```bash
# macOS (Homebrew 사용)
brew install ruby
gem install bundler jekyll

# Ubuntu
sudo apt-get install ruby-full build-essential zlib1g-dev
gem install bundler jekyll
```

### 3. 의존성 설치
```bash
bundle install
```

### 4. 로컬 서버 실행
```bash
bundle exec jekyll serve
```

브라우저에서 `http://localhost:4000`으로 접속하여 블로그를 확인할 수 있습니다.

## 📝 포스트 작성하기

### 새 포스트 생성
`_posts` 디렉토리에 `YYYY-MM-DD-제목.md` 형식으로 파일을 생성합니다.

### Front Matter 작성
```markdown
---
layout: post
title: "포스트 제목"
date: 2025-06-04 14:30:00 +0900
categories: [카테고리1, 카테고리2]
tags: [태그1, 태그2, 태그3]
author: "Kevin Park"
excerpt: "포스트에 대한 간단한 설명입니다."
---

여기에 포스트 내용을 작성합니다.
```

## 🎨 커스터마이징

### 색상 테마 변경
`assets/css/main.css`에서 CSS 변수를 수정합니다:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
}
```

### 소셜 링크 설정
`_config.yml`에서 사용자 정보를 설정합니다:

```yaml
github_username: your-username
linkedin_username: your-linkedin
```

## 🚀 배포하기

### GitHub Pages 자동 배포
1. GitHub에 코드를 푸시합니다
2. 저장소 Settings → Pages로 이동
3. Source를 "Deploy from a branch"로 설정
4. Branch를 "main"으로 선택
5. 몇 분 후 `https://username.github.io`에서 사이트 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🙋‍♂️ 문의하기

- **이메일**: kevin@realcoding.blog
- **GitHub**: [@realcoding](https://github.com/realcoding)

---

⭐ 이 블로그가 도움이 되셨다면 별표를 눌러주세요!
