---
title: Vue2自动注册组件
date: 2021-06-06T17:51:14+08:00
categories: solution
tags:
  - Vue
draft: false
---

Vue 的组件要在其他地方使用得通过这三步

<!--more-->

```js
<template>
    ...
 <vuexxx/>
 ...
</template>
import vuexxx from '@components/vuexxx'
export default{
    ...
    components:[
        vuexxx
    ]
}
```

注册起来比较的繁琐。

这里记录一种自动注册的方式，把下面代码写入 global.js 放在 components 文件夹里。

```js
import Vue from 'vue'
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const requireComponent = require.context('.', true, /\.vue$/)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    // 因为得到的filename格式是：'./componentX.vue',所以去掉头和尾保留真正的文件名
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
```
