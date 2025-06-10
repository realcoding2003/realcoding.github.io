---
layout: post
title: "그누보드 훅(Hook) 사용법과 이벤트 종류 완벽 정리"
date: 2023-07-20 10:00:00 +0900
categories: [Development, Tutorial]
tags: [gnuboard, php, hooks, korean-cms, web-development]
author: "Kevin Park"
lang: ko
excerpt: "그누보드 bbs 폴더 수정 없이 코드 삽입하는 훅 기능 사용법과 모든 이벤트 종류를 정리했습니다. extend 폴더 활용부터 실제 구현까지"
---

# 그누보드 훅(Hook) 사용법과 이벤트 종류 완벽 정리

## 🎯 Summary

그누보드 훅은 **bbs 폴더를 직접 수정하지 않고** 중간에 코드를 삽입할 수 있는 기능입니다. extend 폴더에 PHP 파일을 생성하여 원하는 시점에 함수를 실행할 수 있습니다.

### 기본 사용법 (바로 사용 가능)

```php
<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// 이벤트 등록
add_event('write_update_after', 'my_custom_function', G5_HOOK_DEFAULT_PRIORITY, 4);

// 실행될 함수
function my_custom_function($board, $wr_id, $w, $qstr, $redirect_url)
{
    global $g5;
    
    // 게시글 작성/수정 후 실행될 코드
    // 예: 로그 기록, 알림 발송 등
    
    // 로그 예시
    $log_data = "게시판: {$board['bo_table']}, 글번호: {$wr_id}, 작업: {$w}";
    write_log($log_data, 'board_activity');
}
?>
```

### 주요 이벤트 예시

```php
// 1. 회원 로그인 후 처리
add_event('member_login_check', 'after_login_process');

// 2. 게시글 작성 전 검증
add_event('write_update_before', 'validate_content');

// 3. 관리자 설정 변경 후 처리
add_event('admin_config_form_update', 'config_changed_notify');
```

---

## 📚 상세 설명

### 그누보드 훅의 작동 원리

그누보드 훅 시스템은 이벤트 기반으로 작동합니다. 그누보드 코어에서 특정 시점마다 `run_event()` 함수를 호출하여 등록된 훅 함수들을 순차적으로 실행합니다.

```php
// 그누보드 코어 내부 (bbs 폴더)
run_event('event_name', $params);
```

이때 `extend` 폴더에 등록된 훅 함수들이 실행되는 구조입니다.

### 훅 파일 생성 및 등록

**1단계: 파일 생성**
```
/extend/my_hooks.php (파일명은 자유)
```

**2단계: 기본 구조 작성**
```php
<?php
if (!defined('_GNUBOARD_')) exit;

// 우선순위와 파라미터 개수 지정
add_event('이벤트명', '함수명', G5_HOOK_DEFAULT_PRIORITY, 파라미터_개수);

function 함수명($param1, $param2, ...)
{
    // 실행할 코드
}
?>
```

**3단계: 파라미터 활용**
```php
function write_update_handler($board, $wr_id, $w, $qstr, $redirect_url)
{
    // $board: 게시판 설정 배열
    // $wr_id: 게시글 번호
    // $w: 작업 구분 (write/modify/reply)
    // $qstr: 쿼리 스트링
    // $redirect_url: 리다이렉트 URL
    
    if ($w === 'write') {
        // 새 게시글 작성 시에만 실행
        send_notification($board['bo_table'], $wr_id);
    }
}
```

### 실제 활용 사례

**사례 1: 게시글 작성 시 슬랙 알림**
```php
<?php
if (!defined('_GNUBOARD_')) exit;

add_event('write_update_after', 'slack_notification', G5_HOOK_DEFAULT_PRIORITY, 5);

function slack_notification($board, $wr_id, $w, $qstr, $redirect_url)
{
    if ($w === 'write') {
        $write = get_write($board['bo_table'], $wr_id);
        
        $message = "새 게시글: [{$board['bo_subject']}] {$write['wr_subject']}";
        send_slack_message($message);
    }
}

function send_slack_message($message)
{
    $webhook_url = 'YOUR_SLACK_WEBHOOK_URL';
    $data = json_encode(['text' => $message]);
    
    $ch = curl_init($webhook_url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
}
?>
```

**사례 2: 회원 가입 시 추가 처리**
```php
<?php
if (!defined('_GNUBOARD_')) exit;

add_event('register_form_update_after', 'welcome_process', G5_HOOK_DEFAULT_PRIORITY, 2);

function welcome_process($mb_id, $w)
{
    if ($w === '') { // 신규 가입
        // 환영 메시지 발송
        send_welcome_message($mb_id);
        
        // 기본 그룹 추가
        add_member_to_default_group($mb_id);
        
        // 가입 로그 기록
        write_log("신규 회원 가입: {$mb_id}", 'member_register');
    }
}
?>
```

## 📋 그누보드 훅 이벤트 전체 목록

### 공통 및 레이아웃

| 이벤트명 | 파일위치 | 파라미터 | 설명 |
|---------|----------|----------|------|
| `common_header` | common.php | - | 공통 헤더 로드 시 |
| `pre_head` | head.php | - | HTML head 생성 전 |
| `tail_sub` | tail.sub.php | - | 하단 템플릿 로드 시 |

### 관리자 영역

