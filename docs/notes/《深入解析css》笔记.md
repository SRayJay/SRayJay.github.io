# 《深入解析 css》笔记

date: 2021-03-10T14:02:32+08:00

### 第一章：层叠、优先级和继承

1. 优先级：！important>行内样式>id 选择器>类选择器>标签选择器

2. 两条经验法则：选择器少用 id；少用!important。

3. 使用 inherit 属性使元素属性继承自父元素，方便修改。

   <!--more-->

4. 使用简写属性的时候会默认给细化的属性赋默认值，如标签 h1 的样式 font：32px arial;默认覆盖掉原本 h1 的加粗字体效果。

### 第二章：相对单位

1. em 用在边距及元素大小上很好，但用在 font-size 上很复杂，可以用 rem，根据祖先元素来换算得到字体大小。
2. 用 rem 设置字号，用 px 设置边框，用 em 设置其他大部分属性值。
3. **停止像素思维**：给网页设置一个合理的默认字号作为 rem。

```css
:root {
  font-size: 0.875em;
}
```

​ 大部分网页默认字号 16px，这里换算的话设置的根字号就是 14px 了，后续只需要根据 14px 去换算用 em 做单位，原则就是少换算，多靠相对单位去感觉。
​ 构造响应式面板：

    ```css
        :root{
            font-size:0.75em;
        }
        @media (min-width:800px){
            :root{
                font-size:0.875em;
            }
        }
        @media (min-width:1200px){
            :root{
                font-size:1em;
            }
        }
    ```

> 媒体查询，即@media 规则，可以根据某种屏幕尺寸或者媒体类型下的样式。这是响应式设计的关键部分。

​ 通过给不同大小的媒体设置不同的字号，响应的重新定义了整个网页的 em 和 rem。

4. 使用视口(viewport)单位，用 vw 来定义字号可以免去媒体查询来得到一个平滑变化来适应视口大小的字号，用 calc(0.5em+1vw)定义默认字号，可以在窗口变化时自适应。

5. 自定义属性：声明一个自定义属性需要前缀’--‘，在需要调用时用 var()来调用，尤其在颜色字体等上很好用，只需要修改一次就行。var 还接受第二个参数作为备用值，但当 var 中计算出来的不符合选用的属性，不管有没有备用值都会被设置成默认值。

   自定义属性有其自己的作用域，也可被继承。如果在某处修改自定义属性的值，修改后的值也只会在这一处的内部发生变化，而外部则依然是继承根元素处定义的效果。

### 第三章：盒模型

1. 调整盒模型：当一块宽度占 70%，而第二块带一点 padding 的占 30%时，他们是无法容下在一行的，因为默认采用的 box-sizing 是 content-box，这意味着给的宽是内容的宽而不包括边距和边框，所以为了方便，建议在 css 表头定义

   ```css
   :root {
     box-sizing: border-box;
   }
   *,
   ::before,
   ::after {
     box-sizing: inherit;
   }
   ```

2. 实现等高列：外层 display:flex 就行，别搞 table。

   > 警告：除非别无选择，否则不要明确设置元素的高度。高度应该由内容决定。

3. vertical-align 只会对行内元素或者 table-cell 生效。对于行内元素，它控制着该元素跟同一行内其他元素之间的对齐关系。比如，可以用它控制一个行内的图片跟相邻的文字对齐。

4. 外边距折叠：相邻外边距会折叠，折叠外边距的大小等于其较大值。即使是多个外边距叠加也只会取其中最大值。

   > 只有上下外边距才会折叠，左右并不好折叠。

5. **猫头鹰选择器**：在并列元素，比如第一个和第二个间加入 margin-top，但并不希望第一个也有 margin-top。可以用到猫头鹰选择器''_+_'。一般可以当做全局设置来用。

   ```css
   body * + * {
     margin-top: 1.5em;
   }
   ```

### 第四章：理解浮动

1. 清除浮动。一般在浮动元素的容器末尾的伪元素即::after 处清除浮动。

   ```css
   .clearfix::after {
     display: block;
     content: " "; /*将伪元素的display设置为非inline，并给定一个content值，以便让伪元素出现在文档中*/
     clear: both;
   }
   or .clearfix::before,
   .clearfix::after {
     display: table;
     content: " ";
   }
   .clearfix::after {
     clear: both;
   }
   ```

   上面两种方法各有优势，第二种可以避免同容器内的非浮动元素的 margin 塌陷。尽量用第二种吧。

