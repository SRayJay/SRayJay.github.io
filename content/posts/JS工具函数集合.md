---
title: "JS工具函数集合"
date: 2021-11-10T21:22:10+08:00
categories: note
tag: JavaScript
draft: true
---

1. Url参数提取

   <!--more-->
   
   ```javascript
   // www.baidu.com?id=23&op=24&gr=32 => {id:23,op:2424,gr:32}
   // 提取键值对成对象
   function UrlParamHash(url) {
     var params = [],
       h
     var hash = url.slice(url.indexOf('?') + 1).split('&')
     for (var i = 0; i < hash.length; i++) {
       h = hash[i].split('=')
       params[h[0]] = h[1]
     }
    return params
   }
   ```
   
   2.

