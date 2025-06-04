---
layout: post
title: "Ubuntu 18.04LTS에서 LEMP 스택 설치하기: Nginx, MariaDB, PHP 7.1 완벽 가이드"
date: 2023-11-10 10:00:00 +0900
categories: [Development, Tutorial]
tags: [ubuntu, nginx, mariadb, php, lemp, server, hosting, tutorial, beginner]
author: "Kevin Park"
excerpt: "Ubuntu 18.04LTS에서 LEMP 스택을 빠르게 설치하는 완벽 가이드. 원클릭 스크립트와 멀티사이트 호스팅 설정까지 한번에 해결하세요."
---

# Ubuntu 18.04LTS에서 LEMP 스택 설치하기: Nginx, MariaDB, PHP 7.1 완벽 가이드

## 🎯 Summary

**Ubuntu 18.04LTS에서 LEMP 스택을 빠르게 설치하는 방법**

### 원클릭 설치 스크립트
```bash
#!/bin/bash
# LEMP Stack 자동 설치 스크립트

# Nginx 설치
sudo apt update
sudo apt install -y nginx
sudo systemctl start nginx.service
sudo systemctl enable nginx.service

# MariaDB 설치
sudo apt-get install -y mariadb-server mariadb-client
sudo systemctl start mysql.service
sudo systemctl enable mysql.service

# PHP 7.1 설치
sudo apt-get install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install -y php7.1 php7.1-fpm php7.1-mysql php7.1-common php7.1-curl php7.1-xml php7.1-zip php7.1-gd php7.1-mbstring

# PHP-FMP 시작
sudo systemctl start php7.1-fpm
sudo systemctl enable php7.1-fmp
```

### 핵심 설정 파일
```nginx
# /etc/nginx/sites-available/default
server {
    listen 80;
    listen [::]:80;
    root /var/www/html;
    index index.php index.html index.htm;
    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.1-fmp.sock;
    }
}
```

### 즉시 테스트 방법
```bash
# 설치 확인
sudo nginx -t
sudo systemctl status nginx
sudo systemctl status mysql
sudo systemctl status php7.1-fmp

# PHP 정보 페이지 생성
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
```

---

## 📚 상세 설명

### 배경 및 필요성

**LEMP 스택이란?**
- **L**inux: 운영체제 (Ubuntu 18.04LTS)
- **E**nginx: 웹 서버 (Apache 대신 사용)
- **M**ariaDB: 데이터베이스 (MySQL 호환)
- **P**HP: 서버사이드 스크립트 언어

**왜 이 조합을 선택하는가?**
- **성능**: Nginx는 Apache보다 메모리 사용량이 적고 동시 접속 처리 능력이 뛰어남
- **안정성**: MariaDB는 MySQL의 완전한 대체재로 더 나은 성능과 보안을 제공
- **호환성**: PHP 7.1은 많은 CMS와 프레임워크에서 안정적으로 지원

### 단계별 설치 과정

#### 1. 시스템 준비
```bash
# 패키지 목록 업데이트
sudo apt update
sudo apt upgrade -y

# 필수 패키지 설치
sudo apt install -y curl wget software-properties-common
```

#### 2. Nginx 설치 및 설정
```bash
# Nginx 설치
sudo apt install -y nginx

# 서비스 관리
sudo systemctl start nginx.service
sudo systemctl enable nginx.service

# 방화벽 설정
sudo ufw allow 'Nginx Full'
```

**Nginx 기본 설정 최적화:**
```nginx
# /etc/nginx/nginx.conf 주요 설정
worker_processes auto;
worker_connections 1024;

# Gzip 압축 활성화
gzip on;
gzip_types text/plain application/json application/javascript text/css;

# 보안 헤더 추가
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
```

#### 3. MariaDB 설치 및 보안 설정
```bash
# MariaDB 설치
sudo apt-get install -y mariadb-server mariadb-client

# 서비스 시작
sudo systemctl start mysql.service
sudo systemctl enable mysql.service

# 보안 설정 (대화형)
sudo mysql_secure_installation
```

**자동화된 MariaDB 보안 설정:**
```bash
# 비대화형 보안 설정
sudo mysql -e "UPDATE mysql.user SET Password = PASSWORD('your_password') WHERE User = 'root'"
sudo mysql -e "DROP DATABASE IF EXISTS test"
sudo mysql -e "DELETE FROM mysql.user WHERE User=''"
sudo mysql -e "DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1')"
sudo mysql -e "FLUSH PRIVILEGES"
```

