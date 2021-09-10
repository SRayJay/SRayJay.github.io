---
title: VueNote1
date: 2019-05-27T21:58:46+08:00
categories: note
tags: Vue
draft: false
---

每个 vue 应用都需要实例化 vue

对于 html 中 id 为 app 的元素，对其实例化。

<!--more-->

```javascript
var vm = new Vue({
    el: '#app',
    data: {
        site: 'aaa',
        num: 23
    }
    methods:{
        func: function(){
            return this.site + 'bbb';
        }
    }
})
```

el 参数就是选中的标签的 id 值，只对其作用。

data 定义的是其属性，methods 就是方法函数了。

在 html 标签中使用{{site}}这样由两层大括号包裹起来的数据将被 vm 实例内容替换。

vue 实例内容与 html 内容绑定，可以互相找到也可以互相改变。

对于 vue 自带的属性和方法，可以加个前缀$，以区分开和用户自己定义的属性。

## Vue 指令

v-html：用于输出 html 标签

```html
<div id="app">
  <div v-html="message"></div>
</div>
<script>
  new Vue({
    el: '#app',
    data: {
      message: '<p>text</p>',
    },
  })
</script>
```

v-if：根据 if 后面跟的属性的布尔值来判定是否产生效果

```javascript
;<div id="app-3">
  <p v-if="seen">现在你看到我了</p>
</div>
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true,
  },
})
```

还有 v-else、v-else-if 这两个就和其他语言一样的意思，只不过每次使用都得在一个 div 块里。

v-on：可以用于添加一个事件监听器，可以加入一个函数，触发事件时调用函数，也可以加入一个内联语句。(v-on:可以缩写为@)

```javascript
;<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">逆转消息</button>
</div>
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!',
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
  },
})
```

该例子监听了一个点击效果，实现对 message 的逆转

v-model：用来在 input、select、textarea、checkbox、radio 等表单控件元素上创建双向数据绑定，根据表单上的值，自动更新绑定的元素的值。

```javascript
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

v-bind：动态更新 html 元素上的属性。比如 id，class，href。(v-bind:可以缩写为:)

```javascript
;<div id="app">
  <a v-bind:href="url">链接</a>
</div>
var app = new Vue({
  el: '#app',
  data: {
    url: 'http://google.com',
  },
})
```

:class 与普通的 class 可以并存，一般可以通过:class 绑定一个布尔值，当其为真时使该类生效。当:class 的表达式过长或逻辑复杂时还可以绑定一个计算属性。例如：

```javascript
<div id="app">
  <div :class="classes"></div>
</div>
var app = new Vue({
  el: '#app',
  data: {
    isActive: true,
    error: null
    },
  computed:{
    classes: function(){
      return {
        active: this.isActive && !this.error,
        'text-fail':this.error && this.error.type === 'fail'
      }
    }
  }
})
```

**vue 在渲染元素时，出于效率考虑，会尽可能复用已有的元素而非重新渲染。加入一个唯一的 key 值就能使他重新渲染**

v-show: 用法与 v-if 类似，后面跟一个表达式，判定值是否为真而决定元素是否隐藏。值为真显示，为假隐藏。v-show 只是简单的 css 属性切换，无论条件是否为真，都会进行编译，无非就是 display 属性改变了值而已。而 v-if 才是真正的条件渲染。

v-for：列表渲染指令。该指令可以绑定数组的数据来渲染一个项目列表。须以 site in sites 这样的形式，sites 为源数据数组名并且 site 是数组元素迭代的别名。本质上是一个循环。

对于内容是一个对象的，也可以加入其他参数，键、值、序号皆可,对象的属性也可以被循环遍历。也可以迭代整数。

```javascript
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '学习 Android' }
    ]
  }
})
```

与 v-if 一样，v-for 也可以用在内置标签 template 上，将多个元素进行渲染。

```javascript
<div id="app">
  <ul>
    <template v-for="book in books">
      <li>书名：{{book.name}}</li>
      <li>作者：{{book.author}}</li>
    </template>
  </ul>
</div>
var app = new Vue({
  el: '#app',
  data: {
    books: [
      {
        name:'《月亮与六便士》',
        author: '毛姆'
      },
      {
        name:'《一个人的村庄》',
        author:'刘亮程'
      },
      {
        name:'《陶庵梦忆》',
        author:'张岱'
      }
    ]
  },
})
```

## Vue 组件

要在父实例中使用这个组件，必须要在实例创建前注册，之后就可以用`<my-component></my-component>`的形式来使用组件了。

```html
<div id="app">
  <my-component></my-component>
</div>
<script>
  Vue.component('my-component', {
    template: '<div>这里是组件的内容</div>',
  })

  var app = new Vue({
    el: '#app',
  })
</script>
```

**template 的 DOM 结构必须被一个元素包含，如果直接写成‘这里是组件的内容’，不带`<div></div>`是无法渲染的**

**Vue 组件的模板在某些情况下会受到 HTML 的限制，比如`<table>`内规定只能是`<tr>`、`<td>`、`<th>`等表格元素，所以在 table 标签内直接使用组件是无效的。这种情况下，可以使用`<tbody` is="my-component">`</tbody>`来使用组件。同理，还有限制元素如`<ul>`、`<ol>`、`<select>`**

组件可以使用其单独定义的 data，methods，computed，但 data 里要求必须是函数，将数据 return。

```javascript
Vue.component('my-component',{
  template: '<div>{{ message }}</div>'
  data: function(){
    return {
      message: '组件内容'
    }
  }
});
```

### 使用 props 传递数据

使用 props 来声明需要从父级接收的数据，props 的值可以是两种，一种是字符串数组，一种是对象。

```html
<div id="app">
  <my-component message="来自父组件"></my-component>
</div>
<script>
  Vue.component('my-component', {
    props: ['message'],
    template: '<div>{{ message }}</div>',
  })
  var app = new Vue({
    el: '#app',
  })
</script>
```

props 中声明的数据与组件 data 函数 return 的数据主要区别在于 props 的来自父级，data 中的是组件自己的数据，作用域是组件本身。

**由于 HTML 特性不区分大小写，当使用 DOM 模板时，驼峰命名的 props 名称转为短横分割命名。比如 props 中'warningText'，到 html 中组件属性里就是 warning-text**

要写动态数据，则需要 v-bind 来绑定数据了。一个区别在于：

```html
<div id="app">
  <my-component message="[1,2,3]"></my-component>
  <my-component :message="[1,2,3]"></my-component>
</div>
<script>
  Vue.component('my-component', {
    props: ['message'],
    template: '<div>{{ message.length }}</div>',
  })
  var app = new Vue({
    el: '#app',
  })
</script>
```

这个例子第一个输出 7，第二个输出 3。第一个是被写死了，只传递字符串，长度就是“”中字符个数，第二种使用 v-bind 才能传递数组（布尔值、数字、对象）
