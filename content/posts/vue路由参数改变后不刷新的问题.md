---
title: vue路由参数改变后不刷新的问题
date: 2021-01-07T18:08:06+08:00
categories: Vue
tags:
  - solution
draft: false
---

问题：跳转到同一个页面，但是传入不同的路由参数，而 data 内数据从 route.params 拿的并不会在路由跳转后再次获取，即不会跟随刷新。

<!--more-->

### 解决方法

```javascript
<script>
    export default {
        data() {
            return {
                data: {}
            }
        },
        methods: {
          getData() {
          // 获取数据方法
        },
        created() {
          // 组件创建完后获取数据，
          // 此时 data 已经被 observed 了
          this.getData();
        },
        watch: {
          // 如果路由发生变化，再次执行该方法
          "$route": "getData"
        }
    }
</script>
```
