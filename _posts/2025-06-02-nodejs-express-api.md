---
layout: post
title: "Node.js Express로 RESTful API 서버 구축하기"
date: 2025-06-02 10:20:00 +0900
categories: [Backend, Node.js]
tags: [nodejs, express, api, backend, rest]
author: "Kevin Park"
excerpt: "Express.js를 사용하여 확장 가능하고 효율적인 RESTful API 서버를 구축하는 방법을 실무 관점에서 알아보겠습니다."
---

오늘은 Node.js와 Express.js를 사용해서 RESTful API 서버를 구축하는 방법에 대해 알아보겠습니다. 단순한 예제가 아닌 실무에서 바로 사용할 수 있는 구조와 패턴을 중심으로 설명하겠습니다.

## 프로젝트 구조 설계

먼저 확장 가능한 프로젝트 구조를 만들어보겠습니다:

```
project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── app.js
├── tests/
├── package.json
└── server.js
```

## 초기 설정

### package.json 생성

```bash
npm init -y
npm install express mongoose cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install -D nodemon jest supertest
```

### 기본 서버 설정

```javascript
// server.js
const app = require('./src/app');
const { PORT } = require('./src/config/config');

const server = app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
});

// 예외 처리
process.on('unhandledRejection', (err, promise) => {
  console.log(`오류: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
```

## Express 애플리케이션 구성

```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// 환경 변수 로드
require('dotenv').config();

// 데이터베이스 연결
connectDB();

const app = express();

// 보안 미들웨어
app.use(helmet());
app.use(cors());

// 로깅
app.use(morgan('combined'));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 라우트
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// 404 처리
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 리소스를 찾을 수 없습니다'
  });
});

// 에러 핸들러
app.use(errorHandler);

module.exports = app;
```

## 실무 팁과 베스트 프랙티스

### 1. 구조화된 응답 형식

```javascript
// 성공 응답
{
  "success": true,
  "data": {...},
  "pagination": {...}
}

// 에러 응답
{
  "success": false,
  "error": "에러 메시지"
}
```

### 2. 미들웨어 체이닝

```javascript
// 인증 → 권한 확인 → 유효성 검사 → 컨트롤러
router.post('/posts', 
  protect,
  authorize('admin', 'user'),
  validatePost,
  createPost
);
```

### 3. 환경별 설정 관리

```javascript
// src/config/config.js
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d'
};
```

## 성능 최적화

### 1. 데이터베이스 인덱싱

```javascript
// 검색 성능 향상을 위한 텍스트 인덱스
postSchema.index({ title: 'text', content: 'text' });

// 복합 인덱스로 자주 사용되는 쿼리 최적화
postSchema.index({ author: 1, createdAt: -1 });
```

### 2. 페이지네이션

```javascript
const page = parseInt(req.query.page, 10) || 1;
const limit = parseInt(req.query.limit, 10) || 10;
const skip = (page - 1) * limit;

const posts = await Post.find(query)
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });
```

## 보안 고려사항

### 1. 입력 검증

```javascript
const { body, validationResult } = require('express-validator');

const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('제목은 1-100자 사이여야 합니다'),
  body('content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('내용을 입력해주세요'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg
      });
    }
    next();
  }
];
```

### 2. 레이트 리미팅

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10분
  max: 100, // 최대 100회 요청
  message: {
    success: false,
    error: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.'
  }
});

app.use('/api/', limiter);
```

## 테스트 자동화

```javascript
// tests/posts.test.js
describe('Posts API', () => {
  let authToken;
  
  beforeEach(async () => {
    // 테스트용 사용자 로그인
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    authToken = loginRes.body.data.token;
  });
  
  describe('GET /api/posts', () => {
    it('should return posts with pagination', async () => {
      const res = await request(app)
        .get('/api/posts?page=1&limit=5')
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.pagination).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
  
  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const postData = {
        title: '테스트 포스트',
        content: '테스트 내용입니다.',
        category: 'tech'
      };
      
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${authToken}`)
        .send(postData)
        .expect(201);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(postData.title);
    });
  });
});
```

## 로깅과 모니터링

```javascript
// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-server' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

## Docker 컨테이너화

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

# 의존성 먼저 복사 (캐시 최적화)
COPY package*.json ./
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 비 root 사용자 생성
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 5000

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/blog
    depends_on:
      - mongo
    
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

## CI/CD 파이프라인

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
      env:
        MONGODB_URI: mongodb://localhost:27017/test
        JWT_SECRET: test-secret
    
    - name: Run security audit
      run: npm audit --audit-level moderate
```

## 마무리

이렇게 구축한 Express API 서버는 다음과 같은 특징을 가집니다:

- **확장 가능한 구조**: MVC 패턴과 모듈화
- **보안**: JWT 인증, 입력 검증, 레이트 리미팅
- **성능**: 페이지네이션, 인덱싱, 효율적인 쿼리
- **테스트**: 자동화된 테스트 스위트
- **모니터링**: 구조화된 로깅과 에러 추적
- **배포**: Docker 컨테이너화와 CI/CD

실무에서는 추가로 캐싱(Redis), 메시지 큐(Bull), 파일 업로드(Multer), API 문서화(Swagger) 등을 고려해야 합니다.

다음 포스트에서는 이런 고급 주제들과 마이크로서비스 아키텍처에 대해 다뤄보겠습니다!

---

**관련 포스트:**
- [Express.js 성능 최적화 팁](./express-performance-tips)
- [Node.js 보안 가이드](./nodejs-security-guide)
- [API 문서화와 테스트 자동화](./api-documentation-testing)
