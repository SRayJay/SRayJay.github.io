---
title: FlutterNote1
date: 2019-05-03T10:24:09+08:00
categories: note
tags: Flutter
draft: false
---

# Flutter 基本结构

以一个 helloworld 程序展示一个 flutter 应用的基本结构。

<!--more-->

```dart
    import 'package:flutter/material.dart';
    void main() => runApp(Myapp());
    class Myapp extends StatelessWidget{
        @override
        Widget build(BuildContext context) {
            return MaterialApp(
                title: 'Hello World',
                home: Scaffold(
                    appBar: new AppBar(
                    title: Text('Hello World'),
                    ),
                body: Center(
                    child: Text('Hello Flutter!',style: TextStyle(fontSize: 25.0),),
                    )
                ),
            );
        }
    }
```

# Flutter 常用控件

## 1.Text 控件

textAlign：TextAlign.center 控制文本居中显示，当然还有 left、right、start、end 等属性值

maxLines：该文本最多显示成几行，填数字即可。溢出部分不显示。

overflow：文本溢出处理，属性值 TetxOverflow.(clip)(fade)(ellipsis),分别是切除，渐变，省略

**style**：TextStyle()内包含其他属性。fontsize：25.0(要用浮点数)。color:Color.fromARGB(a,r,g,b)。

decoration:TextDecoration.underline 代表文本加下划线。

decorationstyle：TextDecorationStyle.solid 代表装饰是实线。

## 2.Container 控件

相当于 html 里的 div，就是一个块儿。

alignment:Alignment.center--对齐格式，点后面也可以带两个单词，比如 bottomleft，即底部靠左，也可以用坐标(x,y)表示。

对于一个 div，肯定有 width、height、color 等属性，其属性值是浮点数，得带小数点。

padding 和 margin： EdgeInsets.all(10.0)代表上下左右四个方向都有 10.0 的 padding 或者 margin。当然用方法.fromLTRB 带四个参数更随心所欲。

decoration: new BoxDecoration(),内部加其他属性。比如 gradient(渐变色): LinearGradient(colors:[Colors.blue,colors.green])。注意渐变色与 color 冲突。

还能加 border:Border.all(width:5.0,color:Colors.red),代表四个方向的边框线。

## 3.Image 控件

new 一个 Image 控件，有四种类型，分别是 asset（本地资源）、file（本地图片）、memory、network（网络图片）。

加入图片后还可以用 fit:BoxFit 选择填充方法。

|     属性名称     |                          样式                          |
| :--------------: | :----------------------------------------------------: |
|  BoxFit.contain  |            全图居中显示但不充满，显示原比例            |
|   BoxFit.fill    |            全图显示且填充满，图片可能会拉伸            |
|   BoxFit.cover   |         图片可能拉伸，也可能裁剪，但是充满容器         |
| BoxFit.fitHeight |            图片可能拉伸，可能裁剪，高度充满            |
| BoxFit.fitWidth  |            图片可能拉伸，可能裁剪，宽度充满            |
| BoxFit.scaleDown | 效果和 contain 差不多， 但是只能缩小图片，不能放大图片 |

也可以再加入颜色，并用 colorBlendMode:BlendMode.XXX 来混色。

repeat：ImageRepeat 设置图片重复填充的方式。

## 4.ListView 控件

new 一个 ListView 列表控件

```dart
body:new ListView(
    children: <Widget>[
        new ListTile(
            leading:new Icon(Icons.XXX),
            title:new Text('XXX')
        )
        ......
    ]
)
```

作为列表项的组件也可以不是 icon，而是图片，就要用到 image 了。

### 横向列表

在 listview 中 scrollDirection: Axis.horizontal，代表横向列表。然后每个列表部件只设置宽度，可以左右拉动。如果是纵向列表，那就是 Axis.vertical，每个部件设置高度，可以下拉。

### 动态列表

在 runApp()中声明列表项，如 items:List(),中间加数字可以固定列表长度。items:List`<string>`()确定了项的类型，items:[1,2,3]直接赋值。

还有 items:List`<string>`.generate(1000,(i)=>"Items &i")用 generate 函数，相当于数组，i 则是下标。引号内容是每一项的格式，&号作替换符。

举个例子：

```dart
import 'package:flutter/material.dart';
void main() => runApp(Myapp(
  items:List<String>.generate(1000, (i)=>"第$i项：")
));
class Myapp extends StatelessWidget{
  final List<String> items;
//  接收items参数
  Myapp({Key key,@required this.items}):super(key:key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hello World',
      home: Scaffold(
        appBar: new AppBar(
          title: Text('动态列表'),
        ),
        body: new ListView.builder(
          itemCount: items.length,//得到传递过来的参数的长度
          itemBuilder: (context,index){
            return new ListTile(
              title: Text('${items[index]}'),
            );
          },
        ),
      ),
    );
  }
}
```

### 网格列表

以文本表示的网格列表，换成 Image 控件可以显示图片。

```dart
body: GridView.count(
    padding:EdgeInsets.all(30.0),
    crossAxisSpacing:20.0,//网格之间的间距
    crossAxisCount:3 //每行显示的列表项个数
    children:<Widget>[
        Text:"..."
        Text:"..."
        ...
    ]
)
```

另一种网格列表的写法:

```dart
body: GridView(
    gridDelegate:SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount:3,
        mainAxisSpacing:2.0,//纵向列表项间距
        CrossAxisSpacing:2.0,//横向列表项间距
        childAspectRatio:1.0,//宽高比
    )，
    children：<Widget>[
        new Image.network(src),
        ....
        ....
    ],
)
```
