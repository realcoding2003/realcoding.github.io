---
layout: post
title: "AWS Lambda + S3 + CloudWatch + SNS를 활용한 네이버 블로그 자동 포스팅 시스템 구축"
date: 2024-04-10 10:00:00 +0900
categories: [Development, Project]
tags: [aws, lambda, s3, cloudwatch, sns, naver-blog, serverless, automation, python, selenium]
author: "Kevin Park"
excerpt: "기존 온프레미스 서버의 복잡성을 해결하고 AWS 서버리스 아키텍처로 네이버 블로그 자동 포스팅 시스템을 구축하는 완전한 가이드"
---

# AWS Lambda + S3 + CloudWatch + SNS를 활용한 네이버 블로그 자동 포스팅 시스템 구축

## 🎯 Summary

네이버 블로그 포스팅을 AWS 서버리스 아키텍처로 자동화하는 완전한 솔루션입니다. 기존 온프레미스 서버의 복잡성과 오류를 해결하고, 확장 가능한 마이크로서비스 기반으로 전환하는 방법을 제시합니다.

### 핵심 아키텍처 구성요소
```
S3 (콘텐츠 저장) → Lambda (처리 로직) → CloudWatch (모니터링) → SNS (알림)
```

### 바로 사용 가능한 Lambda 함수 예시
```python
import json
import boto3
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import logging

def lambda_handler(event, context):
    """
    네이버 블로그 포스팅 자동화 Lambda 함수
    """
    
    # S3에서 포스팅 데이터 가져오기
    s3_client = boto3.client('s3')
    sns_client = boto3.client('sns')
    
    try:
        # S3에서 포스팅 콘텐츠 읽기
        bucket_name = event['bucket_name']
        object_key = event['object_key']
        
        response = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        post_data = json.loads(response['Body'].read())
        
        # 네이버 블로그 포스팅 실행
        result = post_to_naver_blog(post_data)
        
        # 성공 알림
        send_notification(sns_client, "포스팅 성공", result)
        
        return {
            'statusCode': 200,
            'body': json.dumps('포스팅 완료')
        }
        
    except Exception as e:
        # 에러 알림
        send_notification(sns_client, "포스팅 실패", str(e))
        raise e

def post_to_naver_blog(post_data):
    """
    Selenium을 사용한 네이버 블로그 포스팅
    (API 미제공으로 인한 대안)
    """
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        # 네이버 로그인 및 포스팅 로직
        driver.get('https://blog.naver.com')
        # ... 포스팅 로직 구현
        return "포스팅 성공"
    finally:
        driver.quit()

def send_notification(sns_client, subject, message):
    """
    SNS를 통한 알림 발송
    """
    topic_arn = 'arn:aws:sns:ap-northeast-2:123456789:blog-posting-alerts'
    sns_client.publish(
        TopicArn=topic_arn,
        Subject=subject,
        Message=message
    )
```

### CloudWatch 모니터링 설정
```python
# CloudWatch 로그 그룹 생성
aws logs create-log-group --log-group-name /aws/lambda/naver-blog-posting

# 메트릭 필터 설정 (에러 감지)
aws logs put-metric-filter \
    --log-group-name /aws/lambda/naver-blog-posting \
    --filter-name ErrorFilter \
    --filter-pattern "ERROR" \
    --metric-transformations \
        metricName=BlogPostingErrors,metricNamespace=CustomMetrics,metricValue=1
```

---

## 📚 상세 설명

### 배경 및 필요성

기존 온프레미스 서버의 문제점들을 해결하기 위해 AWS 서버리스 아키텍처로 전환하는 것이 필요했습니다.

**기존 시스템의 문제점**
- 복잡한 모놀리식 구조로 인한 유지보수 어려움
- 오류 발생 시 원인 파악의 어려움
- 확장성 부족 및 리소스 낭비
- 단일 장애점(SPOF) 존재

**서버리스 전환의 장점**
- 마이크로서비스 기반의 명확한 책임 분리
- 자동 스케일링 및 비용 최적화
- 강력한 모니터링 및 로깅 기능
- 높은 가용성 보장

### 아키텍처 상세 설계

#### 1. S3 기반 콘텐츠 관리
```json
{
  "포스팅 데이터 구조": {
    "title": "포스팅 제목",
    "content": "포스팅 내용",
    "tags": ["태그1", "태그2"],
    "category": "카테고리",
    "images": [
      {
        "url": "s3://bucket/images/image1.jpg",
        "caption": "이미지 설명"
      }
    ],
    "schedule": "2024-04-10T10:00:00Z",
    "status": "pending"
  }
}
```

