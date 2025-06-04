---
layout: post
title: "Linux SSH 키 생성하기 - ssh-keygen 완벽 가이드"
date: 2024-05-10 09:00:00 +0900
categories: [Development, Tutorial]
tags: [linux, ssh, keygen, security, server, tutorial, beginner]
author: "Kevin Park"
excerpt: "SSH 키 생성부터 활용까지! ssh-keygen 명령어로 안전한 서버 접속 환경을 구축하는 완벽 가이드"
---

# Linux SSH 키 생성하기 - ssh-keygen 완벽 가이드

## 🎯 Summary

**즉시 사용 가능한 SSH 키 생성 명령어:**

```bash
# RSA 키 생성 (가장 일반적)
ssh-keygen -t rsa

# 더 안전한 ED25519 키 생성 (권장)
ssh-keygen -t ed25519

# 키 크기 지정 (RSA의 경우)
ssh-keygen -t rsa -b 4096
```

**기본 사용법:**
1. `ssh-keygen -t rsa` 실행
2. 저장 경로 묻기 → 엔터 (기본 경로 사용)
3. 패스워드 묻기 → 엔터 (비밀번호 없이 사용)
4. 패스워드 재확인 → 엔터

**생성된 키 확인:**
```bash
# 공개키 내용 확인
cat ~/.ssh/id_rsa.pub

# 생성된 키 파일 목록
ls -la ~/.ssh/
```

---

## 📚 상세 설명

### 배경 및 필요성

SSH 키는 비밀번호 없이 안전하게 원격 서버에 접속하기 위한 인증 방식입니다. 특히 Git, AWS EC2, VPS 서버 접속 시 필수적으로 사용되며, 비밀번호보다 훨씬 안전하고 편리한 인증 방법을 제공합니다.

### ssh-keygen 명령어 옵션 상세

#### 키 타입 옵션 (-t)
```bash
# RSA (가장 호환성 좋음)
ssh-keygen -t rsa

# ED25519 (더 안전하고 빠름, 최신 권장)
ssh-keygen -t ed25519

# ECDSA (타원곡선 암호화)
ssh-keygen -t ecdsa

# DSA (구식, 권장하지 않음)
ssh-keygen -t dsa
```

#### 키 크기 지정 (-b)
```bash
# RSA 4096비트 (더 안전)
ssh-keygen -t rsa -b 4096

# RSA 2048비트 (기본값)
ssh-keygen -t rsa -b 2048
```

#### 파일명과 경로 지정 (-f)
```bash
# 특정 파일명으로 생성
ssh-keygen -t rsa -f ~/.ssh/my_server_key

# 현재 디렉토리에 생성
ssh-keygen -t rsa -f ./my_key
```

#### 코멘트 추가 (-C)
```bash
# 이메일 주소나 설명 추가
ssh-keygen -t rsa -C "your_email@example.com"
ssh-keygen -t rsa -C "aws-ec2-production"
```

### 실제 생성 과정 단계별 설명

**1단계: 명령어 실행**
```bash
ubuntu@server:~$ ssh-keygen -t rsa
Generating public/private rsa key pair.
```

**2단계: 저장 위치 선택**
```bash
Enter file in which to save the key (/home/ubuntu/.ssh/id_rsa): 
```
- 엔터: 기본 경로 사용 (`~/.ssh/id_rsa`)
- 다른 경로: 원하는 파일명 입력

**3단계: 패스워드 설정**
```bash
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
```
- 엔터 두 번: 패스워드 없이 사용
- 패스워드 입력: 추가 보안 레이어 (매번 입력 필요)

**4단계: 생성 완료**
```bash
Your identification has been saved in /home/ubuntu/.ssh/id_rsa
Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:8MBHCzkCy/2X2CQCTeP2p9r2gUOAZokCtrCANw5DaAk ubuntu@ip-172-31-35-113
The key's randomart image is:
+---[RSA 3072]----+
|Eo++o ...        |
|X*+Boooo .       |
|=*B.*.=.+        |
|.o.. = X .       |
|      = S        |
|     . =         |
|      + .        |
|     o.. .       |
|    .....        |
+----[SHA256]-----+
```

