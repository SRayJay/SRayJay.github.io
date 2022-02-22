# css 常用技巧

date: 2021-01-23T17:15:18+08:00

1、多行文本溢出隐藏

```css
div{
 text-overflow: -o-ellipsis-lastline;
 overflow: hidden;
 text-overflow: ellipsis;
 display: -webkit-box;
 -webkit-line-clamp: 2;  //行数
 -webkit-box-orient: vertical;-webkit-box-orient-webkit-box-orient-webkit-box-orient-webkit-box-orient-webkit-box-orient-webkit-box-orient
}
```

2、单行文本溢出隐藏

```css
white-space: nowrap;–文本不受容器影响，不自动分段
overflow: hidden;overflowoverflowoverflowoverflowoverflowoverflow溢出的文本不可见
text-overflow: ellipsis;text-overflowtext-overflowtext-overflowtext-overflowtext-overflowtext-overflow
```

3、float 浮动造成父元素塌陷

```css
 （1）给父级元素添加一个高度

　　此方法中高度无法确认，需要多次尝试设置

　　<ul style="height:200px;background:pink;border:1pxsolid#ccc">

　　（2）在最后一个子元素后加一个空的div，给他添加样式clear，清除两侧浮动；

　　<div style="clear:both;"></div>

　　（3）父级元素设置overflow：hidden；

　　<ul style="background:pink;border:1pxsolid#ccc;overflow:hidden;">

　　（4）父级元素添加after伪类；

　　.parent:after{

　　content:"";

　　display:block;

　　clear:both;

　　}
```

4、css Img 等比例自动缩放

按父容器宽度自动缩放，并且保持图片原本的长宽比

```css
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
```

5、Textarea 换行输出到前端无效果的处理方法

```javascript
desc = odesc.value.replace(/\n|\r\n/g, "<br/>");
```

将换行符换成`<br/>`,之后再使用 v-html

6、深色背景上浅色文字要更显眼可读，可以加文字投影。text-shadow:0.1em 0.1em 0.3em #000;

7、为按钮增加一个渐变效果。

```css
button {
  background-color: hsl(180, 50%, 50%);
  border: 0;
  color: white;
  font-size: 1rem;
  padding: 0.3em 1em;
  transition-property: all; /*所有属性变化都使用过度效果*/
  transition-duration: 0.5s;
}
button:hover {
  background-color: hsl(0, 50%, 50%);
  border-radius: 1em;
}
```

8、让一块 div 作背景撑满整个屏幕

```css
div {
  width: 100%;
  height: 100%;
  position: fixed;
}
```

9、
