---
title: Node.js笔记(一)
date: 2019-10-02T19:43:01+08:00
categories: note
tags:
  - NodeJS
draft: false
---

今天初步了解了 http、fs、querystring、url 四个包以及本地服务器部署的内容，记录一下。

### 引入包

首先需要的包要下载，使用 npm 工具，（cnpm 更快也行），npm i module 安装。

在该文件下目录下会自动生成 node_modules 文件夹，里面包含了很多模块。

<!--more-->

```javascript
const module = require('module')
```

### http 服务器部署

首先需要创建一个服务器。

http.createServer()，参数是一个回调函数，接收请求并给出反馈。并启动 listen 监听，参数给的数字是本地服务器端口。一般不冲突就可以了。

```javascript
http.createServer((req, res) => {}).listen(8080)
```

### 启动服务器

在该目录的命令行下输入 node filename.js 即可

若直接退出，可能是没有启动监听函数 listen

### fs 文件系统

fs = filesystem 即 node 下的文件读写操作

需要引入 fs 模块。常用两个操作

fs.writeFile(path,data,err=>{})

fs.readFile(path,(err,data)=>{})

err 是抛出的错误，针对错误给出相应的处理。

值得注意的是，node 下文件路径如果是同级目录，前面得加上”./“。

如果和 http 协作，根据 request 来读取内容的话，比如下面的代码：

```javascript
http.createServer(function(req,res){
 console.log(req.url);
 fs.readFile(`www${req.url}`,(err,buffer)=>{
  if(err){
   res.writeHeader(404);//写入错误代码
   res.write('Not Found');//写出错误提示
   res.end();
  }else{
   res.write(buffer);//没有异常则写出内容
   res.end();
  }
 })
}.listen(8080);
```

### http 的两种请求

#### Get

get 请求得到头部信息，比如提交表单后在 url 中可以看到，url?username=xxxxx&password=xxxxx

这里可以用 querystring 模块来处理

```javascript
http.createServer(function(req,res){
 let [url,query] = req.url.split('?');//由？分割开两部分内容
 let get = querystring.parse(query);
 console.log(url,get);
}.listen(8080);
```

也可以用 url 模块

```javascript
http.createServer(function(req,res){
 let {pathname,query} = url.parse(req.url,true);
 console.log(pathname,query);
}.listen(8080);
```

#### Post

post 请求 body 内容，是分段传输过来的。可以同一个数组来存储数据。

还是可以用上面两个模块来实现。

```javascript
http.createServer(function(req,res){
    let arr = [];
    req.on('data',buffer=>{
      arr.push(buffer);
    });
    req.on('end',()=>{
      let buffer = Buffer.concat(arr);
      let post = querystring.parse(buffer.toString());
      console.log(post);
    });
}.listen(8080);
```

```javascript
http.createServer(function(req,res){
    let arr=[];
    req.on('data',buffer=>{
      arr.push(buffer);
    });
    req.on('end',()=>{
        let buffer = Buffer.concat(arr);
        console.log(buffer.toString());
      });
}.listen(8080);
```

### demo

下面是一个运用上面几点实现的小例子

首先是做一个表单，在 html 文档中写入表单,method 可以改成 get 或者 post，url 后面的/aaa 也可以改掉。

```html
<form class="" action="http://localhost:8080/aaa" method="post">
  用户：<input type="text" name="username" value="" /> 密码：<input
    type="password"
    name="password"
  />
  <input type="submit" name="" value="提交" />
</form>
```

再写一个 server.js

```javascript
const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')

http
  .createServer((req, res) => {
    let path = '',
      get = {},
      post = {}

    if (req.method == 'GET') {
      let { pathname, query } = url.parse(req.url, true)

      path = pathname
      get = query
      complete(0)
    } else if (req.method == 'POST') {
      path = req.url
      let arr = []
      req.on('data', (buffer) => {
        arr.push(buffer)
      })
      req.on('end', () => {
        let buffer = Buffer.concat(arr)
        post = querystring.parse(buffer.toString())
        complete()
      })
    }
    function complete() {
      console.log(path, get, post)
    }
  })
  .listen(8080)
```

处理的只是最简单的请求以及提供的表单内容输出。
