# 《css 揭秘》笔记

date: 2021-03-09T10:01:01+08:00

粗读了《css 揭秘》这本书，里面提到的很多技巧和操作暂时用不到，可以在用到时当工具书看，目前对我有帮助的几个技巧做了个笔记。

1. 尽量使用相对单位。line-height 与 font-size 的比例而不要使用绝对值。em 单位（相对于当前元素的字体大小）可以在修改字体尺寸同时修改其他的数值。rem 则是根据根元素的字体大小。vw 单位是窗口宽度的 1%，因此需要某个元素在浏览器窗口改变时保持一定的比例，就用 vw 作单位。vh 则是窗口高度的 1%。

   <!--more-->

2. 要做定义类型的表示，如“作者：XXX”,可以用更加语义化的标签，dl，dt，dd。三者都是块元素，需要 dt 和 dd 在同一行的话得转换成行内元素。而在第二个 dt 出现前，需要给前一个 dd 加上一个换行符，采用伪元素的方式添加换行符，而 dd 若需要两条内容，可以同样的方法在其之间添上’，‘

   ```html
   <style>
     dt,
     dd {
       display: inline;
     }
     dd {
       margin: 0;
     }
     dd + dt::before {
       content: "\A";
       white-space: pre;
     }
     dd + dd::before {
       content: ",";
     }
   </style>
   <dl>
     <dt>物种：</dt>
     <dd>人</dd>
     <dt>生日：</dt>
     <dd>3.9</dd>
     <dd>3.8</dd>
   </dl>
   ```

3. 需要实现矩形有切角，可以用 background：linear-gradient(-45deg,transparent 25px,#58a 0);其中 25px 是切角的大小，#58a 是背景颜色。

4. 要实现按钮背景矩形歪斜成平行四边形，需要用到 transform:skew(-45deg)，但是里面的文字也会歪斜，要想让文字不变，需要用到伪元素生成一个等大的矩形，并用 z-index 使其在底部，不要盖住文字，只要把伪元素生成的矩形歪斜就好了。

   ```css
   #skewbtn {
     background: none;
     width: 6em;
     border: none;
     outline: none;
     font-size: 20px;
     height: 2em;
     color: white;
     position: relative;
   }
   #skewbtn::before {
     content: "";
     height: 2em;
     width: 6em;
     background: #58a;
     z-index: -1;
     transform: skew(-45deg);
     position: absolute;
     left: 0;
     top: 0;
     right: 0;
     bottom: 0;
   }
   ```

5. 自适应内部元素，当一个盒模型内部有一个元素比较小，但希望这个盒模型就以这个元素的宽度为准，而不是被其他元素撑大。可以试试 width:min-content;并以 margin:auto;居中。

6. 满幅的背景，定宽的内容。一般我做的时候都是给内容定了 1024px 的宽，并用 margin:auto 来居中，但要想更适应窗口缩小的情况，就要根据视口大小的百分比来调整。这边的优化是用 padding:1em calc(50%-512px);

   calc(50%-512px)等同于 max-width:1024px，内容最宽为 1024px，并且根据视口的一半来调整，更加人性化。

7. 垂直居中：最好用 flexbox，给待居中的元素的父元素设置 display:flex;同时给待居中的元素一个 margin:auto。同时借助 align-items 和 justify-content 还能实现对内部元素的操作。

8. 页脚紧贴底部：给 body 个 display:flex，flex-flow:column;然后给 min-height:100vh;这时依然还不会拉伸 main 部分，需要给 main 一个 flex:1。就能使 footer 沉底了
