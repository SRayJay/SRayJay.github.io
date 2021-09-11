---
title: FlutterNote3
date: 2019-05-19T14:28:33+08:00
categories: note
tags:
  - Flutter
draft: false
---

# Flutter 导航

## 父子级导航页面的跳转

因为 app 中包含不止一个界面，void main()后面不能用箭头函数，需要设定首页。

对于每个页面，用 class 分别定义，页面作为 home，return 的是 Scaffold 类，当然也可以是其他。在按钮上添加跳转到另一个页面的功能。

<!--more-->

另一个页面作为子页面，返回只要用到一个按钮的 pop 即可，不过左上角也有箭头返回。

```dart
import 'package:flutter/material.dart';
void main(){
  runApp(MaterialApp(
    title:"nav",
    home:FirstScreen()
  ));
}
class FirstScreen extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold( //FirstScreen作为home中的页面，其类型是Scaffold
                      // 于是直接return一个
      appBar: AppBar(title: Text('导航页面'),),
      body: Center(
        child: RaisedButton(
          child: Text('点击查看'),
          onPressed: (){
            Navigator.push(context, MaterialPageRoute(
                builder:(context)=>SecondScreen()
            ));
          }
        ),
      ),
    );
  }
}
class SecondScreen extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('srj'),),
      body: Center(
        child: RaisedButton(
            child: Text('返回'),
            onPressed:(){
              Navigator.pop(context);
            }
        ),
      ),
    );
  }
}
```

这是一个基本的父子级界面的跳转。

##
