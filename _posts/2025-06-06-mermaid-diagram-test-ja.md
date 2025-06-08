---
layout: post
title: "Mermaid ダイアグラムテスト投稿"
date: 2025-06-06 23:00:00 +0900
categories: [Test, Mermaid]
tags: [mermaid, diagram, flowchart, test]
author: "Kevin Park"
excerpt: "サイトに追加されたMermaidダイアグラム機能をテストするための投稿です。"
mermaid: true
lang: ja
---

# Mermaid ダイアグラム機能テスト

この投稿は新しく追加されたMermaidダイアグラム機能をテストするためのサンプル投稿です。

## 📊 フローチャート例

```mermaid
graph TD
    A[プロジェクト開始] --> B{要件分析}
    B -->|明確| C[設計フェーズ]
    B -->|不明確| D[追加調査]
    D --> B
    C --> E[開発フェーズ]
    E --> F[テスト]
    F --> G{テスト合格?}
    G -->|合格| H[デプロイ]
    G -->|失敗| E
    H --> I[運用・保守]
```

## 🔄 シーケンス図

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant F as フロントエンド
    participant B as バックエンド
    participant D as データベース

    U->>F: ログイン要求
    F->>B: 認証情報送信
    B->>D: ユーザー情報照会
    D-->>B: ユーザーデータ返却
    B-->>F: 認証トークン発行
    F-->>U: ログイン完了
```

## 📈 ガントチャート

```mermaid
gantt
    title プロジェクトスケジュール
    dateFormat  YYYY-MM-DD
    section 企画
    要件分析           :done, planning, 2025-01-01, 2025-01-10
    設計              :done, design, 2025-01-05, 2025-01-15
    section 開発
    フロントエンド開発  :active, frontend, 2025-01-10, 2025-02-10
    バックエンド開発    :backend, 2025-01-15, 2025-02-15
    section テスト
    単体テスト         :testing, 2025-02-01, 2025-02-20
    統合テスト         :integration, 2025-02-15, 2025-02-25
```

## 🏗️ クラス図

```mermaid
classDiagram
    class User
    User : +String name
    User : +String email
    User : +Date createdAt
    User : +login()
    User : +logout()
    
    class Post
    Post : +String title
    Post : +String content
    Post : +Date publishedAt
    Post : +User author
    Post : +publish()
    Post : +draft()
    
    class Comment
    Comment : +String content
    Comment : +Date createdAt
    Comment : +User author
    Comment : +Post post
    Comment : +create()
    Comment : +delete()
    
    User --> Post
    User --> Comment
    Post --> Comment
```

## 🔢 円グラフ

```mermaid
pie title 技術スタック使用率
    "JavaScript" : 35
    "Python" : 25
    "Java" : 20
    "TypeScript" : 15
    "その他" : 5
```

## 📋 状態図

```mermaid
stateDiagram-v2
    [*] --> 下書き
    下書き --> レビュー中 : 提出
    レビュー中 --> 承認済み : 承認
    レビュー中 --> 修正必要 : 却下
    修正必要 --> 下書き : 修正
    承認済み --> 公開済み : 公開
    公開済み --> アーカイブ済み : アーカイブ
    アーカイブ済み --> [*]
```

## 🌐 ER図

```mermaid
erDiagram
    USER ||--o{ POST : creates
    USER ||--o{ COMMENT : writes
    POST ||--o{ COMMENT : has
    POST }|--|| CATEGORY : belongs_to
    
    USER {
        int id PK
        string name
        string email UK
        datetime created_at
    }
    
    POST {
        int id PK
        string title
        text content
        int user_id FK
        int category_id FK
        datetime published_at
    }
    
    COMMENT {
        int id PK
        text content
        int user_id FK
        int post_id FK
        datetime created_at
    }
    
    CATEGORY {
        int id PK
        string name UK
        string description
    }
```

## ✅ 使用方法ガイド

投稿でMermaidダイアグラムを使用するには：

1. **Front Matterに設定を追加：**
   ```yaml
   ---
   layout: post
   title: "投稿タイトル"
   mermaid: true  # この行を追加！
   ---
   ```

2. **Markdownで使用：**
   ````markdown
   ```mermaid
   graph TD
       A[開始] --> B[終了]
   ```
   ````

3. **サポートされているダイアグラムタイプ：**
   - フローチャート (`graph`, `flowchart`)
   - シーケンス図 (`sequenceDiagram`)
   - クラス図 (`classDiagram`)
   - 状態図 (`stateDiagram`)
   - ER図 (`erDiagram`)
   - ガントチャート (`gantt`)
   - 円グラフ (`pie`)
   - その他多数...

Mermaid記法の詳細については、[公式ドキュメント](https://mermaid.js.org/)をご参照ください！