2. 浮动不规则导致浮动元素的排列直接换行，但想要的结果是能整齐的排列，而不是让 float 去贪那么点小便宜。想要修复这个问题只需要**清除真正需要换行排列的那个元素上面的浮动**。

   比方说每行两个,那就清除每行的第一个上面的浮动，用 odd 奇数就可了。

   如果说三个就 3n+1,以此类推。

   ```css
   .media:nth-child(odd) {
     clear: left;
   }
   ```

   当然，这种情况需要确定一行排列多少元素。如果不知道要多少个，最好用别的方案，比如 flexbox 或 inline-block。

3. BFC(块级格式化上下文)，粗略理解就是给元素建立一个块级容器，使其不受外部浮动元素的影响。将内部的内容与外部的上下文隔离开，这种隔离为创建 BFC 的元素做出了下面三件事情：

   (1) 包含了内部所有元素的上下外边距。它们不会跟 BFC 外面的元素产生外边距折叠。

   (2) 包含了内部所有的浮动元素。

   (3) 不会跟 BFC 外面的浮动元素重叠。

   建立 BFC 的常用方法：

   - float：left 或 right，不为 none 即可。

   - overflow:hidden\auto 或 scroll，不为 visible 即可。

   - display:inline-block\table-cell\table-caption\flex\inline-flex\grid 或 inline-grid。拥有这些属性的元素称为块级容器。

   - position:absolute 或 fixed。

   **最常用简单的方式是 overflow:auto**

### 第五章：Flexbox

1. 如何实现如下顶部菜单栏布局？

   ![菜单](菜单.png)

   用 ul 和 li 做元素，给 ul 设定 flex 布局，要把其中某几项推到右边，只需要在开始的那一项给上 margin-left:auto；他就会自动分配所有的空间给 margin-left；

2. flex 属性：flex 属性是个简写属性，具体是 flex-grow，flex-shrink(默认 1)，flex-basis(默认 0%)。

   - flex-basis 是元素的初始尺寸，如果该元素有 width，则将 width 作为尺寸，若没有，则由内容决定宽度，如果给定 flex-basis，则无视 width 值。

   - flex-grow 是元素的增长因子，也是拉伸比例，若容器内有剩余空间，则按照这个比例分配。
   - flex-shrink 是元素的收缩比例，如果各元素的基本尺寸溢出的话，则以这个比例收缩。

3. 对于 input 的一种伪类和属性选择器用法，可以参考下，其他地方应该也能用。

   input:not([type=checkbox]):not([type=radio]){xxxx}这样可以给文本类型的输入框（不包含复选框和单选按钮）添加样式。

