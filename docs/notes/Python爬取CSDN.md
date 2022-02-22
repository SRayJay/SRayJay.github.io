---
title: Python爬取用户所有博客
date: 2019-09-11T12:51:44+08:00
categories: note
tags:
  - Python
draft: false
---

CSDN 的爬取比较简单，没有知乎那种反爬虫需要 ip 代理模拟登录那么麻烦。在确认一个用户之后，找到目录的 url，再通过 css 选择器找到每一篇博客的 url 再分别保存为 markdown 格式。

<!--more-->

```python
import requests
import parsel
import tomd
import re
```

先导入需要用到的包。第一次用到 tomd，用于把 html 格式文件转化成为 markdown 格式，但仍有部分标签保留，如`<a>`和`<br>`，re 库挑选出这两种保留标签并分别替换为空字符串和换行符。

```python
def download_url(article_url):
    response = requests.get(article_url)
    html = response.text
    sel = parsel.Selector(html)
    title = sel.css('.title-article::text').get()
    content = sel.css('article').get()
    text = tomd.Tomd(content).markdown
    text = re.sub('<a.*?a>', "", text)
    text = re.sub('<br>', "\n", text)
    # print(title)
    # print(text)
    with open(title + ".md", mode='w', encoding='utf-8') as f:
        f.write("#" + title)
        f.write(text)

def download_user():
    page = 1
    while True:
        user_name = 'fei347795790'
        index_url = 'https://blog.csdn.net/{}/article/list/{}?'.format(user_name, page)
        response = requests.get(index_url)
        html = response.text
        sel = parsel.Selector(html)
        urls = sel.css('.article-list a::attr(href)').getall()
        if not urls:
            break;
        print("第", page, "页")
        for url in urls[2:]:
            download_url(url)
            print(url)
        page = page + 1

download_user()

```
