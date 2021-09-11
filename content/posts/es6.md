---
title: ES6笔记
date: 2021-05-21T20:57:31+08:00
categories: note
tags:
  - JavaScript
draft: false
---

## 一、let 和 var 的区别以及 const

- let 声明的变量**只在所在块中生效**；

- let 声明的变量可以解决 var 与 for 循环结合使用产生的无法取得最新变量值的问题（以往都需要通过闭包来解决这个问题）；

  <!--more-->

- let 声明的变量**不存在变量提升**，var 出的变量在脚本开始运行时就存在了，但值是 undefined，但用 let 会显示尚未定义；

- let 不允许重复声明；

const 声明的变量行为与 let 类似，只是多了两点更强的约束：

​ **1.声明时必须初始化；**

​ **2.声明的变量内存地址不可变。**

**需要注意的是**：对于用 const 声明基本类型，值就保存在内存地址之中，意味着变量不可重新赋值；对于用 const 声明的对象，对象内容还是可以更改的，只是不能改变其指向。（冻结对象应该用 Object.freeze()）

## 二、解构赋值

#### 1、数组解构

```swift
 let arr = [1, 2, 3];
 let [a, b, c] = arr;
 console.log(a, b, c) //1,2,3
```

#### 2、对象解构

```javascript
const person = {
  name: 'qiyue',
  age: 23,
  language: ['java', 'js', 'css'],
}
const { name, age, language } = person
console.log(name, age, language) //qiyue 23 (3) ["java", "js", "css"]
```

```javascript
const person = {
  name: 'qiyue',
  age: 23,
  language: ['java', 'js', 'css'],
}
//从person里解析出name的值在赋值给abc
const { name: abc, age, language } = person
console.log(abc, age, language) //qiyue 23 (3) ["java", "js", "css"]
```

## 三、字符串

1、拓展方法：

- **includes()**：返回布尔值，判断是否找到参数字符串。
- **startsWith()**：返回布尔值，判断参数字符串是否在原字符串的头部。
- **endsWith()**：返回布尔值，判断参数字符串是否在原字符串的尾部。
- **repeat()**：返回新的字符串，表示将字符串重复指定次数返回。
- **padStart**：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
- **padEnd**：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。

2、模板字符串

普通字符串

```js
let string = `Hello'\n'world`
console.log(string)
// "Hello'
// 'world"
```

多行字符串:

```js
let string1 = `Hey,
can you stop angry now?`
console.log(string1)
// Hey,
// can you stop angry now?
```

字符串插入变量和表达式。

变量名写在 ${} 中，${} 中可以放入 JavaScript 表达式。

```js
let name = 'Mike'
let age = 27
let info = `My Name is ${name},I am ${age + 1} years old next year.`
console.log(info)
// My Name is Mike,I am 28 years old next year.
```

字符串中调用函数：

```js
function f() {
  return 'have fun!'
}
let string2 = `Game start,${f()}`
console.log(string2) // Game start,have fun!
```

3、标签模板

标签模板，是一个函数的调用，其中调用的参数是模板字符串。

```js
alert`Hello world!`
// 等价于
alert('Hello world!')
```

当模板字符串中带有变量，会将模板字符串参数处理成多个参数。

```js
function f(stringArr, ...values) {
  let result = ''
  for (let i = 0; i < stringArr.length; i++) {
    result += stringArr[i]
    if (values[i]) {
      result += values[i]
    }
  }
  return result
}
let name = 'Mike'
let age = 27
f`My Name is ${name},I am ${age + 1} years old next year.`
// "My Name is Mike,I am 28 years old next year."

f`My Name is ${name},I am ${age + 1} years old next year.`
// 等价于
f(['My Name is', ',I am ', ' years old next year.'], 'Mike', 28)
```

## 四、函数

1、函数默认值：直接给参数写上默认值，没传就会自动使用默认值。

```js
function add(a, b = 1) {
  return a + b
}
console.log(add(10)) //11
```

2、不定参数：不定参数用了表示不确定的参数个数，形如…变量名，由…加上要给具名参数标识符组成。具名参数只能放在参数列表的最后，并且有且只有一个不定参数

```js
function f(...values) {
  console.log(values.length)
}
f(1, 2) //2
f(1, 2, 3, 4) //4
```

