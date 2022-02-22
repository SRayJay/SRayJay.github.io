# Vue3+TS 给 props 声明类型用到泛型的问题

情景是这样的，当前组件需要接收父组件通过 props 传入的一个数组，而数组的每一项都是自定义的类型 Book，需要再传入到子组件。

而 props 声明类型时一般都是基础类型，但上面又需要用到 book 类型下的属性，这里就得用到 Vue 的 PropType 这一条了，可以在官网文档找到。

```javascript
<BookList
    v-for="book in Books"
    :key="book.bookId"
    :book-title="book.bookTitle"
    :book-author="book.authorName"
></BookList>

//JS
import {PropType} from 'vue'
props:{
  'Books':{
      type: Array as PropType<Book[]>,
      default:()=>{return []}
  }
}

```
