---
layout: post
title: "React Hooks 완벽 가이드: useState와 useEffect 마스터하기"
date: 2025-06-03 16:45:00 +0900
categories: [React, Frontend]
tags: [react, hooks, javascript, frontend, 상태관리]
author: "Kevin Park"
excerpt: "React Hooks의 핵심인 useState와 useEffect를 실무 관점에서 완벽하게 마스터해보겠습니다."
---

React Hooks는 React 16.8에서 도입된 혁신적인 기능으로, 함수형 컴포넌트에서도 상태와 생명주기를 다룰 수 있게 해줍니다. 오늘은 가장 기본이 되는 `useState`와 `useEffect`를 실무 관점에서 깊이 있게 다뤄보겠습니다.

## useState: 상태 관리의 기초

### 기본 사용법

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
      <button onClick={() => setCount(count - 1)}>
        감소
      </button>
    </div>
  );
}
```

### 객체 상태 관리

```javascript
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateName = (newName) => {
    setUser(prevUser => ({
      ...prevUser,
      name: newName
    }));
  };
  
  const updateEmail = (newEmail) => {
    setUser(prevUser => ({
      ...prevUser,
      email: newEmail
    }));
  };
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="이름"
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <input 
        type="email" 
        placeholder="이메일"
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
      />
      <p>사용자: {user.name} ({user.email})</p>
    </div>
  );
}
```

### 함수형 업데이트 패턴

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text,
        completed: false
      }
    ]);
  };
  
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.id !== id)
    );
  };
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <span 
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? '취소' : '완료'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
```

## useEffect: 사이드 이펙트 처리

### 기본 사용법

```javascript
import React, { useState, useEffect } from 'react';

function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 컴포넌트 마운트 시 사용자 데이터 로드
    fetchUserData()
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('사용자 데이터 로드 실패:', error);
        setLoading(false);
      });
  }, []); // 빈 의존성 배열 = 마운트 시에만 실행
  
  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>사용자 데이터를 불러올 수 없습니다.</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### 의존성 배열 활용

```javascript
function PostDetail({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    // postId가 변경될 때마다 새로운 포스트 데이터 로드
    if (postId) {
      Promise.all([
        fetchPost(postId),
        fetchComments(postId)
      ]).then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
      });
    }
  }, [postId]); // postId가 변경될 때마다 실행
  
  return (
    <div>
      {post && (
        <article>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </article>
      )}
      <section>
        <h3>댓글 ({comments.length})</h3>
        {comments.map(comment => (
          <div key={comment.id}>
            <strong>{comment.author}</strong>
            <p>{comment.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

### 정리(cleanup) 함수

```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new WebSocket(`ws://localhost:8080/chat/${roomId}`);
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };
    
    socket.onopen = () => {
      console.log('채팅방에 연결되었습니다');
    };
    
    socket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };
    
    // 정리 함수: 컴포넌트 언마운트 시 또는 roomId 변경 시 실행
    return () => {
      socket.close();
      console.log('채팅방 연결이 종료되었습니다');
    };
  }, [roomId]);
  
  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 실무 팁과 베스트 프랙티스

### 1. 커스텀 Hook으로 로직 분리

```javascript
// useLocalStorage 커스텀 Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('localStorage 읽기 오류:', error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage 저장 오류:', error);
    }
  };
  
  return [storedValue, setValue];
}

// 사용 예시
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'ko');
  
  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">라이트</option>
        <option value="dark">다크</option>
      </select>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
```

### 2. useCallback과 useMemo 최적화

```javascript
import React, { useState, useEffect, useCallback, useMemo } from 'react';

function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // API 호출 함수를 useCallback으로 메모이제이션
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`/api/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('상품 로드 실패:', error);
    }
  }, [category]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  // 필터링과 정렬된 상품 목록을 useMemo로 최적화
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
  }, [products, searchTerm, sortOrder]);
  
  return (
    <div>
      <input
        type="text"
        placeholder="상품 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">가격 낮은 순</option>
        <option value="desc">가격 높은 순</option>
      </select>
      
      <div className="product-grid">
        {filteredAndSortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 주의사항과 일반적인 실수

### 1. 무한 루프 방지

```javascript
// ❌ 잘못된 예시 - 무한 루프 발생
function BadExample() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1); // 의존성 배열 없음 = 매 렌더링마다 실행
  });
  
  return <div>{count}</div>;
}

// ✅ 올바른 예시
function GoodExample() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(prev => prev + 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []); // 빈 배열로 마운트 시에만 실행
  
  return <div>{count}</div>;
}
```

### 2. 이전 상태 기반 업데이트

```javascript
// ❌ 잘못된 예시 - 이전 상태에 의존
function BadCounter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
    setCount(count + 1); // 같은 값으로 두 번 설정됨
  };
  
  return <button onClick={increment}>증가</button>;
}

// ✅ 올바른 예시 - 함수형 업데이트 사용
function GoodCounter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // 정상적으로 2씩 증가
  };
  
  return <button onClick={increment}>증가</button>;
}
```

## 마무리

React Hooks는 함수형 컴포넌트의 가능성을 크게 확장시켜준 혁신적인 기능입니다. `useState`와 `useEffect`만 잘 활용해도 대부분의 상태 관리와 사이드 이펙트 처리가 가능합니다.

핵심은 **의존성 배열을 정확히 관리**하고, **함수형 업데이트 패턴**을 적절히 활용하는 것입니다. 그리고 복잡한 로직은 커스텀 Hook으로 분리해서 재사용 가능하게 만드는 것이 좋습니다.

다음 포스트에서는 `useContext`, `useReducer` 등 더 고급 Hooks에 대해 다뤄보겠습니다!

---

**관련 포스트:**
- [React 성능 최적화 가이드](./react-performance-optimization)
- [커스텀 Hook 패턴 모음](./custom-hook-patterns)
