---
layout: post
title: "GitHub Pages로 기술 블로그 시작하기"
date: 2025-06-04 14:30:00 +0900
categories: [블로그, GitHub]
tags: [github-pages, jekyll, 블로그, 시작]
author: "Kevin Park"
excerpt: "GitHub Pages와 Jekyll을 사용해서 나만의 기술 블로그를 만드는 방법을 단계별로 알아보겠습니다."
---

안녕하세요! 오늘은 GitHub Pages를 이용해서 기술 블로그를 시작하는 방법에 대해 알아보겠습니다. 

개발자라면 한 번쯤은 자신만의 기술 블로그를 운영해보고 싶다는 생각을 해보셨을 텐데요, GitHub Pages는 무료로 정적 웹사이트를 호스팅할 수 있는 훌륭한 서비스입니다.

## 왜 GitHub Pages인가?

GitHub Pages를 선택한 이유는 다음과 같습니다:

### 1. 완전 무료
- 도메인 비용 없이 `username.github.io` 도메인 제공
- 호스팅 비용 완전 무료
- SSL 인증서 자동 제공

### 2. 개발자 친화적
- Git을 통한 버전 관리
- Markdown으로 포스트 작성
- 코드 문법 강조 기본 지원

### 3. 커스터마이징 자유도
- Jekyll을 통한 테마 커스터마이징
- HTML, CSS, JavaScript 직접 수정 가능
- 플러그인을 통한 기능 확장

## 설정 과정

### 1단계: 저장소 생성

GitHub에서 새 저장소를 만들 때 이름을 `username.github.io` 형식으로 설정합니다.

```bash
# 예시
realcoding.github.io
```

### 2단계: Jekyll 설정

`_config.yml` 파일을 생성하고 기본 설정을 추가합니다:

```yaml
title: Real Coding Blog
description: 실무에서 배운 개발 노하우와 기술적 인사이트
url: "https://realcoding.github.io"
baseurl: ""

# Author information
author:
  name: Kevin Park
  email: kevin@realcoding.blog

# Build settings
markdown: kramdown
highlighter: rouge
permalink: /:year/:month/:day/:title/

# Plugins
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

### 3단계: 첫 포스트 작성

`_posts` 디렉토리에 `YYYY-MM-DD-제목.md` 형식으로 파일을 생성합니다:

```markdown
---
layout: post
title: "첫 번째 포스트"
date: 2025-06-04 14:30:00 +0900
categories: [블로그]
tags: [시작, github-pages]
---

안녕하세요! 첫 번째 포스트입니다.

## 소제목

여기에 내용을 작성합니다.

```javascript
console.log("Hello, Blog!");
```
```

## 유용한 팁들

### 1. 로컬 개발 환경 구축

```bash
# Ruby 설치 후
gem install bundler jekyll

# 새 Jekyll 사이트 생성
jekyll new my-blog
cd my-blog

# 로컬 서버 실행
bundle exec jekyll serve
```

### 2. 커스텀 도메인 설정

GitHub Pages에서는 커스텀 도메인도 쉽게 설정할 수 있습니다:

1. 저장소에 `CNAME` 파일 생성
2. 원하는 도메인 입력 (예: `blog.example.com`)
3. DNS 설정에서 CNAME 레코드 추가

### 3. SEO 최적화

```yaml
# _config.yml에 추가
plugins:
  - jekyll-seo-tag

# 각 포스트에 메타데이터 추가
---
title: "포스트 제목"
description: "포스트에 대한 간단한 설명"
image: /assets/images/post-thumbnail.jpg
---
```

## 마무리

GitHub Pages로 블로그를 시작하는 것은 생각보다 간단합니다. 무료이면서도 강력한 기능들을 제공하기 때문에 개발자에게는 최적의 선택이라고 할 수 있습니다.

다음 포스트에서는 Jekyll 테마 커스터마이징과 고급 기능들에 대해 알아보겠습니다.

혹시 궁금한 점이 있으시면 댓글로 남겨주세요! 😊

---

**참고 자료:**
- [GitHub Pages 공식 문서](https://docs.github.com/pages)
- [Jekyll 공식 사이트](https://jekyllrb.com/)
- [Markdown 가이드](https://www.markdownguide.org/)
