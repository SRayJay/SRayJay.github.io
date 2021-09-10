---
title: 展开按钮总结
date: 2020-12-15T13:34:28+08:00
categories: solution
tags: Vue
draft: false
---

需求：一段文本，不定长，需要在页面中有展开按钮，假如它少于固定行，展示按钮不可见，假如多于固定行，则出现按钮，点击后，显示全部长度。

<!--more-->

### html 部分

```html
<div
  ref="content_text"
  :class="{book_intro_content_all:!content_haveMore,book_intro_content:content_haveMore}"
>
  {{ BookInfo.book_intro }}
</div>
<div v-if="content_haveMore" class="more" @click="getMore">--展开--</div>
```

首先定义两个样式类，一个是展开后高度自适应的情况，一个是未展开的固定行数（少于还是自适应大小，多于就是固定行数）

### css 部分

```css
.book_intro_content {
  width: 635px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  font-size: 14px;
  margin-top: 15px;
  text-align: left;
  text-indent: 2em;
  line-height: 1.5;
}
.book_intro_content_all {
  width: 635px;
  font-size: 14px;
  margin-top: 15px;
  text-align: left;
  text-indent: 2em;
  line-height: 1.5;
}
```

主要就是第一个做了个多余文本打点处理，还有固定行数，第二个就是纯自适应。

### js 部分

```javascript
data:function(){
 return {
  content_haveMore: false//很重要，判断原本文本需要的高度，如果为true，就统一到限定行了
 }
},
created:function(){
 this.$nextTick(()=>{
  this.change_content_haveMore()
 })
},
methods:{
 change_content_haveMore: function() {
      console.log('高度' + this.$refs.content_text.offsetHeight)
      if (this.$refs.content_text.offsetHeight > 190) {
          this.content_haveMore = true
        return true
      } else {
        console.log(this.content_haveMore)
        this.content_haveMore = false
        return true
      }
    },
    getMore: function() {
      this.content_haveMore = !this.content_haveMore
      console.log('高度' + this.$refs.content_text.offsetHeight)
    }
}
```

### 总结一下要点和坑

**踩得一个坑**： 调用 this.$refs.content_text 需要得到 DOM 树结构，而此前我希望通过 v-if=init_content_haveMore，即判断将出现的文本能否放在 190px 的高度内才决定是否渲染展开这个按钮。

这样犯了逻辑矛盾，报错找不到这个 ref 指向的 dom 元素的 offsetHeight，所以只能等文本框实际渲染后才能操作$refs 上的 dom 节点。

这边我初始化 content_havemore 是个 true 值，默认渲染展开，但是要求刚生成完就判断展开按钮应不应该出现，这里在 created 函数里使用了 this.$nextTick(callback)函数，它的作用是在 dom 树生成完毕后执行代码，因为 vue 的计算属性不允许修改 data 内数据，所以我将 change_content_haveMore 写在 methods 里面，直接 this.XXX 执行即可。
