---
title: Vue@路径别名设置
date: 2021-06-06T17:57:12+08:00
categories: solution
tags:
  - Vue
draft: false
---

路径别名，省去相对路径的麻烦，直接用@views 来作为路径开头更加的方便

## Vue2+Vue-Cli 写法

在 vue.config.js 里写入

```js
module.exports = {
  ...
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
  }
}
```

## Vue3+Vite+Ts 写法

```js
// vite.config.js
resolve:{
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@V": path.resolve(__dirname, "src/views"),
      "@C": path.resolve(__dirname,"src/components")
    }
  }
}
// tsconfig.json
"paths":{
      "@/*":["./src/*"],
      "@V/*":["./src/views/*"],
      "@C/*":["./src/components/*"]
    }
```
