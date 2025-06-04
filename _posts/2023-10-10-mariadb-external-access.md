---
layout: post
title: "MariaDB 외부 접속 허용 설정 완벽 가이드"
date: 2023-10-10 09:00:00 +0900
categories: [Development, Database]
tags: [mariadb, mysql, database, server, configuration, troubleshooting]
author: "Kevin Park"
excerpt: "MariaDB 외부 접속을 위한 bind-address 설정 변경과 사용자 권한 설정 방법을 단계별로 설명합니다."
---

# MariaDB 외부 접속 허용 설정 완벽 가이드

## 🎯 Summary

MariaDB에 외부에서 접속하려면 **bind-address 설정 변경**과 **사용자 권한 설정** 두 단계가 필요합니다.

### 즉시 해결 방법

**1. bind-address 주석 처리**
```bash
# my.cnf 파일 편집
sudo nano /etc/mysql/my.cnf
# 또는
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

```ini
# 이 줄을 주석 처리
#bind-address = 127.0.0.1
```

**2. 외부 접속 권한 부여**
```sql
-- MariaDB 접속 후 실행
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

**3. 서비스 재시작**
```bash
sudo systemctl restart mariadb
```

---

## 📚 상세 설명

### 배경 및 필요성

MariaDB는 기본적으로 보안상의 이유로 로컬 접속(`127.0.0.1`)만 허용합니다. 원격 서버나 다른 애플리케이션에서 데이터베이스에 접속하려면 외부 접속을 허용하도록 설정을 변경해야 합니다.

### 단계별 설정 과정

#### 1. 설정 파일 위치 확인

**Ubuntu/Debian 계열**
```bash
# 주 설정 파일 위치
/etc/mysql/my.cnf
/etc/mysql/mariadb.conf.d/50-server.cnf
```

**CentOS/RHEL 계열**
```bash
# 주 설정 파일 위치
/etc/my.cnf
/etc/my.cnf.d/server.cnf
```

#### 2. bind-address 설정 변경

```bash
# 설정 파일 백업
sudo cp /etc/mysql/my.cnf /etc/mysql/my.cnf.backup

# 설정 파일 편집
sudo nano /etc/mysql/my.cnf
```

**변경 전**
```ini
[mysqld]
bind-address = 127.0.0.1
```

**변경 후**
```ini
[mysqld]
#bind-address = 127.0.0.1
# 또는 특정 IP만 허용하려면
#bind-address = 0.0.0.0
```

#### 3. 사용자 권한 설정

```sql
-- MariaDB 접속
mysql -u root -p

-- 모든 IP에서 접속 허용
CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'%';
FLUSH PRIVILEGES;

-- 특정 IP에서만 접속 허용
CREATE USER 'myuser'@'192.168.1.100' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON mydatabase.* TO 'myuser'@'192.168.1.100';
FLUSH PRIVILEGES;
```

#### 4. 방화벽 설정

**Ubuntu (UFW)**
```bash
sudo ufw allow 3306/tcp
```

**CentOS (firewalld)**
```bash
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload
```

### 실제 활용 사례

#### 웹 애플리케이션 연결
```javascript
// Node.js 예시
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'your-server-ip',
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('연결 실패:', err);
    return;
  }
  console.log('MariaDB 연결 성공!');
});
```

#### 외부 도구 연결 설정
```
Host: your-server-ip
Port: 3306
Username: myuser
Password: mypassword
Database: mydatabase
```

### 보안 고려사항

**1. 특정 IP만 허용**
```sql
-- 특정 IP 대역만 허용
GRANT ALL PRIVILEGES ON *.* TO 'user'@'192.168.1.%' IDENTIFIED BY 'password';
```

**2. 강력한 패스워드 설정**
```sql
-- 복잡한 패스워드 사용
CREATE USER 'user'@'%' IDENTIFIED BY 'StrongP@ssw0rd!2023';
```

**3. 최소 권한 원칙**
```sql
-- 필요한 권한만 부여
GRANT SELECT, INSERT, UPDATE ON mydatabase.* TO 'user'@'%';
```

### 문제 해결

#### 연결 실패시 확인사항

**1. 포트 확인**
```bash
netstat -tulpn | grep 3306
```

**2. 서비스 상태 확인**
```bash
sudo systemctl status mariadb
```

**3. 로그 확인**
```bash
sudo tail -f /var/log/mysql/error.log
```

#### 일반적인 오류 해결

**"Access denied" 오류**
```sql
-- 사용자 권한 재확인
SELECT user, host FROM mysql.user WHERE user = 'myuser';
SHOW GRANTS FOR 'myuser'@'%';
```

**"Can't connect to server" 오류**
```bash
# 방화벽 상태 확인
sudo ufw status
# 또는
sudo firewall-cmd --list-all
```

## 결론

MariaDB 외부 접속 설정은 `bind-address` 주석 처리와 사용자 권한 설정만으로 간단히 해결할 수 있습니다. 하지만 보안을 위해 특정 IP만 허용하고 최소 권한 원칙을 적용하는 것이 중요합니다.

다음 단계로는 SSL 연결 설정과 고급 보안 옵션 적용을 고려해보세요.