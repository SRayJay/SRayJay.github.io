---
title: margin塌陷和合并
date: 2019-02-04T12:51:44+08:00
categories: solution
tags: CSS
draft: false
---

## Margin 塌陷

```
<div class="wrap">
    <div class="content"></div>
</div>
```

<!--more-->

在这两个父子级块级元素的 css 定义中，其垂直 margin 是取父子元素中的最大值，而不是相对父级块的 margin。

要解决这个塌陷问题，要用到 bfc（块级格式化上下文）改变父级的渲染规则。

#### 如何触发一个盒子的 bfc

1. position：absolute
2. display：inline-block
3. float：left/right
4. overflow：hidden（隐藏溢出部分）

这些定义在父级块上都能解决 margin 塌陷的问题，但都不能完美解决，还得根据情况选择适合的方法。

**1、3 两种方法内部都会自动将 display 改为 inline-block**

## Margin 合并

```
<div class="demo1"></div>
<div class="demo2"></div>
```

在这两个兄弟级块级元素的 css 定义中，其垂直 margin 是会合并的，比如第一个下方 margin200，第二个上方 margin100，最终结果是只有 200 的 margin，若要解决这个问题，只需把第一个的 margin 改成 300 就行了。

或者在两个 margin 之间加上 border 或者 padding 也可以防止折叠。
