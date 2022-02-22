---
title: html超文本标记语言笔记
date: 2019-01-04T10:44:21+08:00
categories: note
tags:
  - HTML
draft: false
---

## 一、html 常用标签

`<html> --网页开始 最后要有结束标签 </html>`

**结束标签一定不能忘了**

`<head>` --网页头标签，里面可以加 title 标签修改网页的 title，也可以用`<meta charset="utf-8"></meta>`定义网页解码使用的码表。

`<body> --网页主体 </body>`

<!--more-->

`<h1> 这是一个标题 <h1>` 共有大小六个标题格式，h1 to h6

`<a href="http://www.w3school.com.cn">This is a link</a>` --链接的表示。a 标签不能嵌套 a 标签。

`<img src="w3school.jpg" width="104" height="142" />` --图像的表示

`<p>This is a paragraph.</p>` --段落标识。p 标签中不能套块级元素，否则会被截断成两个 p 标签。

`<br />` --换行符

当显示页面时，浏览器会移除源代码中多余的空格和空行。所有连续的空格或空行都会被算作一个空格。需要注意的是，HTML 代码中的所有连续的空行（换行）也被显示为一个空格。

`<hr />` --水平线用于分割内容

html 编码:

常用的也就三个，用于在 html 文档中表示特殊字符。

1. 空格，html 中 n 个空格也仅被看作一个空格，作为单词的切分符，于是用`&nbsp;`来代替。

2. 左尖角符，代表标签的开始，`&lt;`

3. 右尖角符，代表标签的结束，`&gt;`

> 注释：浏览器会自动地在标题的前后添加空行。  
> 注释：默认情况下，HTML 会自动地在块级元素前后添加一个额外的空行，比如段落、标题元素前后

## 二、html 注释

`<!--This is a comment-->` 注释的写法

## 三、html 样式

#### 背景颜色(background)

eg:

> `<body style="background-color:yellow">`  
> `<h2 style="background-color:red">This is a heading</h2>` >`<p style="background-color:green">This is a paragraph.</p>`

#### 字体、颜色和尺寸(font-family;color;font-size)

eg:

> `<h1 style="font-family:verdana">A heading</h1>`

> `<p style="font-family:arial;color:red;font-size:20px;">A paragraph.</p>`

#### 文本对齐(text-align)

eg：

> `<h1 style="text-align:center">This is a heading</h1>`

## 四、html 格式化

#### 常用的几种格式

|    标签    |     描述     |   标签   |      描述      |
| :--------: | :----------: | :------: | :------------: |
|   `<b>`    | 定义粗体文本 | `<code>` | 定义计算机代码 |
|  `<big>`   |  定义大号字  | `<pre>`  | 定义预格式文本 |
|   `<i>`    |  定义斜体字  | `<var>`  |    定义变量    |
| `<strong>` |     加粗     | `<del>`  |     删除线     |

## 五、html 引用

`<q>`和`</q>`包围起来的文本称为短引用，文本两边会带上引号。

`<blockquote>`和`</blockquote>`包围起来的文本称为长引用，文本会进行缩进处理。

其他引用的格式：

|    标签     |              描述              |
| :---------: | :----------------------------: |
| `<address>` | 定义文档作者或拥有者的联系信息 |
|  `<cite>`   |         定义著作的标题         |
|  `<abbr>`   |     定义缩写或首字母缩略语     |
|   `<bdo>`   |          定义文本方向          |

## 六、html 链接

`<a href="(url)">*words*</a>` 最终点击 words（甚至 words 可以替换成一张图片）可进入指定的 url 链接

> ★ 如果在"url"后面再加上 target="\_blank"，则是打开一个新窗口进入链接页面，就无需离开当前站点了。

> 注释：在 url 后面得跟上一个/，比如`http://www.baidu.com/`，不加上会向服务器两次请求。  
> 在 url 前端加上/，比如/index.html，应该就是直接进本站的 index.html 界面。省略了前面的内容。

#### html 的锚

