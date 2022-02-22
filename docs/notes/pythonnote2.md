---
title: Python爬虫笔记
date: 2019-01-18T20:44:23+08:00
categories: note
tags:
  - Python
draft: false
---

爬虫分为四个步骤，首先获取数据，然后解析数据，再提取数据，最后是存储数据

<!--more-->

![](https://raw.githubusercontent.com/AthleticsNero/AthleticsNero.github.io/master/2019/01/18/pythonnote2/pic1.png)

```python
import requests #首先引入requests库
res=requests.get('URL')#向服务器发送了一个请求,把服务器响应结果赋给res，为response对象
res.encoding='gbk' #定义response对象的编码，一般会自己判断不必写，如果错误则补上正确的码表
pic=res.content #获取二进制数据
note=res.text #获取字符串数据
print(res.status_code)检查是否请求成功，成功则为200
k=open('note.txt','a+') #将res.text内容写在note.txt文件末尾
m=open('pic.jpg'或'music.mp3','wb') #以二进制形式生成图片或音频
k.write(pic\note)
k.close() #基本文件读写操作
```

以上是一般的获取数据的方法，接下来是用 BeautifulSoup 解析数据，从源码入手爬取数据。

```python
import requests
from bs4 import BeautifulSoup #引入bs库
res=requests.get('URL')
soup=BeautifulSoup('字符串数据,可以是res.text'，'html.parser') #解析数据，html.parser是解析器
```

beautifulsoup 提取数据的两个方法：

find()和 find_all(),find()找到满足条件的首个数据，参数可以是标签和属性，find_all 则是所有符合的数据，生成的自然是一个列表

**属性如果是 class，则要在 class 后面加个\_防止被编译器识别为关键字。**

Tag 对象，提取出的单个数据的类是 Tag，其主要用法有三种：

1. tag.find()用来提取 tag 中的 tag，由父级标签提取子级标签
2. tag.text 提取 tag 中的文字，可以忽略标签信息
3. tag['属性名']提取 tag 中这个属性的值，不过只能仅限这个 tag 的标签，不包含内部标签
