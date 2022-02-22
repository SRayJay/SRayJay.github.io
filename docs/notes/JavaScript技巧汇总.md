# JavaScript 技巧汇总

date: 2021-11-21T17:04:32+08:00

## **1、console.log 变量包装**

您在 console.log() 的时候，将参数用大括号括起来，这样可以同时看到变量名和变量值。

<!--more-->

```js
const number = 123;
console.log({ number });
//{number:123}
```

## **2、从数组中获取最小值/最大值**

您可以使用 Math.min() 或 Math.max() 结合扩展运算符来查找数组中的最小值或最大值。

```javascript
const numbers = [6, 8, 1, 3, 9];
console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers)); // 1
```

## **3、简写条件判断语句**

如果仅在判断条件为 true 时才执行函数，则可以使用 && 简写。

```js
// 普通写法
if (condition) {
  doSomething();
}

// 简写
condition && doSomething();
```

## **4、数组去重**

```js
function unique1(arr) {
  return [...new Set(arr)];
}

function unique2(arr) {
  var obj = {};
  return arr.filter((ele) => {
    if (!obj[ele]) {
      obj[ele] = true;
      return true;
    }
  });
}

function unique3(arr) {
  var result = [];
  arr.forEach((ele) => {
    if (result.indexOf(ele) == -1) {
      result.push(ele);
    }
  });
  return result;
}
```

## **5、将字符串转换为数字**

```js
const str = "404";
console.log(+str); // 404;
```

## **6、从数组中过滤所有虚值**

```js
const myArray = [1, undefined, NaN, 2, null, "@denicmarko", true, 3, false];
console.log(myArray.filter(Boolean)); // [1, 2, "@denicmarko", true, 3]
```
