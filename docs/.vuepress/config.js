module.exports = {
  title: 'SRayJay\'s blog',
  description: '我的个人网站',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'manifest', href: '/photo.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/photo.jpg' }],
  ],
  serviceWorker: true, // 是否开启 PWA
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  theme: '',
  themeConfig: {
    displayAllHeaders: true, // 默认值：false
    nav:[ // 导航栏配置
      {text: '前端开发', link: '/articles/' },
      {text:'技术笔记',link:'/notes/'}
    ],
    // valine 评论系统
    valineConfig: {
      appId: 'm9S5QXsdju39LvMs8ooRRIiF-MdYXbMMI', // your appId
      appKey: 'UfBRjySkb4bjPiFuH0Pxe3a9', // your appKey
  },
  // 侧边栏 用工具自动获取文件夹结构,auto自动形成侧边导航
  sidebar: {
    '/notes/':[
      {
        title:'Vue',
        children:['Vue-路径','Vue3dian2','Vue3','Vue3添加公共方法方式','vue路由参数改变后不刷新的问题','Vue自动注册组件']
      },
      {
        title:'Koa',
        children:['koa-static']
      },
      {
      title:'CSS',
      children:['《深入解析css》笔记','《css揭秘》笔记','css常用技巧','css陋习和误区','cssnote']
    },{
      title:'JS',
      children:['正则表达式小结','es6','JavaScript技巧汇总','JS对象的直接赋值、浅拷贝深拷贝','Jsnote']
    },{
      title:'Other',
      children:['yarn和npm的区别']
    },
    {
      title:'Algorithm',
      children:['排序算法总结']
    },
      
    ],
    '/articles/':[
      'Vue3+TS给props声明类型用到泛型的问题','Koa2接口前端报错404','vite、esbuild以及webpack比较','前端解决跨域','JS工具函数集合'
    ]
  },
  // 最后更新时间
  lastUpdated: '上次更新',
  // 作者
  author: 'Webber',
    // sidebar:{
    //   '/notes/JS':['正则表达式小结','es6','JavaScript技巧汇总','JS对象的直接赋值、浅拷贝深拷贝','Jsnote'],
    //   '/notes/CSS/':['《深入解析css》笔记','《css揭秘》笔记','css 常用技巧','css陋习和误区','cssnote'],
    //   '/articles/':['Vue3+TS给props声明类型用到泛型的问题','Koa2接口前端报错404'],
    //   '/':[]
    // }
    // sidebar: [
    //   {
    //     title: '技术笔记',   // 必要的
    //     path: '/notes',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       {
    //         title:'CSS',
    //         path:'/notes/CSS/',
    //         sidebarDepth:1,
    //         children:['《深入解析css》笔记','《css揭秘》笔记','css 常用技巧','css陋习和误区','cssnote']
    //       },
    //       {
    //         title:'JS',
    //         path:'/notes/JS',
    //         sidebarDepth:1,
    //         children:[
    //           '/正则表达式小结','/es6','/JavaScript技巧汇总','/JS对象的直接赋值、浅拷贝深拷贝','/Jsnote'
    //         ]
              
    //           // '正则表达式小结','es6','JavaScript技巧汇总','JS对象的直接赋值、浅拷贝深拷贝','Jsnote']
    //       }
    //     ]
    //   },
    //   {
    //     title: '前端开发',   // 必要的
    //     path: '/articles',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    //     collapsable: false, // 可选的, 默认值是 true,
    //     sidebarDepth: 1,    // 可选的, 默认值是 1
    //     children: [
    //       'auto'
    //       // 'Vue3+TS给props声明类型用到泛型的问题','Koa2接口前端报错404'
    //     ]
    //   }
    // ]
    
    
    // {
    
    //   '/articles/':[{
    //     title:'Vue',
        
    //     children:['Vue3+TS给props声明类型用到泛型的问题','Koa2接口前端报错404']
    //   }],
    //   '/notes/':[{
    //     title:'CSS',
    //     children:['《深入解析css》笔记','《css揭秘》笔记','css 常用技巧','css陋习和误区','cssnote']
    //   }],
      
    //    '/':[''] 
    //   }
    
    // sidebarDepth: 2, // 侧边栏显示2级
  }
};