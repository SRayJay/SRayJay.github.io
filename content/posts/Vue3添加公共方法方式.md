---
title: Vue3添加公共方法方式
date: 2021-11-10T21:13:05+08:00
categories: note
tags:
  - Vue
draft: false
---

在vue3中是不会直接暴露vue对象给你使用了。所以不能像vue2那样直接在原型上挂载，想要添加公共方法可以有下面三种方式。

<!--more-->

### **第一种：使用 app.config.globalProperties 添加**

```js
import { createApp } from 'vue'
import axios from 'axios'

const app = createApp({
  created() {
    console.log(this.$axios)
  }
})
app.config.globalProperties.$axios = axios
app.mount('#root')
```

在setup中访问（setup中没有this）

```js
<script setup>
import {getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance();//获取公用方法proxy.$axios，或者use中方法
const {$axios}=proxy
console.log($axios)
</script>
```

### **第二种：使用 app.mixin 添加**

```js
import { createApp} from 'vue'
import axios from 'axios'

const app = createApp({
  created() {
    console.log(this.$axios)
  }
})
app.mixin({
  methods: {
    $axios: axios
  }
})
app.mount('#root')
```

### **第三种：采用 provide, inject 方法**

需要注意的是这种方法需要组建 inject 注入进组件才能使用。

```js
import { createApp } from 'vue'
import axios from 'axios'

const app = createApp({
	inject: ['$axios'],
	created() {
        console.log(this.$axios)
    }
})
app.provide('$axios', axios)
app.mount('#root')
```