| 이벤트명 | 파일위치 | 파라미터 | 설명 |
|---------|----------|----------|------|
| `admin_common` | adm/_common.php | - | 관리자 공통 로드 시 |
| `admin_board_form_update` | adm/board_form_update.php | $bo_table, $w | 게시판 설정 변경 시 |
| `admin_config_form_update` | adm/config_form_update.php | - | 기본 설정 변경 시 |
| `admin_member_form_update` | adm/member_form_update.php | $w, $mb_id | 회원 정보 변경 시 |
| `admin_member_form_add` | adm/member_form.php | $mb, $w, 'table' | 회원 폼 추가 시 |

### 게시판 기능

| 이벤트명 | 파일위치 | 파라미터 | 설명 |
|---------|----------|----------|------|
| `bbs_write` | bbs/write.php | $board, $wr_id, $w | 글쓰기 폼 로드 시 |
| `write_update_before` | bbs/write_update.php | $board, $wr_id, $w, $qstr | 글 저장 전 |
| `write_update_after` | bbs/write_update.php | $board, $wr_id, $w, $qstr, $redirect_url | 글 저장 후 |
| `bbs_delete` | bbs/delete.php | $write, $board | 글 삭제 시 |
| `bbs_good_before` | bbs/good.php | $bo_table, $wr_id, $good | 추천 전 |
| `bbs_good_after` | bbs/good.php | $bo_table, $wr_id, $good | 추천 후 |

### 댓글 기능

| 이벤트명 | 파일위치 | 파라미터 | 설명 |
|---------|----------|----------|------|
| `comment_update_after` | bbs/write_comment_update.php | $board, $wr_id, $w, $qstr, $redirect_url, $comment_id, $reply_array | 댓글 저장 후 |
| `bbs_delete_comment` | bbs/delete_comment.php | $comment_id, $board | 댓글 삭제 시 |

### 회원 기능

| 이벤트명 | 파일위치 | 파라미터 | 설명 |
|---------|----------|----------|------|
| `register_form_update_before` | bbs/register_form_update.php | $mb_id, $w | 회원가입 처리 전 |
| `register_form_update_after` | bbs/register_form_update.php | $mb_id, $w | 회원가입 처리 후 |
| `member_login_check` | bbs/login_check.php | $mb, $link, $is_social_login | 로그인 확인 시 |
| `member_logout` | bbs/logout.php | $link | 로그아웃 시 |
| `password_is_wrong` | bbs/login_check.php, bbs/password_check.php | 'login', $mb 또는 'bbs', $wr, $qstr | 비밀번호 오류 시 |

### 파일 및 다운로드

| 이벤트명 | 파일위치 | 파라미터 | 설명 |
|---------|----------|----------|------|
| `download_file_header` | bbs/download.php | $file, $file_exist_check | 파일 다운로드 전 |
| `write_update_file_insert` | bbs/write_update.php | $bo_table, $wr_id, $upload[$i], $w | 파일 업로드 시 |

## 스킨 방식과의 차이점

### 기존 스킨 방식
```php
// 게시판 스킨 내부
// update_head.skin.php
// 특정 스킨에서만 동작
```

### 훅 방식의 장점
1. **광범위한 적용**: 관리자 페이지(/adm/)까지 포함
2. **중앙 집중 관리**: extend 폴더에서 통합 관리
3. **스킨 독립적**: 스킨 변경과 무관하게 동작
4. **우선순위 제어**: 여러 훅의 실행 순서 조정 가능

### 실제 구현 팁

**1. 에러 처리**
```php
function my_hook_function($param1, $param2)
{
    try {
        // 메인 로직
        process_data($param1, $param2);
    } catch (Exception $e) {
        // 에러 로그 기록
        error_log("Hook Error: " . $e->getMessage());
    }
}
```

**2. 조건부 실행**
```php
function conditional_hook($board, $wr_id, $w)
{
    // 특정 게시판에서만 실행
    if ($board['bo_table'] !== 'notice') {
        return;
    }
    
    // 신규 작성시에만 실행
    if ($w !== 'write') {
        return;
    }
    
    // 실제 처리 로직
    send_notification($board, $wr_id);
}
```

**3. 성능 최적화**
```php
function optimized_hook($params)
{
    // 불필요한 DB 쿼리 방지
    static $cache = [];
    
    $cache_key = md5(serialize($params));
    if (isset($cache[$cache_key])) {
        return $cache[$cache_key];
    }
    
    // 처리 로직
    $result = expensive_operation($params);
    $cache[$cache_key] = $result;
    
    return $result;
}
```

## 결론

그누보드 훅 시스템은 코어 파일 수정 없이 원하는 기능을 추가할 수 있는 강력한 도구입니다. 특히 관리자 영역까지 포괄하는 넓은 적용 범위와 이벤트 기반의 명확한 실행 시점이 큰 장점입니다.

훅을 효과적으로 활용하면 그누보드 사이트의 기능을 안전하고 체계적으로 확장할 수 있으며, 업데이트 시에도 기능 손실 없이 유지할 수 있습니다.

**다음 단계**: 실제 프로젝트에 필요한 기능을 파악하고, 적절한 이벤트를 선택하여 훅을 구현해보세요. 작은 기능부터 시작하여 점차 복잡한 비즈니스 로직을 추가해나가는 것을 권장합니다.