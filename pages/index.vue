<script setup lang="ts">
import {
  getHotBookList,
  getNewBookList,
  getBookListByField,
  getTopNCategories,
} from "../api/bookApi";
// 使用颜色模式
const colorMode = useColorMode();
// 获取热门分类
const hotCategory = (await getTopNCategories(5)).data.map(
  (item: any) => item.categoryName
);
// 分类值
const categoryValue = ref<any>("智能制造");
// 热门书籍
const hot = ref<any>();
// 新书
const news = ref<any>();
// 分类书籍
const category = ref<any>();
//网文小说
const fiction = ref<any>();
try {
  // 同时获取热门书籍、新书和分类书籍
  const results = await Promise.all([
    getHotBookList(),
    getNewBookList(),
    getBookListByField(categoryValue.value, 1, 5, "category_name"),
    getBookListByField("小说", 1, 5, "category_name"),
  ]);
  console.log(`lzy  results:`, results)
  hot.value = results[0].data;
  news.value = results[1].data;
  category.value = results[2].data;
  fiction.value = results[3].data;
} catch (error) {}

// 激活分类
const activeCategory = (item: string) => {
  categoryValue.value = item;
  // 获取分类书籍
  getBookListByField(categoryValue.value, 1, 5, "category_name").then((res) => {
    category.value = res.data;
  });
};

const changeCover = ref<any>([]);
onMounted(() => {
  changeCover.value =
    colorMode.value === "dark"
      ? ["drakcover", "/admin/uploadFile/static/dark.jpg"]
      : ["image", "/admin/uploadFile/static/cover.png"];
});
watch(colorMode, () => {
  changeCover.value =
    colorMode.value === "dark"
      ? ["drakcover", "/admin/uploadFile/static/dark.jpg"]
      : ["image", "/admin/uploadFile/static/cover.png"];
});
</script>

<template>
  <div class="home">
    <div class="cover">
      <img :class="changeCover[0]" :src="changeCover[1]" alt="" />
    </div>
    <div class="bookContent">
      <div class="hot">
        <h2 class="title">热门推荐</h2>
        <div class="bookList">
          <BookList :data="hot" />
        </div>
      </div>
      <div class="news">
        <h2 class="title">新书抢鲜</h2>
        <div class="bookList">
          <BookList :data="news" />
        </div>
      </div>
      <div class="sort">
        <h2 class="title">
          热门分类
          <p>
            <button
              v-for="(item, index) in hotCategory"
              :key="index"
              :class="{ active: item === categoryValue }"
              @click="activeCategory(item)"
            >
              {{ item }}
            </button>
          </p>
        </h2>
        <div class="bookList">
          <BookList :data="category" />
        </div>
      </div>
      <div class="fiction">
        <h2 class="title">网文小说</h2>
        <div class="bookList">
          <BookList :data="fiction" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.home {
  overflow-y: auto;
  height: 100vh;
  .cover {
    height: 500px;
    text-align: center;
    .image {
      height: 500px;
      height: 100%;
      object-fit: cover;
    }
    .drakcover {
      height: 500px;
      width: 100%;
    }
  }
  .bookContent {
    width: 1280px;
    margin: 0 auto 100px;
    h2.title {
      position: relative;
      padding-left: 20px;
      display: grid;
      grid-template-columns: 200px 1fr;
      justify-content: center;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 30px;
        background-color: #f90;
        border-radius: 10px;
      }
      p {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin: 0;
        button {
          color: #000;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer !important;
          transition: 0.3s;
          &:hover,
          &.active {
            background-color: #ff1e1e;
            color: #fff;
          }
        }
      }
    }
    .bookList {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
    }
  }
}
</style>
../api/bookApi