### 생성된 파일 구조

```bash
~/.ssh/
├── id_rsa        # 개인키 (절대 공유하면 안됨)
├── id_rsa.pub    # 공개키 (서버에 등록하는 키)
├── known_hosts   # 접속한 서버 정보
└── authorized_keys  # 허용된 공개키 목록
```

### 실제 활용 사례

#### GitHub/GitLab 연동
```bash
# 1. SSH 키 생성
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 공개키 복사
cat ~/.ssh/id_ed25519.pub

# 3. GitHub Settings > SSH Keys에 추가
# 4. 연결 테스트
ssh -T git@github.com
```

#### AWS EC2 인스턴스 접속
```bash
# 1. 키 생성 (EC2용 별도 키)
ssh-keygen -t rsa -f ~/.ssh/aws_ec2_key

# 2. 공개키를 EC2 인스턴스에 등록
# 3. 접속
ssh -i ~/.ssh/aws_ec2_key ubuntu@your-ec2-ip
```

#### 여러 서버 관리를 위한 SSH Config
```bash
# ~/.ssh/config 파일 생성
Host production
    HostName 192.168.1.100
    User ubuntu
    IdentityFile ~/.ssh/production_key

Host development
    HostName 192.168.1.200
    User dev
    IdentityFile ~/.ssh/dev_key

# 사용법
ssh production
ssh development
```

### 보안 관련 주의사항

#### 파일 권한 설정
```bash
# 개인키 권한 (소유자만 읽기 가능)
chmod 600 ~/.ssh/id_rsa

# 공개키 권한
chmod 644 ~/.ssh/id_rsa.pub

# .ssh 디렉토리 권한
chmod 700 ~/.ssh
```

#### 패스워드 사용 여부
```bash
# 패스워드 없이 (편의성 우선)
ssh-keygen -t rsa

# 패스워드 있이 (보안 우선)
ssh-keygen -t rsa
# 패스워드 입력 후 사용시마다 입력 필요
```

### 에러 해결 및 트러블슈팅

#### 권한 관련 에러
```bash
# 에러: WARNING: UNPROTECTED PRIVATE KEY FILE!
chmod 600 ~/.ssh/id_rsa

# 에러: Permission denied (publickey)
# 1. 공개키가 서버에 제대로 등록되었는지 확인
# 2. SSH 에이전트 확인
ssh-add -l
ssh-add ~/.ssh/id_rsa
```

#### 기존 키 백업 및 새로 생성
```bash
# 기존 키 백업
cp ~/.ssh/id_rsa ~/.ssh/id_rsa.backup
cp ~/.ssh/id_rsa.pub ~/.ssh/id_rsa.pub.backup

# 새 키 생성 (기존 키 덮어쓰기)
ssh-keygen -t rsa -f ~/.ssh/id_rsa
```

### 고급 사용법

#### 한 번에 여러 설정으로 키 생성
```bash
# 패스워드 없이, 4096비트, 코멘트 포함
ssh-keygen -t rsa -b 4096 -C "production-server" -f ~/.ssh/prod_key -N ""
```

#### SSH 에이전트 활용
```bash
# SSH 에이전트 시작
eval "$(ssh-agent -s)"

# 키 추가 (패스워드 한 번만 입력)
ssh-add ~/.ssh/id_rsa

# 등록된 키 확인
ssh-add -l
```

## 결론

SSH 키 생성은 `ssh-keygen -t rsa` 명령어 하나로 간단히 할 수 있지만, 보안과 편의성을 고려하여 적절한 옵션을 선택하는 것이 중요합니다. 특히 최신 환경에서는 ED25519 키 타입 사용을 권장하며, 여러 서버를 관리할 때는 SSH Config 파일을 활용하여 효율적으로 관리할 수 있습니다.

다음 단계로는 생성한 SSH 키를 실제 서버나 Git 서비스에 등록하여 비밀번호 없는 안전한 인증 환경을 구축해보세요.