定义：`<a name="*label*">*ID*`</a>` 由此定义了一个锚

调用：`<a href="#*label*"></a>`

当然也可以在 url 的末端写上#label,就可以直接转到链接页面的锚了。

## 七、html 图像

在 HTML 中，图像由 `<img>` 标签定义。

`<img>` 是空标签，意思是说，它只包含属性，并且没有闭合标签。

要在页面上显示图像，你需要使用源属性（src）。src 指 "source"。源属性的值是图像的 URL 地址。

定义图像的语法是：

`<img src="url" />`

URL 指存储图像的位置。如果名为 "boat.gif" 的图像位于 `www.w3school.com.cn` 的 images 目录中，那么其 URL 为 `http://www.w3school.com.cn/images/boat.gif`。

`<title="">`图片提示符，鼠标挪过去就会显示的提示。

`<alt="'>`图片占位符，如果图片显示不出来，就会显示这里的文字。

`<p>`图像 `<img src ="/i/eg_cute.gif" align="top/bottom/center/left/right">` 在文本中`</p>`

当然写属性的地方也可以控制图像的大小 如 width="50" height="50"

## 八、html 列表

#### 无序列表

无序列表是一个项目的列表，此列项目使用粗体圆点（典型的小黑圆圈）进行标记。

无序列表始于 `<ul>` 标签。每个列表项始于 `<li>`。列表项内部可以使用段落、换行符、图片、链接以及其他列表等等。

`<ur type="disc/circle/square">` 分别是黑圆圈、白圆圈、黑方块

> `<ul>`  
> `<li>Coffee</li>`  
> `<li>Milk</li>`  
> `</ul>`

- coffee
- milk

#### 有序列表

同样，有序列表也是一列项目，列表项目使用数字进行标记。

有序列表始于 `<ol>` 标签。每个列表项始于 `<li>` 标签。

标签 ol 后面可以加个 type，代表列表的样式，共有五种，不写默认数字，写法为`<ol type="1/a/A/i/I">`.其中 i 和 I 代表罗马数字。

如果要倒序排，可加一句`reversed="reversed"`.如果要设定从第 3 个开始排，就加一句 start="3"，无论你是哪种类型，都能用数字去取 start。

> `<ol>`  
> `<li>Coffee</li>`  
> `<li>Milk</li>`  
> `</ol>`

1. coffee
2. milk

## 九、html 块

#### html 块元素

块级元素在浏览器显示时，通常会以新行来开始（和结束）。例子：`<h1>`, `<p>`, `<ul>`, `<table>`, `<div>`

内联元素在显示时通常不会以新行开始。例子：`<b>`, `<td>`, `<a>`, `<img>`, `<span>`

`<div>`它是可用于组合其他 HTML 元素的容器。有换行效果，而 span 没有。

`<span>`可用作文本的容器。这两者都没有特定含义。

## 十、html 表单

1.文本输入 `<input type="text">`,就出现一个文本输入框。得有 name 才能正确提交。如果再写上 value 值，就是文本框中默认的内容。  
2.密码输入，将 type 改为 password，输入内容变为暗码，要有 name 才能正确提交  
3.单选按钮，将 type 类型写成 radio。不过在 type 后面还得追加 name 和 value，name 相同的作为同一个单选题的选项，而 value 代表提交的值。  
4.多选按钮 type 类型为 checkbox，每个项都得有 name 和 value，name 相同 value 不同。  
5.提交按钮，type 类型为 submit，其 value 的值就是显示在按钮上的字，不写默认为提交。  
6.下拉列表，`<select name="">` 然后接下来子块标签都是`<option value="">`  
7.文本域，`<textarea name="" rows="" cols="">`,可分行分段输入。  
8.按钮，`<button type="button" onclick="alert('')">`Click me!`</button>`,alert 中的内容就是弹出框的内容，中间的文本是按钮上面的文字。  
9.只读属性，readonly 这个属性可以规定文本输入只读，即不能修改。  
10.禁用属性，disabled 这个属性不准对文本框操作，背景深灰色。

ps: 这篇笔记真是折腾我够久啊，一直给我报错，百度了 n 次也搜不到原因，拿掉这个 md 文件就不报错，那就是这个文件的问题，frontmatter 抄了之前的也还是报错，那就是正文的原因，然后我删掉大部分剩下一点点放上去，问题就了然了——markdown 和 html 之间的矛盾（是 vscode 预览器害了我啊，让我以为在标签前面加上一个反斜杠就能正常输出，实际上不行，对于标签要用`...`单引号给括起来才行，至少最后总算解决了这个麻烦。唉。