#### 2. Lambda 함수 세부 구현
```python
import boto3
import json
from datetime import datetime
import logging

# 로깅 설정
logger = logging.getLogger()
logger.setLevel(logging.INFO)

class NaverBlogPoster:
    def __init__(self):
        self.s3_client = boto3.client('s3')
        self.sns_client = boto3.client('sns')
        self.cloudwatch = boto3.client('cloudwatch')
    
    def process_posting_request(self, event):
        """
        포스팅 요청 처리 메인 로직
        """
        try:
            # 1. S3에서 포스팅 데이터 조회
            post_data = self.get_post_data_from_s3(event)
            
            # 2. 네이버 블로그 포스팅 실행
            posting_result = self.execute_blog_posting(post_data)
            
            # 3. 결과 저장 및 상태 업데이트
            self.update_posting_status(event, 'completed', posting_result)
            
            # 4. 성공 메트릭 전송
            self.send_custom_metric('PostingSuccess', 1)
            
            # 5. 성공 알림
            self.send_notification('포스팅 성공', f"제목: {post_data['title']}")
            
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': '포스팅 완료',
                    'post_id': posting_result.get('post_id')
                })
            }
            
        except Exception as e:
            logger.error(f"포스팅 실패: {str(e)}")
            self.handle_error(event, e)
            raise
    
    def get_post_data_from_s3(self, event):
        """S3에서 포스팅 데이터 조회"""
        bucket = event['Records'][0]['s3']['bucket']['name']
        key = event['Records'][0]['s3']['object']['key']
        
        response = self.s3_client.get_object(Bucket=bucket, Key=key)
        return json.loads(response['Body'].read().decode('utf-8'))
    
    def execute_blog_posting(self, post_data):
        """
        네이버 블로그 포스팅 실행
        API 미제공으로 인한 Selenium 활용
        """
        # 네이버 블로그 포스팅 로직 구현
        # (실제 구현에서는 Selenium WebDriver 사용)
        pass
    
    def send_custom_metric(self, metric_name, value):
        """CloudWatch 커스텀 메트릭 전송"""
        self.cloudwatch.put_metric_data(
            Namespace='BlogPosting',
            MetricData=[
                {
                    'MetricName': metric_name,
                    'Value': value,
                    'Timestamp': datetime.utcnow()
                }
            ]
        )
    
    def handle_error(self, event, error):
        """에러 처리 및 알림"""
        self.update_posting_status(event, 'failed', str(error))
        self.send_custom_metric('PostingError', 1)
        self.send_notification('포스팅 실패', f"에러: {str(error)}")

def lambda_handler(event, context):
    poster = NaverBlogPoster()
    return poster.process_posting_request(event)
```

#### 3. CloudWatch 모니터링 설정
```python
# CloudWatch 대시보드 생성을 위한 설정
dashboard_config = {
    "widgets": [
        {
            "type": "metric",
            "properties": {
                "metrics": [
                    ["BlogPosting", "PostingSuccess"],
                    ["BlogPosting", "PostingError"]
                ],
                "period": 300,
                "stat": "Sum",
                "region": "ap-northeast-2",
                "title": "블로그 포스팅 현황"
            }
        },
        {
            "type": "log",
            "properties": {
                "query": "SOURCE '/aws/lambda/naver-blog-posting' | fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc | limit 20",
                "region": "ap-northeast-2",
                "title": "최근 에러 로그"
            }
        }
    ]
}
```

#### 4. SNS 알림 시스템
```python
class NotificationManager:
    def __init__(self):
        self.sns_client = boto3.client('sns')
        self.topic_arn = 'arn:aws:sns:ap-northeast-2:account:blog-alerts'
    
    def send_posting_success(self, post_data):
        """포스팅 성공 알림"""
        message = f"""
        ✅ 블로그 포스팅 성공
        
        제목: {post_data['title']}
        시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        태그: {', '.join(post_data.get('tags', []))}
        """
        
        self.sns_client.publish(
            TopicArn=self.topic_arn,
            Subject='[성공] 네이버 블로그 포스팅',
            Message=message
        )
    
    def send_error_alert(self, error_details):
        """에러 발생 알림"""
        message = f"""
        ❌ 블로그 포스팅 실패
        
        에러: {error_details['error']}
        시간: {error_details['timestamp']}
        함수: {error_details['function_name']}
        
        즉시 확인이 필요합니다.
        """
        
        self.sns_client.publish(
            TopicArn=self.topic_arn,
            Subject='[긴급] 네이버 블로그 포스팅 실패',
            Message=message
        )
```

### 실제 활용 사례

#### 배포 및 설정 자동화
```bash
#!/bin/bash
# deploy.sh - 자동 배포 스크립트

# 1. Lambda 함수 패키징
zip -r naver-blog-poster.zip lambda_function.py requirements.txt

# 2. Lambda 함수 업데이트
aws lambda update-function-code \
    --function-name naver-blog-posting \
    --zip-file fileb://naver-blog-poster.zip

# 3. 환경 변수 설정
aws lambda update-function-configuration \
    --function-name naver-blog-posting \
    --environment Variables="{
        S3_BUCKET=blog-content-bucket,
        SNS_TOPIC_ARN=arn:aws:sns:ap-northeast-2:account:blog-alerts,
        NAVER_ID=$NAVER_ID,
        NAVER_PW=$NAVER_PW
    }"

# 4. S3 트리거 설정
aws s3api put-bucket-notification-configuration \
    --bucket blog-content-bucket \
    --notification-configuration file://s3-trigger-config.json
```