#### 4. PHP 7.1 설치 및 최적화
```bash
# Ondrej PPA 추가 (PHP 7.1 지원)
sudo add-apt-repository ppa:ondrej/php
sudo apt update

# PHP 7.1 및 필수 확장 설치
sudo apt install -y php7.1 php7.1-fmp php7.1-mysql php7.1-common \
php7.1-curl php7.1-xml php7.1-zip php7.1-gd php7.1-mbstring \
php7.1-json php7.1-bz2 php7.1-intl php7.1-readline
```

**PHP 설정 최적화:**
```ini
# /etc/php/7.1/fmp/php.ini 주요 설정
memory_limit = 256M
upload_max_filesize = 100M
post_max_size = 100M
max_execution_time = 360
max_input_vars = 3000
allow_url_fopen = On

# 보안 설정
expose_php = Off
display_errors = Off
log_errors = On
```

### 실제 활용 사례

#### 멀티 사이트 호스팅 설정
```nginx
# /etc/nginx/sites-available/multisite
server {
    listen 80;
    server_name site1.com www.site1.com;
    root /var/www/site1;
    
    location / {
        try_files $uri $uri/ /index.php?$args;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.1-fmp.sock;
    }
}

server {
    listen 80;
    server_name site2.com www.site2.com;
    root /var/www/site2;
    
    # 동일한 PHP 설정 적용
    include /etc/nginx/snippets/php-handler.conf;
}
```

#### 데이터베이스 사용자 및 권한 설정
```sql
-- 각 사이트별 DB 사용자 생성
CREATE DATABASE site1_db;
CREATE USER 'site1_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON site1_db.* TO 'site1_user'@'localhost';

CREATE DATABASE site2_db;
CREATE USER 'site2_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON site2_db.* TO 'site2_user'@'localhost';

FLUSH PRIVILEGES;
```

#### 자동화 스크립트 완성판
```bash
#!/bin/bash
# complete-lemp-setup.sh

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}LEMP Stack 설치를 시작합니다...${NC}"

# 시스템 업데이트
echo -e "${YELLOW}시스템 업데이트 중...${NC}"
sudo apt update && sudo apt upgrade -y

# Nginx 설치
echo -e "${YELLOW}Nginx 설치 중...${NC}"
sudo apt install -y nginx
sudo systemctl start nginx.service
sudo systemctl enable nginx.service

# MariaDB 설치
echo -e "${YELLOW}MariaDB 설치 중...${NC}"
sudo apt-get install -y mariadb-server mariadb-client
sudo systemctl start mysql.service
sudo systemctl enable mysql.service

# PHP 7.1 설치
echo -e "${YELLOW}PHP 7.1 설치 중...${NC}"
sudo apt-get install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php7.1 php7.1-fmp php7.1-mysql php7.1-common \
php7.1-curl php7.1-xml php7.1-zip php7.1-gd php7.1-mbstring

# PHP-FMP 시작
sudo systemctl start php7.1-fmp
sudo systemctl enable php7.1-fmp

# Nginx 설정
sudo tee /etc/nginx/sites-available/default > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    root /var/www/html;
    index index.php index.html index.htm;
    server_name _;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~ \.php\$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.1-fmp.sock;
    }
}
EOF

# 서비스 재시작
sudo systemctl restart nginx.service
sudo systemctl restart php7.1-fmp

# 테스트 파일 생성
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php

echo -e "${GREEN}LEMP Stack 설치가 완료되었습니다!${NC}"
echo -e "${GREEN}브라우저에서 http://your-server-ip/info.php로 접속하여 확인하세요.${NC}"
```

### 문제 해결 및 최적화

#### 일반적인 오류 해결
```bash
# Nginx 설정 테스트
sudo nginx -t

# PHP-FMP 소켓 확인
sudo ls -la /var/run/php/

# 로그 확인
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/php7.1-fmp.log
```

#### 성능 최적화
```bash
# PHP-FMP 풀 설정 최적화
sudo nano /etc/php/7.1/fmp/pool.d/www.conf

# 주요 설정값
pm = dynamic
pm.max_children = 50
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 35
```

## 결론

Ubuntu 18.04LTS에서 LEMP 스택 설치는 웹 개발 환경 구축의 기본이 되는 중요한 과정입니다. 이 가이드를 통해 Nginx의 높은 성능, MariaDB의 안정성, PHP 7.1의 호환성을 모두 활용할 수 있는 견고한 웹 서버 환경을 구축할 수 있습니다.

**다음 단계로는:**
- SSL/TLS 인증서 설정 (Let's Encrypt)
- 자동 백업 시스템 구축
- 모니터링 도구 설치 (Netdata, Grafana)
- 캐싱 시스템 도입 (Redis, Memcached)

이러한 기반 위에서 WordPress, Laravel, 또는 사용자 정의 PHP 애플리케이션을 안정적으로 운영할 수 있습니다.