3、箭头函数

```js
var f = (v) => v
//等价于
var f = function (a) {
  return a
}
```

当箭头函数没有参数或者有多个参数，要用 **()** 括起来。

```js
var f = (a, b) => a + b
f(6, 2) //8
var f = () => console.log(123)
f() //123
```

当箭头函数函数体有多行语句，用 **{}** 包裹起来，表示代码块，当只有一行语句，并且需要返回结果时，可以省略 **{}** , 结果会自动返回。

> 注意点：没有 this、super、arguments 和 new.target 绑定。this 对象是外层的 this

4、箭头函数结合解构表达式

```js
//以前
function hello(person) {
  console.log('hello' + person.name)
}
hello(person) //helloqiyue
//箭头函数
let hello2 = (params) => console.log('hello' + person.name)
hello2(person) //helloqiyue
//箭头函数加解构表达式
var hello3 = ({ name }) => console.log('hello' + name)
hello3(person) //helloqiyue
```

5、箭头函数和普通函数的区别

- 箭头函数没有自己的 this，指向的是外层的，且指向永远不变
- 箭头函数的 this 不能被 call、apply、bind 改变
- 箭头函数不能做构造函数
- 箭头函数没有 arguments

## 五、对象

1、新方法：

- key(obj)：获取对象的所有 key 形成的数组
- value(obj):获取对象的所有 value 形成的数组
- entries(obj):获取对象所有的 key 和 value 形成的二维数组

```js
const person = {
  name: 'qiyue',
  age: 23,
  language: ['java', 'js', 'css'],
}
console.log(Object.keys(person)) //["name","age","language"]
console.log(Object.values(person)) // ["qiyue",23,Array(3)]
console.log(Object.entries(person)) //[Array(2),Array(2),Array(2)]
```

2、Object.assign 方法的第一个参数是目标对象，后面的参数都是源对象；将源对象的属性赋值到目标对象中

```js
const target = { a: 1 }
const source1 = { b: 2 }
const source2 = { c: 3 }
Object.assign(target, source1, source2)
console.log(target) //{a: 1, b: 2, c: 3}
```

3、 声明对象简写

```js
//以前
const name = 'sanyue'
const age = 21
//将属性值name，age分别赋给person1对象的name，age,后面是属性值
const person1 = { name: name, age: age }
console.log(person1) //{name: "sanyue", age: 21}

//es6:属性名和属性值变量名一样，可以省略
const person2 = { name, age }
console.log(person2) //{name: "sanyue", age: 21}
```

4、对象的函数属性简写

```js
let person3 = {
  name: 'qiyue',
  //以前
  eat: function (food) {
    console.log(this.name + '在吃' + food)
  },
  //箭头函数中this不能使用，用对象.属性
  eat2: (food) => console.log(person3.name + '在吃' + food),
  eat3(food) {
    console.log(this.name + '在吃' + food)
  },
}
person3.eat('苹果') //qiyue在吃苹果
person3.eat2('香蕉') // qiyue在吃香蕉
person3.eat3('西瓜') //qiyue在吃西瓜
```

5、对象的扩展运算符

扩展运算符（…)用于取出参数对象所有可遍历属性然后拷贝到当前对象

```js
//拷贝对象（深拷贝）
let p1 = { name: 'qiyue', age: 23 }
let obj = { ...p1 }
console.log(obj) //{name: "qiyue", age: 23}

//合并对象
let age1 = { age: 24 }
let name1 = { name: 'qiyue' }
let p2 = {}
p2 = { ...age1, ...name1 }
console.log(p2) //{age: 24, name: "qiyue"}
//如果p2中原本有name,age属性会被覆盖
```

## 六、Promise

promise 是处理异步操作的对象。promise 在新建后就会立刻执行，但是回调函数（then）要在当前脚本所有同步任务执行完成后才会执行。

以下是一个基本用法示例。

```js
let promise = new Promise((resolve,reject)=>{
    // ...
    if(/*异步操作成功*/){
       resolve(value);
    }else{
       reject(error);
    }
}).then((data)=>{
    console.log(data);    //success操作返回，即pending=>fulfilled
},(error)=>{
    console.log(error);   //错误返回（可省略），即pending=>rejected
})
```
