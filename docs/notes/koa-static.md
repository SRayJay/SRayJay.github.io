# Koa 搭建静态资源文件服务器及图片上传接口的实现

date: 2021-08-30T23:30:51+08:00

场景：前端需要上传图片到服务器，保存在固定目录下，并返回一个外部可访问的 url 给客户端。

需要的工具：koa-body，koa-static, path

<!--more-->

#### 引入

```js
// app.js
const koaBody = require("koa-body");
const path = require("path");
const koaStatic = require("koa-static");
```

#### 调用中间件

```javascript
app.use(koaStatic(path.join(__dirname + "/public")));
app.use(
  koaBody({
    // 支持文件格式
    multipart: true, // 允许多个文件一起上传
    formidable: {
      // 上传目录
      uploadDir: path.join(__dirname, "public/uploads"),
      // 保留文件扩展名
      keepExtensions: true,
    },
  })
);
```

> app.use(koaStatic(path.join(\_\_dirname, './upload/'))) 这一步已经允许外部访问 public 目录下的静态资源了

#### 接口部分给出 url

```js
router.post("/upload", async (ctx, next) => {
  const file = ctx.request.files.file;
  const basename = path.basename(file.path);
  ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
});
```

这样返回来的 url 是可以直接访问的。
