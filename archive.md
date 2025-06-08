---
layout: page
title: 아카이브
subtitle: 모든 포스트를 한눈에 보기
permalink: /archive/
---

<div class="archive-container">
  {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
  
  {% for year in posts_by_year %}
    {% comment %} 현재 언어의 포스트만 필터링 {% endcomment %}
    {% assign current_lang = page.lang | default: site.default_lang %}
    {% assign korean_posts = year.items | where_exp: "item", "item.lang == nil or item.lang == current_lang" %}
    
    {% if korean_posts.size > 0 %}
      <div class="archive-year">
        <h2 class="year-title">{{ year.name }}년</h2>
        <div class="year-stats">{{ korean_posts | size }}개 포스트</div>
        
        <div class="posts-list">
          {% for post in korean_posts %}
            <article class="archive-post">
              <div class="post-date">
                {{ post.date | date: "%m.%d" }}
              </div>
              <div class="post-info">
                <h3 class="post-title">
                  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h3>
                {% if post.excerpt %}
                  <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
                {% endif %}
                {% if post.tags %}
                  <div class="post-tags">
                    {% for tag in post.tags limit: 3 %}
                      <span class="tag">{{ tag }}</span>
                    {% endfor %}
                  </div>
                {% endif %}
              </div>
            </article>
          {% endfor %}
        </div>
      </div>
    {% endif %}
  {% endfor %}
</div>

<style>
.archive-container {
  max-width: 800px;
  margin: 0 auto;
}

.archive-year {
  margin-bottom: 3rem;
}

.year-title {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.year-stats {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.posts-list {
  border-left: 2px solid var(--border);
  padding-left: 2rem;
  position: relative;
}

.archive-post {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
}

.archive-post::before {
  content: '';
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
}

.post-date {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.9rem;
  min-width: 40px;
  margin-top: 0.2rem;
}

.post-info {
  flex: 1;
}

.post-title {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.post-title a {
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition);
}

.post-title a:hover {
  color: var(--primary-color);
}

.post-excerpt {
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--surface);
  color: var(--text-secondary);
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  border: 1px solid var(--border);
}

@media (max-width: 768px) {
  .archive-post {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .post-date {
    min-width: auto;
  }
  
  .posts-list {
    padding-left: 1rem;
  }
  
  .archive-post::before {
    left: -1.5rem;
  }
}
</style>
