---
layout: post
title: "Amazon Cognito JavaScript 연동 시 피해야 할 치명적인 실수"
date: 2023-03-18 10:00:00 +0900
categories: [AWS, Authentication]
tags: [Amazon Cognito, JavaScript, Authentication, AWS, 인증, 오류해결]
author: Kevin Park
excerpt: "Amazon Cognito를 JavaScript로 연동할 때 가장 흔하게 발생하는 '클라이언트 보안키' 관련 오류와 해결 방법을 알아봅니다."
---

Amazon Cognito는 AWS에서 제공하는 강력한 사용자 인증 및 관리 서비스입니다. 특히 JavaScript를 사용한 프론트엔드 연동은 가장 일반적이고 쉬운 방법 중 하나입니다. 하지만 많은 개발자들이 처음 Cognito를 설정할 때 놓치기 쉬운 중요한 설정이 있습니다.

## 🚨 가장 흔한 실수: 클라이언트 보안키 생성

Amazon Cognito를 JavaScript로 연동할 때 가장 흔하게 실수하는 것은 **"클라이언트 보안키 생성"** 옵션을 그대로 두는 것입니다.

### 왜 이 설정이 문제가 될까요?

JavaScript는 브라우저에서 실행되는 클라이언트 사이드 언어입니다. 브라우저에서는 소스 코드가 그대로 노출되기 때문에, 보안키를 안전하게 보관할 수 없습니다. 따라서 JavaScript 애플리케이션에서는 클라이언트 보안키를 사용하지 않아야 합니다.

## ⚠️ 설정하지 않으면 발생하는 오류

만약 클라이언트 보안키 생성 옵션을 해제하지 않으면, 다음과 같은 오류 메시지가 표시됩니다:

```
Unable to verify secret hash for client in Amazon Cognito Userpools
```

이 오류는 Cognito가 클라이언트 보안키를 기대하고 있지만, JavaScript 코드에서는 이를 제공할 수 없기 때문에 발생합니다.

## ✅ 올바른 설정 방법

### 1. 앱 클라이언트 생성 시 설정

Amazon Cognito 콘솔에서 앱 클라이언트를 생성할 때:

1. **User Pool** 선택
2. **App clients** 메뉴로 이동
3. **Add an app client** 클릭
4. 📋 **중요**: **"Generate client secret"** 체크박스를 **해제**

![Cognito 클라이언트 설정](/assets/images/posts/cognito-client-settings.png)

### 2. 주의사항

⚠️ **이 설정은 앱 클라이언트 생성 시에만 변경할 수 있습니다!**

앱 클라이언트를 이미 생성한 후에는 클라이언트 보안키 설정을 변경할 수 없습니다. 만약 실수로 클라이언트 보안키를 생성한 채로 앱 클라이언트를 만들었다면, 새로운 앱 클라이언트를 다시 생성해야 합니다.

## 💻 JavaScript 코드 예시

올바르게 설정된 Cognito 앱 클라이언트를 사용하는 JavaScript 코드 예시입니다:

```javascript
import { CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

// User Pool 설정
const poolData = {
    UserPoolId: 'us-west-2_xxxxxxxxx', // User Pool ID
    ClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx' // 클라이언트 보안키가 없는 App Client ID
};

const userPool = new CognitoUserPool(poolData);

// 사용자 등록 예시
function signUp(username, password, email) {
    const attributeList = [];
    
    const dataEmail = {
        Name: 'email',
        Value: email
    };
    
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);
    
    userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
            console.error('Sign up error:', err);
            return;
        }
        
        console.log('User registered successfully:', result.user);
    });
}
```

## 🔧 트러블슈팅 체크리스트

만약 여전히 오류가 발생한다면 다음 사항들을 확인해보세요:

### 1. 앱 클라이언트 설정 확인

- [ ] 클라이언트 보안키 생성이 **해제**되어 있는가?
- [ ] 올바른 Client ID를 사용하고 있는가?

### 2. User Pool 설정 확인

- [ ] User Pool ID가 정확한가?
- [ ] 리전 설정이 올바른가?

### 3. 권한 설정 확인

- [ ] 앱 클라이언트에 필요한 인증 플로우가 활성화되어 있는가?
- [ ] 적절한 OAuth 스코프가 설정되어 있는가?

## 📚 추가 리소스

- [Amazon Cognito 공식 문서](https://docs.aws.amazon.com/cognito/)
- [Amazon Cognito Identity SDK for JavaScript](https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js)

## 🎯 마무리

Amazon Cognito를 JavaScript로 연동할 때는 **클라이언트 보안키 생성 옵션을 반드시 해제**해야 합니다. 이는 보안상의 이유뿐만 아니라 올바른 동작을 위해서도 필수적입니다.

작은 설정 하나가 큰 차이를 만들 수 있으니, Cognito 설정 시 꼼꼼히 확인하시기 바랍니다!

---

💡 **도움이 되셨나요?** 이 포스트가 유용했다면 공유해주세요! Amazon Cognito 관련해서 더 궁금한 점이 있으시면 댓글로 남겨주세요.
