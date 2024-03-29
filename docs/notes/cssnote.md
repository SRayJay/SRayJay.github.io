# CSSnote

date: 2019-01-25T13:35:54+08:00

## 一、如何创建 CSS

1. 内联样式：也叫**行间样式**在标签后面写上 style={...}就可以，但仅限于这个标签产生样式作用
2. 内部样式表：当单个文档需要特殊的样式时，就应该使用内部样式表。可以使用`<style>` 标签在文档头部定义内部样式表.
3. 外部样式表：在 html 的 head 标签内加上 link 标签，href 的值就是 css 文件的路径，但是.css 文件内不能包含任何 html 标签。
<!--more-->

## 二、选择器

1. id 选择器：

   以`#id值{...}`的格式定义某具有该 id 的标签的样式。

   在用来建立派生选择器时，在 id 后面空格在写上特定标签的名，就可以仅修改其部分。

2. 类选择器：

   以`.类名{...}`这样的格式定义属于该类型的标签的样式。

   如果一个标签运用 css 样式时要用两种类，则是 clss="1 2",clss 要保证只有一个。

   在用来建立派生选择器时，可以在后面空格加标签，代表该类下的一个标签使用该样式。也可以标签.类名，这样仅代表该标签下该类使用这个样式。

3. 属性选择器:

   以`[属性名]`这样的格式定义含有该属性的所有标签的样式。

   当然也可以`[属性名=“属性值”]`这样可以更加具体，而且属性值也可以取多个。

4. 标签选择器:

   以`标签名{...}`这样的格式定义的对所有该标签生效,当然加个空格再加个子标签那就成了派生选择器了。

5. 通配符选择器：

   以`*{...}`这样定义的样式会应用到网页所有标签，甚至包括 head、body 这样的大标签。

6. 派生选择器：

   又叫父子选择器，只要满足父子关系就可以用，而且并不一定要是直接父子级，间接亦可。每一层级不限定使用哪种表示形式。

7. 直接子元素选择器：

   在两个标签之间加上`>`符号，就限定了直接的父子关系。与派生区别。

8. 分组选择器：

   用`，`分割开的各组共用同一样式。

## 三、样式采用的优先级

当一个标签采用 css 的时候发生样式重叠的时候，就得根据优先级来判断生效的样式了。

！important > 行间样式 > id > class = 属性 = 伪类 > 标签 > 通配符

其权重分别为（256 进制）：Infinity 1000 100 10 1 0

**当其优先级相同的时候则根据先来后到，后者覆盖前者处理。**

当采用并列多项的选择器时，其优先级计算方法是各项权重值相加。另外无穷大加一比无穷大更大。

## 四、标签类别

#### 1、行级元素（内联元素）【inline】：内容决定元素所占位置，不可以通过 css 改变宽高

（span、em、strong、a、del）

#### 2、块级元素【block】：独占一行，可以通过 css 改变宽高

（div、p、li、ul、ol、form、address）

#### 3、行级块元素【inline-block】：内容决定位置，可以通过 css 改变宽高

（img）

## 五、CSS 常用属性

1. font-size： 字体大小，默认 16px。其实际改变的是字体的高
2. font-weight： 字体粗细，默认是 normal，可改变为 lighter、normal、bold、bolder
3. font-family： 字体样式，默认是 arial。
4. font-style： 当其值为 italic 时，文字斜体展示。
5. color： 定义字体的颜色，一般用六位 rgb 十六进制的代码来表示，当每两位相同时可缩写到三位。另外还能用颜色函数，rgb(n1,n2,n3)，每一位取值范围是 0-255，亦可 0%-100%。
6. border: 边框，它有三个参数，第一个设置边框的宽度，如 1px；第二个是边框的 style，如 solid 实线，dotted 是点状虚线，dashed 是条状虚线；第三个是边框的颜色。另外 transparent 是透明色。  
   另外这个属性每一个边都可以拆分开来，分别 border-top，bottom，left，right 可以再拆分设置参数
7. backgroundcolor：背景颜色
8. text-align：文本对齐方式，默认 left，居中是 center，右对齐就是 right
9. line-height：单行文本所占高度。如果其值等于容器高度，就能使文字垂直居中显示。
10. text-indent：文本缩进，一般用 em 单位表示，1em=1\*font-size，所以对于中文文本，两个字就是 2em
11. text-decoration：文本装饰，主要就两个值，underline 下划线，line-through 删除线
12. cursor：鼠标指向对应元素时的样式，有需要再查就行了。
13. display：该属性控制元素的类别，block 代表块级，inline 代表行级，根据他们的特点选择。
14. border-radius：控制边角圆度，50%就成圆环了
15. opacity： 透明度，取 0-1 之间的数。
16. z-index： 默认是 0，越大即越靠近人，用在层模型上。
17. vertical-align: 控制内容在一行里的上下位置，middle 是竖直方向上居中。