4. flex-direction:column，这一条可以改变弹性盒子的弹性方向，将 flex 个属性应用到纵轴上。现在纵向才是主轴，横向才是副轴。
5. 更多的 flex 属性见[阮一峰的 flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
6. 一个建议：如果整个网页用一行多列的布局想用 flexbox 的话，可能会导致渲染过程中随着加载出来的内容而变化的现象，所以建议这种情况用网格布局。
7. 有些垃圾浏览器不支持 flexbox，autoprefix 这个插件可以自动添加前缀。

### 第六章：网格布局

1. 外层容器使用 display:grid 来定义一个网格容器，并使用 grid-template-columns 和 grid-template-rows 来定义列和行。可以使用固定的宽高(px 单位)，可以使用相对的宽高(em 单位)，也可以使用分数单位(fr 单位)，和弹性因子一样的表现，代表占据的百分比。还可以使用 repeat(4,1fr)来直接生成四行，也可以 repeat(3,2fr 1fr)定义不同的重复模式来生成六行。

2. grid-gap 属性定义网格单元间距。

3. 网格单元可以用 grid-column 和 grid-row 来表示网格单元所占的网格编号。如 grid-row:1/3;代表该单元横跨 1 到 3 行。实际上 grid-column 是 grid-column-start 和 grid-column-end 的简写，中间的斜杠只是区分两个值并不是分数形式。数值代表的是网格线，从 1 开始。还有使用 span 关键字如 span 2，代表占据 2 行/列，不需要指定开始和结束位置。

4. Flexbox 和网格布局并不互斥，而是互补的。他们的功能有重叠的地方，但各自擅长的场景不一样。

   - Flexbox 本质上是一维的，而网格是二维的。
   - Flexbox 是以内容为切入点由内向外工作的，而网格是以布局为切入点从外向内工作的。

   当设计要求元素在两个维度上都对齐时，使用网格。当只关心一维的元素排列时，使用 Flexbox。

5. 命名网格区域。不用计算或者命名网格线，直接用命名的网格区域将元素定位到网格中。实现这一方法需要借助网格容器的 grid-template-areas 和网格元素的 grid-area 属性。举个例子：

   ```css
   .container{
       display:grid;
       grid-template-areas:"title title"
               "nav ."
               "main aside1"
               "main aside2";
       grid-template-columns: 2fr 1fr;
       grid-template-rows:repeat(4,auto);
       grid-gap:1.5em;
   }
   .header{
       grid-area:title;
   }
   .nav{
       grid-area:nav;
   }
   ....
   ```

   grid-template-areas 属性使用了一种 ASCII art 的语法，可以直接在 CSS 中画一个可视化的网格形象。该声明给出了一系列加引号字符串，每一个字符串代表网格的一行，字符串内用空格区分每一列。也可以用句点(.)作为名称空出一个网格单元。

   > 警告：每个命名的网格区域必须组成一个矩形。不能创造更复杂的形状，如 L 和 U 型。

6. 要实现画廊的效果，需要用到隐式网格。给容器设置 grid-auto-rows/columns:1fr;来为隐式网格轨道指定一个大小。列若不指定列数的话可以 grid-template-columns:repeat(auto-fill,minmax(200px,1fr))来指定最小列宽为 200px，自动填充网格。这里的 auto-fill 和 minmax 加在一起，就会让网格在可用的空间里尽可能多的产生网格列，并且每个列的宽度不会小于 200px。如果网格元素不够填满所有网格轨道，auto-fill 就会导致一些空的网格轨道。如果不希望出现空的网格轨道，可以使用 auto-fit 来代替 auto-fill。它会让非空的网格轨道扩展，填满可用空间。

   在这种画廊效果中，我们常常会让某些元素变成两倍宽高，需要给它设定 grid-row:span 2;来占据 4 倍网格。再给容器设置一个布局算法，一般用紧凑的网格布局算法，即 grid-auto-flow:dense;但是这样的时候有些图片并不会因为占据四倍网格而放大到四倍，这里需要对图片进行放大，可以用 flex 纵向拉伸图片再配合 object-fit 属性保持图片宽高比。

   - object-fit:cover; 扩展图片，让它填满盒子（导致图片一部分被裁剪）
   - object-fit:contain; 缩放图片，让它完整地填充盒子（导致盒子里出现空白）
   - object-fit:fill(默认)；会拉伸图片，很丑。

### 第七章：定位和层叠上下文

1. 固定定位。即 fixed，搭配 top、bottom、left、right 使用定位在窗口某处，同时设置四个值还隐式地定义了元素的宽高。

   可以用固定定位做一个模态框，初始状态下 display：none 隐藏，然后用 js 注册点击事件，将 display 改成 block 就能显示。（模态框外部的蒙层可以用与模态框主体部分平级的元素，fixed，定位属性都为 0 即全网页范围的背景颜色变灰来做到）

2. 绝对定位。absolute，会基于父元素来定位，如果父元素也未定位，则找祖父、曾祖父直到整个网页。

   - 绝对定位一个 close 按钮，可以用 css 来隐藏 close 文本，并用 X 来表示该按钮。首先将按钮的文字挤出去(text-indent)并隐藏溢出内容(overflow:hidden)。然后将按钮的::after 伪元素的 content 设置为"\\00D7"(如果要三条横线的汉堡包图标，是 2261)。因为 text-indent 是继承属性，需要在伪元素上设置 text-indent 为 0。

3. 相对定位。给 relative 定位的元素加 top、left，只能移动它，不能同时 left 和 right 改变它的大小，一起用 right 被忽略。

   - 创建下拉菜单。用相对定位给菜单容器定位，然后下拉出来的菜单 display:none,在鼠标 hover 到容器时将菜单 display:block 出来。

   - 使用伪元素创建 css 三角形当小箭头 icon。

     ```css
     .dropdown-label::after {
       content: "";
       position: absolute;
       right: 1em;
       top: 1em;
       border: 0.3em solid;
       border-color: black transparent transparent; /* 用上边框做一个向下的箭头 */
     }
     .dropdown:hover .dropdown-label::after {
       top: 0.7em;
       border-color: transparent transparent black; /* 鼠标悬停时，让箭头向上 */
     }
     ```

4. 渲染顺序

   浏览器将 HTML 解析为 DOM 的同时还创建了另一个树形结构，叫做渲染树，它代表了每个元素的视觉样式和位置。同时还决定浏览器绘制元素的顺序。

   一般顺序都是按照在 html 里出现的顺序来的，首先渲染未定位的元素在最底层，然后根据先后顺序渲染定位元素，因此当模态框没有出现在最高层的情况，可以将模态框放到网页内容的最后，反正使用固定定位并不影响。但如果是其他定位元素，出现层叠不符合预期的情况，要在不修改 html 结构的前提下，就要用到 z-index 了。

5. z-index。

   可以是任意整数。拥有较高的值的元素会出现在较低值的元素的前面。拥有负数值的元素会出现在静态元素的后面。

   z-index 只在定位元素上生效，不能用它控制静态元素。给一个定位元素加上 z-index 可以创建层叠上下文。

6. 层叠上下文。

   简单理解就是定义了 z-index 的元素包括其后代元素对外都在一个层上，其后代元素 z-index 再大也不会超越这一块的层叠等级。

   z-index 值控制元素在它所处层叠上下文内的层叠顺序。

7. 粘性定位。

   sticky，正常情况下，元素会随页面滚动，当到达屏幕的特定位置时，如果用户继续滚动，它就会锁定在这个位置。最常见的例子就是侧边栏导航。

   只需要给定位元素定位 position:sticky,top:1em；就定下了正常滚动后粘住的位置。如果初始位置要不一样的话，可以用 margin-top，在滚动后视觉效果来看不影响粘住的位置。

   注意，只有当父元素的高度大于粘性元素时才会让粘性元素固定，因此可以给父元素弹性容器加上 min-height，以便让父元素足够高。

### 第八章：响应式设计

1. 响应式设计第一原则：移动优先。就是构建桌面版之前要先构建移动端布局。设计时就要考虑到小屏模式下的一些细节，然后给视口添加 meta 标签。如果不加这个标签，移动浏览器会假定网页不是响应式的，并且会尝试模拟桌面浏览器，那移动端设计就白做了。

   ```html
   <head>
     <meta charset="utf-8" />
     <meta name="viewport" content="width=device-width,initial-scale=1" />
   </head>
   ```

2. 响应式设计第二原则：媒体查询。媒体查询允许某些样式只在页面满足特定条件时才生效。

   ```css
   @media (min-width: 560px) {
     /* 建议用35em代替560px作断点 */
     .title > h1 {
       font-size: 2.25rem;
     }
   }
   ```

   ```css
   @media (min-width: 20em) and (max-width: 35em) {
     ...;
   } /* 同时满足 */
   @media (min-width: 20em), (max-width: 35em) {
     ...;
   } /* 满足一个即生效 */
   ```

   总是确保每个媒体查询都位于它要覆盖的样式之后，这样媒体查询内的样式就会有更高的优先级。

3. 响应式设计第三原则：流式布局。流式布局大概就是使容器随视口宽度而变化。

### 第九章：模块化 CSS

1. **约定**·修饰符一般用”--“两个连字符来表示，如 button--large、button--error，代表一个模块的变体。

2. 尽量不要使用依赖语境的选择器。即对于单个元素，匹配其独特的选择器，而不是整个上下文五六个选择器去匹配一个，太冗杂且不易维护。

3. **约定·**多元素模块一般用“\_\_”两个下划线来连接。比如 media 模块，其子元素用 media\_\_body、media\_\_image 代表它具体是哪一部分。

4. 尽量避免在模块选择器中使用通用标签名，比如.media>div，因为保不准 media 下还需要多加一个 div，而不希望这个样式也对它产生效果。除非希望对每个子元素都产生效果，比如.media>li，就还是能用的。

5. 模块封装的一个原则，**单一职责原则**。尽可能把多种功能分散到不同的模块中，这样每个模块就可以保持精练，聚焦且容易理解。

6. ```css
   .dropdown.is-open .dropdown__toggle::after {
     ...;
   }
   /*当dropdown的is-open生效时才对后续的选择器的样式生效*/
   ```

7. **约定**·状态类一般以 is-或者 has-开头。比如 is-open、is-loading、has-error。

8. 工具类一般完成一个具体的功能，比如文字居中、左浮动、清除浮动、隐藏元素。

   ```css
   .text-align {
     text-align: center !important;
   }
   .hidden {
     display: none !important;
   }
   ```

   一般使用工具类目的性明确，不希望其他样式覆盖它，所以可以用!important 来提高优先级。
