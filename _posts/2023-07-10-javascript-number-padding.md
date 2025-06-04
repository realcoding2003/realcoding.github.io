---
layout: post
title: "JavaScript 숫자 앞에 0 붙이기 - padStart()와 커스텀 함수 완벽 가이드"
date: 2023-07-10 10:00:00 +0900
categories: [Development, Tips]
tags: [javascript, string-manipulation, formatting, utility, beginner]
author: "Kevin Park"
excerpt: "JavaScript에서 숫자 앞에 0을 붙이는 모든 방법! padStart() 메서드부터 커스텀 함수까지 바로 사용 가능한 코드와 실무 예시를 제공합니다."
---

# JavaScript 숫자 앞에 0 붙이기 - 완벽 가이드

## 🎯 핵심 해결책 (바로 사용 가능)

### 가장 많이 사용되는 패턴

```javascript
// 1. 최신 방법 - padStart() 사용 (ES2017+)
const number = 5;
const paddedNumber = number.toString().padStart(2, '0');
console.log(paddedNumber); // "05"

// 2. 함수형으로 재사용
function pad(num, size = 2) {
    return num.toString().padStart(size, '0');
}

pad(1);   // "01"
pad(9);   // "09" 
pad(10);  // "10"
pad(5, 3); // "005"
```

```javascript
// 3. 레거시 환경용 커스텀 함수
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

pad(1);  // "01"
pad(9);  // "09"
pad(10); // "10"
```

```javascript
// 4. 다양한 자릿수 지원하는 범용 함수
function zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

zeroPad(5, 2);   // "05"
zeroPad(123, 5); // "00123"
```

---

## 📚 상세 설명

### 배경 및 필요성

숫자 앞에 0을 붙이는 것은 다음과 같은 상황에서 자주 필요합니다:

- **시간 표시**: 09:05, 01:30
- **날짜 형식**: 2023-07-01
- **파일 정렬**: file001.txt, file002.txt
- **고정 자릿수 표시**: 상품코드, ID 등

### 방법별 상세 분석

#### 1. padStart() 메서드 (권장)

```javascript
// 기본 사용법
const num = 7;
const result = num.toString().padStart(3, '0');
console.log(result); // "007"

// 다양한 패딩 문자
const text = "5";
console.log(text.padStart(4, '0'));  // "0005"
console.log(text.padStart(4, '*'));  // "***5"
console.log(text.padStart(4));       // "   5" (기본값: 공백)
```

**장점:**
- ES2017 표준 메서드
- 다양한 패딩 문자 지원
- 가독성이 좋음

**단점:**
- 구형 브라우저 미지원 (IE 등)

#### 2. 커스텀 함수 (호환성)

```javascript
// 간단한 2자리 패딩
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

// 확장된 버전
function pad(num, size = 2, char = '0') {
    let s = num.toString();
    while (s.length < size) {
        s = char + s;
    }
    return s;
}

// 사용 예시
console.log(pad(5));     // "05"
console.log(pad(42, 4)); // "0042"
console.log(pad(3, 3, '*')); // "**3"
```

#### 3. Array와 join 활용

```javascript
function zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

// 또는 더 간단하게
function pad(num, size) {
    return Array(size).join('0').slice((size || 2) * -1) + num;
}
```

### 실제 활용 사례

#### 시간 포맷팅

```javascript
function formatTime(hours, minutes, seconds) {
    const pad = (num) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

console.log(formatTime(9, 5, 30)); // "09:05:30"
console.log(formatTime(14, 0, 7)); // "14:00:07"
```

#### 날짜 포맷팅

```javascript
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const today = new Date();
console.log(formatDate(today)); // "2023-07-10"
```

#### 순서 번호 생성

```javascript
function generateSequence(start, end, digits = 3) {
    const sequence = [];
    for (let i = start; i <= end; i++) {
        sequence.push(i.toString().padStart(digits, '0'));
    }
    return sequence;
}

console.log(generateSequence(1, 5, 3));
// ["001", "002", "003", "004", "005"]
```

### 성능 비교

```javascript
// 성능 테스트 (1,000,000회 실행)
const numbers = Array.from({length: 1000000}, (_, i) => i);

console.time('padStart');
numbers.forEach(n => n.toString().padStart(2, '0'));
console.timeEnd('padStart'); // 약 150ms

console.time('custom function');
numbers.forEach(n => (n < 10) ? '0' + n : n.toString());
console.timeEnd('custom function'); // 약 100ms
```

**결론**: 커스텀 함수가 약간 더 빠르지만, 실제 사용에서는 차이가 미미함

### 에러 처리

```javascript
function safePad(value, length = 2, char = '0') {
    // 입력값 검증
    if (value === null || value === undefined) {
        return char.repeat(length);
    }
    
    // 숫자가 아닌 경우 처리
    if (isNaN(value)) {
        return value.toString().padStart(length, char);
    }
    
    return value.toString().padStart(length, char);
}

console.log(safePad(null));      // "00"
console.log(safePad(undefined)); // "00"
console.log(safePad("abc"));     // "0abc"
```

### 브라우저 호환성 대안

```javascript
// padStart가 지원되지 않는 환경에서의 폴리필
if (!String.prototype.padStart) {
    String.prototype.padStart = function(targetLength, padString) {
        targetLength = Math.floor(targetLength) || 0;
        if (targetLength < this.length) return this;
        
        padString = String(padString || ' ');
        let pad = '';
        let len = targetLength - this.length;
        
        while (pad.length < len) {
            pad += padString;
        }
        
        return pad.slice(0, len) + this;
    };
}
```

## 결론

JavaScript에서 숫자 앞에 0을 붙이는 방법은 여러 가지가 있습니다:

1. **최신 환경**: `padStart()` 메서드 사용 (가장 권장)
2. **레거시 환경**: 커스텀 함수로 간단 구현
3. **고성능 필요**: 조건문 기반 커스텀 함수

실무에서는 브라우저 지원 범위를 확인한 후 `padStart()`를 우선 사용하고, 필요시 폴리필이나 커스텀 함수로 대체하는 것이 좋습니다.

### 다음 단계

- [JavaScript 문자열 조작 완벽 가이드](링크)
- [날짜 포맷팅 라이브러리 비교](링크)
- [JavaScript 성능 최적화 팁](링크)