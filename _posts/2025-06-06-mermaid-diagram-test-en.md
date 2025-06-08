---
layout: post
title: "Mermaid Diagram Test Post"
date: 2025-06-06 23:00:00 +0900
categories: [Test, Mermaid]
tags: [mermaid, diagram, flowchart, test]
author: "Kevin Park"
excerpt: "A test post to verify the Mermaid diagram functionality added to the site."
mermaid: true
lang: en
---

# Mermaid Diagram Functionality Test

This post is a sample to test the newly added Mermaid diagram functionality.

## 📊 Flowchart Example

```mermaid
graph TD
    A[Project Start] --> B{Requirements Analysis}
    B -->|Clear| C[Design Phase]
    B -->|Unclear| D[Additional Research]
    D --> B
    C --> E[Development Phase]
    E --> F[Testing]
    F --> G{Test Passed?}
    G -->|Pass| H[Deployment]
    G -->|Fail| E
    H --> I[Operations & Maintenance]
```

## 🔄 Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database

    U->>F: Login Request
    F->>B: Send Authentication Info
    B->>D: Query User Info
    D-->>B: Return User Data
    B-->>F: Issue Auth Token
    F-->>U: Login Complete
```

## 📈 Gantt Chart

```mermaid
gantt
    title Project Schedule
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements Analysis :done, planning, 2025-01-01, 2025-01-10
    Design                :done, design, 2025-01-05, 2025-01-15
    section Development
    Frontend Development  :active, frontend, 2025-01-10, 2025-02-10
    Backend Development   :backend, 2025-01-15, 2025-02-15
    section Testing
    Unit Testing         :testing, 2025-02-01, 2025-02-20
    Integration Testing  :integration, 2025-02-15, 2025-02-25
```

## 🏗️ Class Diagram

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

## 🔢 Pie Chart

```mermaid
pie title Technology Stack Usage
    "JavaScript" : 35
    "Python" : 25
    "Java" : 20
    "TypeScript" : 15
    "Others" : 5
```

## 📋 State Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> UnderReview : Submit
    UnderReview --> Approved : Approve
    UnderReview --> NeedsRevision : Reject
    NeedsRevision --> Draft : Revise
    Approved --> Published : Publish
    Published --> Archived : Archive
    Archived --> [*]
```

## 🌐 ER Diagram

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

## ✅ Usage Guide

To use Mermaid diagrams in your posts:

1. **Add configuration to Front Matter:**
   ```yaml
   ---
   layout: post
   title: "Post Title"
   mermaid: true  # Add this line!
   ---
   ```

2. **Use in Markdown:**
   ````markdown
   ```mermaid
   graph TD
       A[Start] --> B[End]
   ```
   ````

3. **Supported Diagram Types:**
   - Flowchart (`graph`, `flowchart`)
   - Sequence Diagram (`sequenceDiagram`)
   - Class Diagram (`classDiagram`)
   - State Diagram (`stateDiagram`)
   - ER Diagram (`erDiagram`)
   - Gantt Chart (`gantt`)
   - Pie Chart (`pie`)
   - And many more...

For detailed information about Mermaid syntax, please refer to the [official documentation](https://mermaid.js.org/)!