#### 에러 처리 및 복구 전략
```python
class ErrorRecoveryManager:
    def __init__(self):
        self.max_retries = 3
        self.retry_delay = 60  # seconds
    
    def execute_with_retry(self, func, *args, **kwargs):
        """재시도 로직이 포함된 실행"""
        for attempt in range(self.max_retries):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                if attempt == self.max_retries - 1:
                    # 최종 실패 시 DLQ로 이동
                    self.send_to_dlq(args, kwargs, str(e))
                    raise
                else:
                    logger.warning(f"시도 {attempt + 1} 실패, {self.retry_delay}초 후 재시도")
                    time.sleep(self.retry_delay)
    
    def send_to_dlq(self, args, kwargs, error):
        """Dead Letter Queue로 실패한 작업 전송"""
        sqs = boto3.client('sqs')
        queue_url = 'https://sqs.ap-northeast-2.amazonaws.com/account/blog-posting-dlq'
        
        message = {
            'args': args,
            'kwargs': kwargs,
            'error': error,
            'timestamp': datetime.utcnow().isoformat(),
            'retry_count': self.max_retries
        }
        
        sqs.send_message(
            QueueUrl=queue_url,
            MessageBody=json.dumps(message)
        )
```

### 네이버 API 제한사항 해결 방안

네이버 블로그 공식 API가 제공되지 않는 상황에서의 대안적 접근 방법들:

#### 1. Selenium을 활용한 자동화 (권장)
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class NaverBlogAutomation:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        self.driver = webdriver.Chrome(options=chrome_options)
    
    def login_and_post(self, credentials, post_data):
        """네이버 로그인 및 포스팅"""
        try:
            # 네이버 로그인
            self.driver.get('https://nid.naver.com/nidlogin.login')
            
            # 로그인 폼 작성
            id_input = self.driver.find_element(By.ID, 'id')
            pw_input = self.driver.find_element(By.ID, 'pw')
            
            id_input.send_keys(credentials['id'])
            pw_input.send_keys(credentials['pw'])
            
            # 로그인 버튼 클릭
            login_btn = self.driver.find_element(By.ID, 'log.login')
            login_btn.click()
            
            # 블로그 작성 페이지 이동
            self.driver.get('https://blog.naver.com/PostWriteForm.naver')
            
            # 포스팅 내용 작성
            self.write_post_content(post_data)
            
            # 발행
            self.publish_post()
            
            return {'status': 'success', 'post_url': self.get_post_url()}
            
        finally:
            self.driver.quit()
```

#### 2. RSS/Atom 피드 연동 활용
```python
def create_rss_feed(posts):
    """RSS 피드 생성으로 간접 연동"""
    rss_content = f"""<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>자동 포스팅 피드</title>
            <description>AWS Lambda 기반 자동 포스팅</description>
            <link>https://your-domain.com</link>
    """
    
    for post in posts:
        rss_content += f"""
            <item>
                <title>{post['title']}</title>
                <description><![CDATA[{post['content']}]]></description>
                <pubDate>{post['pub_date']}</pubDate>
                <guid>{post['id']}</guid>
            </item>
        """
    
    rss_content += """
        </channel>
    </rss>
    """
    
    return rss_content
```

## 결론

AWS 서버리스 아키텍처를 활용한 네이버 블로그 자동 포스팅 시스템은 기존 온프레미스 환경의 복잡성과 오류를 해결하는 효과적인 솔루션입니다. 

**핵심 성과**
- 마이크로서비스 기반의 명확한 책임 분리로 유지보수성 향상
- CloudWatch를 통한 실시간 모니터링으로 오류 추적 용이
- SNS 기반 알림 시스템으로 즉시 대응 가능
- 자동 스케일링으로 비용 최적화 달성

**다음 단계 제안**
1. **확장 계획**: 다른 블로그 플랫폼(티스토리, 브런치 등) 지원 추가
2. **AI 활용**: ChatGPT API 연동으로 자동 콘텐츠 생성 기능 도입
3. **분석 강화**: 포스팅 성과 분석을 위한 데이터 파이프라인 구축
4. **보안 강화**: AWS KMS를 활용한 자격 증명 암호화 적용

네이버 API 제한사항에도 불구하고 Selenium과 AWS 서버리스 기술을 조합하여 안정적이고 확장 가능한 자동 포스팅 시스템을 구축할 수 있습니다.
