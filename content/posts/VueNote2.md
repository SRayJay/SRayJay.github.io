---
title: VueNote2
date: 2019-06-03T18:59:16+08:00
categories: note
tags: Vue
draft: false
---

## Vue 实例——购物车

之前照书上题目打得一个例子，模拟一个购物车，要求选中商品再计算总价。

1.对于每个条目，给其 list 对象中加入一条 chose：false 表示其初始状态是非选中的，然后再 html 中该条目的 checkbox 中用 v-model 绑定该条目的 chose 值。当其 checkbox 选中后会将 chose 值变为真。首先实现了一个数据绑定。

<!--more-->

然后再 totalprice 总价的计算方法里，增加一个判定条件，就是 chose==true 才计算入内。

2.提供一个全选的按钮。依然选用一个 checkbox 作为全选的按钮。初始状态为不选，不选作为 vue 实例的一个属性，取名为 all，赋值 false，在全选按钮上用 v-model 来绑定。要求单击后实现全选，用一个 checkAll 函数，在实例的 methods 里，根据 all 的取值真假来判定，对于每个条目，都给 chose 赋相应的值，如果 all 为真，证明已经全选，再按一次按常理就是全部不选，那就全部赋值为 false，如果为假就全部赋为 true。

下面附上全部代码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>购物车示例</title>
    <link rel="stylesheet" type="text/css" href="index.css" />
  </head>
  <body>
    <div id="app" v-cloak>
      <template v-if="list.length">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <input type="checkbox" v-model="all" @click="checkAll" />
              </th>
              <th>商品名称</th>
              <th>商品单价</th>
              <th>购买数量</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list">
              <td>{{ index+1 }}</td>
              <td>
                <input type="checkbox" v-model="item.chose" />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>
                <button
                  @click="handleReduce(index)"
                  :disabled="item.count === 1"
                >
                  -
                </button>
                {{ item.count }}
                <button @click="handleAdd(index)">+</button>
              </td>
              <td>
                <button @click="handleRemove(index)">移除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div>总价：￥{{ totalPrice }}</div>
      </template>
      <div v-else>购物车为空</div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="index.js"></script>
  </body>
</html>
```

```css
[v-cloak] {
  display: none;
}
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
}
th,
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    all: false,
    list: [
      {
        id: 1,
        name: 'iphone7',
        price: 2800,
        count: 1,
        chose: false,
      },
      {
        id: 2,
        name: 'ipad pro',
        price: 4396,
        count: 1,
        chose: false,
      },
      {
        id: 3,
        name: 'macbook',
        price: 4399,
        count: 1,
        chose: false,
      },
    ],
  },
  computed: {
    totalPrice: function () {
      var total = 0
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].chose === true) {
          var item = this.list[i]
          total += item.price * item.count
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    },
  },
  methods: {
    handleReduce: function (index) {
      if (this.list[index].count === 1) return
      this.list[index].count--
    },
    handleAdd: function (index) {
      this.list[index].count++
    },
    handleRemove: function (index) {
      this.list.splice(index, 1)
    },
    checkAll: function () {
      if (this.all === true) {
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].chose = false
        }
      } else {
        for (var i = 0; i < this.list.length; i++) {
          this.list[i].chose = true
        }
      }
    },
  },
})
```
