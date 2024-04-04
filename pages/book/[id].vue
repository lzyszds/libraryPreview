<script setup lang="ts">
import { getBookInfo } from "../../api/bookApi";
import { borrowBook } from "../../api/bookloanApi";
import { useRoute } from "vue-router";
//@ts-ignore
import { tipNotify } from "lzyutils";
const id = useRoute().params.id as string;
const { data } = await getBookInfo(id);
const host = import.meta.env.VITE_APP_HOST;
let timer: any = null;
//设定一个定时器，来实现防抖
const borrowing = async () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(async () => {
    //获取书籍副本id 通过书本id来获取
    try {
      ElNotification.closeAll();
      const res = await borrowBook(data.bookId);
      if (!res) {
        return ElNotification({
          title: "借阅失败",
          message: "请前往我的界面先登录",
          type: "error",
          position: "bottom-right",
        });
      }
      return ElNotification({
        title: "借阅成功",
        message: "请在我的借阅中查看",
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      ElNotification({
        title: "借阅失败",
        message: "请先登录",
        type: "error",
        position: "bottom-right",
      });
    }
    clearTimeout(timer);
  }, 300);
};
</script>

<template>
  <main class="container">
    <section class="book-info">
      <img :src="host + data.cover" alt="书籍封面" />
    </section>
    <section class="description">
      <h1>《{{ data.bookName }}》</h1>
      <p>
        <span>作者：</span>
        <nuxt-link :to="'/stack?keyword=' + data.author">{{ data.author }}</nuxt-link>
      </p>
      <p>
        <span>学科：</span>
        <nuxt-link :to="'/stack?keyword=' + data.categoryName">
          {{ data.categoryName }}
        </nuxt-link>
      </p>
      <p>
        <span>出版社：</span>
        <nuxt-link :to="'/stack?keyword=' + data.publisher">
          {{ data.publisher }}
        </nuxt-link>
      </p>
      <p><span>出版日期：</span>{{ data.publishDate }}</p>

      <p><span>ISBN：</span>{{ data.isbn }}</p>
      <p>
        <span>是否允许外借：</span>
        <el-tooltip class="box-item" effect="dark" :content="data.isBorrowable == 1 ? '不支持借阅' : '点击借阅'"
          placement="right">
          <ElButton v-if="data.isBorrowable == 1" color="#ff1e1e">馆内阅读</ElButton>
          <ElButton @click="borrowing" v-else color="#626aef">借阅书籍</ElButton>
        </el-tooltip>
      </p>
      <p class="descTitle">简介</p>
      <p class="desc">
        {{ data.introduction }}
      </p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.container {
  width: 1280px;
  margin: 200px auto;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: grid;
  gap: 0 50px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "img title"
    "img author"
    "img publisher"
    "img publish_date";

  .book-info {
    perspective: 1000px;
    transform-style: preserve-3d;
    height: 400px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);

    img {
      grid-area: img;
      width: 300px;
      height: 400px;
      object-fit: cover;
      border-radius: 5px;
      /* 倾斜45 */
      transform: rotateY(-25deg);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
      transform-origin: 0 0;
    }
  }

  .description {
    h1 {
      margin: 0;
      font-size: 3rem;
      font-family: "dindin";
    }

    span {
      color: #999;
    }

    a {
      color: var(--themeColor);
      cursor: pointer !important;

      &:hover {
        color: rgb(0, 30, 255);
      }
    }

    .descTitle {
      font-size: 2rem;
      font-family: "dindin";
      font-weight: 600;
      position: relative;
      padding-left: 10px;

      &:after {
        content: "";
        width: 5px;
        height: 100%;
        background-color: var(--themeColor);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 0 10px 10px 0;
      }
    }
  }

  .el-button {
    cursor: pointer !important;
  }
}

.dark-mode {
  .container {
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);

    .el-button {
      --el-button-text-color: #fff;
      --el-button-background-color: var(--themeColor);
    }
  }
}
</style>
../../api/bookApi