## 六、盒模型

包括之间的 border（边框），还有 margin（外边距）、padding（内边距）、还有内容本身，构成一个盒模型，几乎所有标签都有这几个属性。

margin 和 padding 都能有四个参数，分别是顺时针的上右下左的宽度。

如果只写一个值，代表四个参数都是一致的。如果是两个参数，那第一个代表上下，第二个代表左右。三个参数的话就是上、左右、下。

当然也可以用 margin-left 之类的去单独定义。

而在计算一个块的可视大小时，margin 是不用算进去的。

★margin 有一个特殊的可选参数，auto，比如 margin：0 auto 这样的效果是这块子级 div，在你缩小窗口时，先缩短的是外部 div 而不是它。

★img 图片堆叠时，会有间隙，不过这并非是 margin，只要把两个 img 标签中间的空格去掉就 ok 了。

## 七、定位

position 属性，可以用来给元素定位，一般以 left：npx，top：npx 这样的形式去定位，当然也可以从右边开始或者下面开始，但不常用。

#### position 的三个值

1、absolute：

    脱离原来位置进行定位。即定位后，就失去原本所占空间。
    相对于最近的有定位的父级进行定位，如果没有，就相对于文档进行定位。

2、relative：

    保留原来位置进行定位。定位后，原本所占空间依然存在。
    相对自己原来位置进行定位。

3、fixed：

    定位不管网页怎么移动，始终固定在屏幕上某一位置。

## 八、伪元素

    主要使用的两个伪元素，.demo1::before/after，每一个标签在诞生的时候都有着两个伪元素，里面必须有content属性，可以是文字，也可以是空的，但必须有。

## 九、浮动模型

在子元素上定义 float 属性（float：left/right）能使浮动元素按左或者右的方向排列直到它的外边缘碰到包含框或另一个浮动框的边框为止。如果该行剩余量容不下一个元素，则会换行继续排列。

浮动模型一个常用的情形就是报纸那样的展示，文字包围图片的展示就是通过将图片标签增加 float 属性得到的。

#### 浮动流

浮动元素产生了浮动流。

所有产生了浮动流的元素，**块级元素会无视他们的空间**，而产生了 bfc 的元素和文本类属性（inline）的元素（包括图片）以及文本都能看到他们。

若对于浮动元素，其父级是个块级元素，带有边框，却无视子级浮动元素包不住它，这是受了浮动流的影响，若要产生效果，则需清理浮动流。

在浮动元素下写一个没有内容的 p 标签，而其 css 属性，使用 clear：both 则可以清理附近的浮动流。这种方法多加了一个标签，影响了整个结构，虽然影响轻微，但最好避免。

最合适的方法是利用伪元素，在伪元素里使用 clear 就可以，不过要注意的是伪元素的类型是行级元素，而 clear 必须是块级的，所以还得用 display 改变其属性。

## 十、文字溢出处理

溢出的文本，打点展示，多行文本一般手动打点，而单行文本有方法，加上三个属性即可。

white-space: nowrap;--文本不受容器影响，不自动分段  
overflow: hidden;溢出的文本不可见  
text-overflow: ellipsis;文本若有溢出，即打点

## 十一、背景图片处理

background-image：url() 括号内填上图片的 url，背景就是该图片了。  
background-size 这个属性控制图片的尺寸，两个参数，宽高。  
background-repeat 其属性若是 repeat，则会平铺铺满为止，还有 repeat-x 横向，y 纵向，还有 no-repeat 不重复。  
background-position 控制图片在容器中的位置，两个参数分别代表 x，y，可以用像素表示也可以 left，top 英文表示，还有 center 就是居中处理。

#### 两种方法解决 css 和网速不兼容的问题

a 标签附带链接，文本用于表示该内容，然后 css 中加上背景图片

当网速不足，浏览器便不会加载 css 文件，此时若要表示该区域的内容，则要文字，但如果网速足够，又要文字不出现，这个问题有两种方案。

1、利用首行缩进，text-indent：其参数就是容器的宽度，再补上 while-space 和 overflow 用于隐藏文本。  
2、利用 padding 将内容撑开。把容器的高度改为 0，然后其内容利用 padding-top 撑开，再利用 overflow 将文本不可见。
