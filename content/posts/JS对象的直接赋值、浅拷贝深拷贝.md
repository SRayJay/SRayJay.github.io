---
title: JS对象的直接赋值、浅拷贝深拷贝
date: 2021-11-21T17:18:23+08:00
draft: false
categories: note
tag: JavaScript
---

### 直接赋值

把一个对象a赋值给一个对象b相当于把一个对象b的地址指向对象a的地址，所以，他们实际上是同一个对象。由于内存地址我们很难监测到，但是我们可以通过严格相等运算符"==="来检测二者是否指向同一个地址。

<!--more-->

**直接赋值**，修改赋值后的对象b的非对象属性，也**会**影响原对象a的**非对象属性**；修改赋值后的对象b的对象属性，也**会**影响原对象a的**对象属性**。

### 浅拷贝

浅拷贝只会赋值制对象的非对象属性，不会指向同一个地址，而对象属性依然是指向同一个地址。

ES6中有个浅拷贝的方法Object.assign(target, ...sources)

修改赋值后的对象b的非对象属性，**不会**影响原对象a的**非对象属性**；修改赋值后的对象b的对象属性，却**会**影响原对象a的**对象属性**

```js
var person = {name:'webber',family:{text:'家',age:2},age:15}
var personCopy = {}
Object.assign(personCopy,person)
personCopy===person  // false
personCopy.family===person.family   //true
```

考虑到es6的支持程度，如果你的项目不支持es6，但是又想实现浅拷贝的话，也可以尝试js原生的concat方法。但由于concat只能操作数组，所以需要先将person封装为一个对象数组，写成这种形式：

> var person=[{name:"小明",ageAndSex:{age:16,sex:"男"}}];

> var personCopy=[].concat(person)；

到时想得到person对象的时候var personCopyObjet=pesronCopy[0]即可

### 深拷贝

深拷贝会另外拷贝一份一个一模一样的对象,但是不同的是会从堆内存中开辟一个新的区域存放新对象,新对象跟原对象不再共享内存，修改赋值后的对象b不会改到原对象a。即**深拷贝**，修改赋值后的对象b的非对象属性，**不会**影响原对象a的**非对象属性**；修改赋值后的对象b的对象属性，也**不会**影响原对象a的**对象属性**。而且，二者不指向同一个对象。

深拷贝，比较笨一点的办法就是将自己需要的数据自己封装起来。

有一种非常简单的方法就是序列化成为一个JSON字符串，将对象的内容转换成字符串的形式，再用JSON.parse()反序列化将JSON字符串变成一个新的对象，这样原对象就与复制后的新对象没了必然的关系。

但是由于用到了JSON.stringify()，这也会导致一系列的问题，因为要严格遵守**JSON序列化规则**：原对象中如果含有**Date对象**，JSON.stringify()会将其变为字符串，之后并不会将其还原为日期对象。或是含有**RegExp对象**，JSON.stringify()会将其变为空对象，属性中含有**NaN**、**Infinity**和**-Infinity**，则序列化的结果会变成null，如果属性中有**函数**,**undefined**,**symbol**则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失，因为不支持。这个时候只好使用笨点的方法。

