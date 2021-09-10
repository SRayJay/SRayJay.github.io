---
title: FlutterNote2
date: 2019-05-13T15:10:17+08:00
categories: note
tags: Flutter
draft: false
---

# Flutter 布局

## 水平布局

body:Row()中间内容比如说要放上按钮，直接 new 一个 RaisedButton，它的宽高是固定的，如果在它外面套上一个 Expanded(),子元素再放按钮，就能达到自适应长度的效果，不至于边上漏出一块白的那么丑。

<!--more-->

注意 expanded 与不加 expanded 的混合使用。

## 垂直布局

body:Column()放入内容与水平同理，值得注意的是：**垂直布局中 mainAxisAlign 即主轴对齐方式，主轴指的是垂直方向，而 crossAxisAlign 副轴代表水平，水平布局同理。**

## 层叠布局

想在一个东西上放上另一个东西，比如一个图片上放上一个文本，要用到层叠布局。

```dart
import 'package:flutter/material.dart';
void main()=>runApp(Myapp());
class Myapp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    var stack = Stack(                            //定义一个stack
      alignment: const FractionalOffset(0.5, 1.0),//子元素对齐方式，取值0-1。
      children: <Widget>[
        new CircleAvatar(                         //这里用到一张圆形图片
          backgroundImage: NetworkImage(url),
          radius: 100.0,                          //圆角
        ),
        new Container(
          decoration: new BoxDecoration(
            color: Colors.lightBlue,
          ),
          padding: EdgeInsets.all(5.0),
          child: Text('....'),
        ),
        new Positioned(
            top:10.0,
            left:50.0,
            child:Text('...'),
        )                                        //定位控件
      ],
    );
    return MaterialApp(
      title: 'Row Widget',
      home: Scaffold(
        appBar: new AppBar(
          title: Text('垂直方向布局'),
        ),
        body:Center(
            child: stack,                           //变量调用
        )
      )
    );
  }
}
```

上面是在一个圆形图片上放两个文本的基本层叠示例。也用到了 positioned 定位一个文本，两种方法。

## 卡片布局

类似于通讯簿一样的布局（使用垂直布局时），前面的 icon 图标，配上主副标题。

在子类 listTile 中，title 作主标题，然后 subtitle 作副标题在它下面，leading 作这一条前面的内容，可以是图标。

```dart
ListTile(
            title: Text(
                'XXXX',
              style: TextStyle(fontWeight:FontWeight.w500),
            ),
            subtitle: Text('8888'),
            leading: new Icon(Icons.account_box,color: Colors.lightBlue),
          ),
```

另外卡片布局两条卡片之间可以 new 一个 Divider()作为分割线。
