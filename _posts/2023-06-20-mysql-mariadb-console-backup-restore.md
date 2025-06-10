---
layout: post
title: "MySQL/MariaDB 콘솔에서 데이터베이스 백업 및 복구 완벽 가이드"
date: 2023-06-20 10:00:00 +0900
categories: [Development, Database]
tags: [mysql, mariadb, database, backup, restore, console, mysqldump]
author: "Kevin Park"
lang: ko
excerpt: "GUI 툴 없이 콘솔에서 MySQL/MariaDB 데이터베이스를 백업하고 복구하는 방법. 호스팅 환경에서 바로 사용 가능한 명령어 모음집"
---

# MySQL/MariaDB 콘솔에서 데이터베이스 백업 및 복구 완벽 가이드

## 🎯 핵심 해결책 (바로 사용 가능)

호스팅이나 제한적인 환경에서 GUI 툴 없이 콘솔로 데이터베이스를 백업하고 복구해야 할 때 사용하는 명령어들입니다.

### 가장 많이 사용되는 패턴

#### 1. 단일 데이터베이스 백업 (가장 일반적)
```bash
# 기본 백업
mysqldump -u[아이디] -p[패스워드] [데이터베이스명] > backup.sql

# 실제 사용 예시
mysqldump -umyuser -pmypassword mywebsite_db > website_backup_20230620.sql
```

#### 2. 단일 데이터베이스 복구
```bash
# 기본 복구
mysql -u[아이디] -p[패스워드] [데이터베이스명] < backup.sql

# 실제 사용 예시
mysql -umyuser -pmypassword mywebsite_db < website_backup_20230620.sql
```

#### 3. 전체 데이터베이스 백업 (서버 마이그레이션 시)
```bash
# 모든 데이터베이스 백업
mysqldump -u[아이디] -p[패스워드] --all-databases > full_backup.sql

# 실제 사용 예시
mysqldump -uroot -pmypassword --all-databases > full_server_backup_20230620.sql
```

### ⚠️ 중요한 사용법 주의사항
- **-u와 -p 뒤에 공백 없이** 아이디와 패스워드를 붙여서 작성
- 패스워드에 특수문자가 있으면 작은따옴표로 감싸기: `-p'my@pass!'`
- 백업 파일명에 날짜 포함 권장: `backup_YYYYMMDD.sql`

---

## 📚 상세 설명

### 배경 및 필요성

현대의 데이터베이스 관리에서는 phpMyAdmin, MySQL Workbench, DBeaver 같은 GUI 툴들이 편리한 백업/복구 기능을 제공합니다. 하지만 다음과 같은 상황에서는 콘솔 명령어가 필수적입니다:

- **호스팅 환경**: 공유 호스팅에서 SSH 접근만 가능한 경우
- **서버 자동화**: 크론탭을 이용한 정기 백업 설정
- **대용량 데이터**: GUI 툴의 시간 제한이나 메모리 한계
- **원격 서버**: 네트워크 제약으로 GUI 접근이 어려운 환경

### 기술적 세부사항

#### mysqldump 옵션 상세 설명

```bash
# 구조만 백업 (데이터 제외)
mysqldump -u[아이디] -p[패스워드] --no-data [DB명] > structure_only.sql

# 데이터만 백업 (구조 제외)
mysqldump -u[아이디] -p[패스워드] --no-create-info [DB명] > data_only.sql

# 압축 백업 (용량 절약)
mysqldump -u[아이디] -p[패스워드] [DB명] | gzip > backup.sql.gz

# 특정 테이블만 백업
mysqldump -u[아이디] -p[패스워드] [DB명] [테이블명] > table_backup.sql
```

#### 복구 시 주의사항

```bash
# 데이터베이스가 존재하지 않는 경우 먼저 생성
mysql -u[아이디] -p[패스워드] -e "CREATE DATABASE IF NOT EXISTS [DB명];"

# 그 후 복구 실행
mysql -u[아이디] -p[패스워드] [DB명] < backup.sql
```

### 실제 활용 사례

#### 1. 정기 백업 자동화 (크론탭)
```bash
# crontab -e 로 편집
# 매일 새벽 2시에 백업
0 2 * * * /usr/bin/mysqldump -umyuser -pmypass mydb > /backup/daily_$(date +\%Y\%m\%d).sql

# 매주 일요일 새벽 3시에 전체 백업
0 3 * * 0 /usr/bin/mysqldump -umyuser -pmypass --all-databases > /backup/weekly_$(date +\%Y\%m\%d).sql
```

#### 2. 서버 간 데이터 이전
```bash
# 원본 서버에서 백업
mysqldump -uolduser -poldpass production_db > migration_backup.sql

# 파일 전송 (scp 사용)
scp migration_backup.sql user@newserver:/tmp/

# 새 서버에서 복구
mysql -unewuser -pnewpass production_db < /tmp/migration_backup.sql
```

#### 3. 에러 처리 및 트러블슈팅

**자주 발생하는 오류와 해결방법:**

```bash
# 오류: Access denied
# 해결: 사용자 권한 확인
GRANT SELECT, SHOW DATABASES ON *.* TO 'username'@'localhost';

# 오류: Unknown database
# 해결: 데이터베이스 먼저 생성
mysql -u[아이디] -p[패스워드] -e "CREATE DATABASE [DB명];"

# 오류: Table doesn't exist
# 해결: 외래키 제약조건 임시 해제 후 복구
mysql -u[아이디] -p[패스워드] -e "SET FOREIGN_KEY_CHECKS=0;"
mysql -u[아이디] -p[패스워드] [DB명] < backup.sql
mysql -u[아이디] -p[패스워드] -e "SET FOREIGN_KEY_CHECKS=1;"
```

#### 4. 대용량 데이터베이스 처리

```bash
# 진행상황 표시하며 백업
mysqldump -u[아이디] -p[패스워드] [DB명] | pv > backup.sql

# 압축과 동시에 백업 (디스크 공간 절약)
mysqldump -u[아이디] -p[패스워드] [DB명] | gzip > backup.sql.gz

# 압축파일 직접 복구
gunzip < backup.sql.gz | mysql -u[아이디] -p[패스워드] [DB명]
```

## 결론

콘솔을 이용한 MySQL/MariaDB 백업과 복구는 호스팅 환경이나 자동화가 필요한 상황에서 매우 유용합니다. 특히 `-u`와 `-p` 옵션 뒤에 공백 없이 사용자명과 비밀번호를 붙여 쓰는 것이 핵심 포인트입니다.

**다음 단계로 추천하는 내용:**
- 정기 백업 스크립트 작성 및 크론탭 설정
- 백업 파일 암호화 및 원격 저장소 업로드
- 복구 테스트 환경 구축 및 검증 프로세스 수립

데이터는 기업의 생명입니다. 정기적인 백업과 복구 테스트를 통해 안전한 데이터 관리를 실천하세요.