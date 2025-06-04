---
layout: post
title: "Bitbucket Access Key로 SSH Push 설정하기"
date: 2023-12-10 09:00:00 +0900
categories: [Development, Tutorial]
tags: [bitbucket, ssh, git, devops, setup, tutorial]
author: "Kevin Park"
excerpt: "Bitbucket Private Repository에 SSH Key를 사용하여 비밀번호 없이 안전하게 push하는 완전한 설정 가이드"
---

# Bitbucket Access Key로 SSH Push 설정하기

## 🎯 Summary

**Bitbucket Private Repository에 SSH Key를 사용하여 비밀번호 없이 push하는 방법**

### 핵심 단계
1. **SSH Key 생성**
```bash
ssh-keygen -t rsa -C "your-email@example.com"
# Enter 키만 눌러서 기본 설정으로 생성
```

2. **SSH Agent 설정**
```bash
# SSH Agent 시작
eval "$(ssh-agent -s)"

# 생성된 키를 SSH Agent에 추가
ssh-add ~/.ssh/id_rsa

# 등록 확인
ssh-add -l
```

3. **Public Key 복사**
```bash
cat ~/.ssh/id_rsa.pub
# 출력된 내용 전체를 복사
```

4. **Bitbucket Repository 설정**
   - Repository Settings → Access Keys → Add Key
   - Label 입력, Read/Write 권한 체크
   - 복사한 Public Key 붙여넣기

5. **SSH 주소로 Push**
```bash
git remote set-url origin ssh://git@bitbucket.org:username/repository.git
git push origin master
```

---

## 📚 상세 설명

### 배경 및 필요성

GitHub에서 Bitbucket으로 서버를 변경하면서 Private Repository에 접근하는 방법이 달라집니다. 매번 아이디/비밀번호를 입력하는 번거로움을 피하고, 특히 CI/CD 파이프라인이나 자동화 스크립트에서 안전하게 Git 작업을 수행하기 위해 SSH Key 인증을 설정해야 합니다.

### SSH Key 생성 과정

#### 1. SSH Key 생성
```bash
# RSA 타입의 SSH Key 생성
ssh-keygen -t rsa -C "your-email@example.com"

# 실행 결과 예시
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): [Enter]
Enter passphrase (empty for no passphrase): [Enter]
Enter same passphrase again: [Enter]
```

**주요 옵션:**
- `-t rsa`: RSA 암호화 알고리즘 사용
- `-C`: 코멘트 추가 (보통 이메일 주소)
- Enter만 누르면 기본 경로와 빈 패스프레이즈로 설정

#### 2. 생성된 파일 확인
```bash
ls -la ~/.ssh/
# id_rsa (개인키), id_rsa.pub (공개키) 파일 확인

# 권한 설정 (보안상 중요)
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

### SSH Agent 설정

#### SSH Agent 시작 및 키 등록
```bash
# SSH Agent 백그라운드 실행
eval "$(ssh-agent -s)"
# Agent pid 1234 와 같은 메시지 출력

# SSH 키를 Agent에 추가
ssh-add ~/.ssh/id_rsa

# 등록된 키 확인
ssh-add -l
# 2048 SHA256:... /root/.ssh/id_rsa (RSA) 형태로 출력
```

**SSH Agent를 사용하는 이유:**
- 한 번 키를 로드하면 세션 동안 재입력 불필요
- 여러 저장소에 동일한 키 사용 가능
- 보안상 메모리에서만 키 관리

### Bitbucket Access Key 등록

#### 1. Repository 설정 접근
1. Bitbucket Repository 페이지 이동
2. **Settings** 클릭
3. **Access Management** → **Access Keys** 선택

#### 2. Access Key 추가
```bash
# Public Key 내용 복사
cat ~/.ssh/id_rsa.pub
# ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQ... your-email@example.com
```

**설정 옵션:**
- **Label**: 키를 구분할 수 있는 이름 (예: "Production Server Key")
- **Key**: 복사한 Public Key 전체 내용
- **Permissions**: 
  - ✅ **Read**: 저장소 클론/풀 권한
  - ✅ **Write**: 푸시 권한 (필요시 체크)

### SSH 연결 테스트 및 Push

#### 1. SSH 연결 테스트
```bash
# Bitbucket SSH 연결 테스트
ssh -T git@bitbucket.org

# 성공시 출력 예시:
# logged in as username.
# You can use git or hg to connect to Bitbucket.
```

#### 2. Remote URL 변경
```bash
# 현재 remote URL 확인
git remote -v

# HTTPS에서 SSH로 변경
git remote set-url origin ssh://git@bitbucket.org/username/repository.git

# 또는 git clone시 SSH 주소 사용
git clone ssh://git@bitbucket.org/username/repository.git
```

#### 3. Push 실행
```bash
git add .
git commit -m "SSH key setup test"
git push origin master

# 비밀번호 입력 없이 push 성공
# Enumerating objects: 12, done.
# Compressing objects: 100% (11/11), done.
# Total 12 (delta 6), reused 0 (delta 0)
# To ssh://git@bitbucket.org/username/repository.git
#    ca052fa..57740e4  master -> master
```

### 실제 활용 사례

#### Jenkins 자동 백업 설정
```bash
#!/bin/bash
# Jenkins 백업 스크립트에서 SSH Key 활용

# 백업 파일 생성
tar -czf jenkins_backup_$(date +%Y%m%d).tar.gz /var/lib/jenkins/

# Git에 자동 커밋 및 푸시
git add .
git commit -m "Jenkins backup $(date +%Y-%m-%d)"
git push origin master
```

#### 다중 저장소 관리
```bash
# ~/.ssh/config 파일로 여러 키 관리
Host bitbucket-work
    HostName bitbucket.org
    User git
    IdentityFile ~/.ssh/id_rsa_work

Host bitbucket-personal
    HostName bitbucket.org
    User git
    IdentityFile ~/.ssh/id_rsa_personal

# 사용법
git clone ssh://bitbucket-work/company/project.git
git clone ssh://bitbucket-personal/username/personal-project.git
```

### 주요 문제 해결

#### Permission Denied 오류
```bash
# SSH 키 권한 확인
ls -la ~/.ssh/id_rsa
# -rw------- 1 user user ... id_rsa (600 권한 필요)

# 권한 수정
chmod 600 ~/.ssh/id_rsa
```

#### SSH Agent 연결 실패
```bash
# SSH Agent 상태 확인
ps aux | grep ssh-agent

# Agent 재시작
killall ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

## 결론

SSH Key를 사용한 Bitbucket 인증 설정은 보안성과 편의성을 모두 제공하는 필수적인 개발 환경 구성입니다. 특히 자동화된 CI/CD 환경에서는 비밀번호 입력 없이 Git 작업을 수행할 수 있어 매우 유용합니다.

**핵심 포인트:**
- SSH Key는 한 번 설정하면 영구적으로 사용 가능
- Public Key만 서버에 등록하므로 보안상 안전
- 여러 저장소와 서버에서 동일한 키 재사용 가능
- Jenkins, GitHub Actions 등 자동화 도구와의 연동이 간편

**다음 단계:**
- SSH Config 파일을 활용한 다중 계정 관리
- GPG Key를 추가한 커밋 서명 설정
- 2FA(Two-Factor Authentication)와 SSH Key 조합 사용
