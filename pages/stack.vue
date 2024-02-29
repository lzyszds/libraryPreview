<script setup lang="ts">
import { searchBook } from "../api/books";
import { useRoute } from "vue-router";
const router = useRoute();
const limit = 2;
const bookResult = ref<{ data: any[]; count: number }>({
  data: [],
  count: 0,
});
const alterBookList = async (val: number) => {
  const keyword = router.query.keyword ? (router.query.keyword as string) : "";
  const { data } = await searchBook(keyword, val, limit);
  bookResult.value = data;
};
alterBookList(1);
const sizeChange = (val: number) => {
  alterBookList(val);
};

watch(
  () => router.query.keyword,
  (val) => {
    alterBookList(1);
  }
);

const isEmpty = ref(false);
watch(
  () => bookResult.value.data,
  (val) => {
    if (val.length === 0) {
      isEmpty.value = true;
    } else {
      isEmpty.value = false;
    }
  }
);
</script>

<template>
  <div v-if="!isEmpty" class="stackMain">
    <div class="bookLibray">
      <Book v-for="(item, index) in bookResult.data" :key="item.id" :item="item"></Book>
    </div>
    <div class="example-pagination-block">
      <el-pagination
        layout="prev, pager, next"
        @size-change="sizeChange"
        @current-change="sizeChange"
        :page-size="limit"
        :total="bookResult.count"
      />
    </div>
  </div>
  <ElEmpty class="empty" v-else description="查询不到东西" />
</template>

<style lang="scss" scoped>
.stackMain {
  width: 1280px;
  height: 800px;
  margin: 100px auto;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  .bookLibray {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
  }
  .example-pagination-block {
    margin-top: 10px;
    .el-pagination {
      justify-content: center;
      --el-pagination-hover-color: var(--themeColor);
    }
  }
}
.empty {
  width: 1280px;
  height: 800px;
  margin: 100px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  .el-empty__description {
    font-size: 1.5rem;
  }
  .el-empty__image {
    width: 200px;
    height: 200px;
  }
  .el-empty__description {
    margin-top: 20px;
  }
}
.dark-mode {
  .stackMain {
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
    .el-pagination {
      --el-pagination-button-disabled-bg-color: #091a28;
      --el-pagination-bg-color: #091a28;
      --el-pagination-button-color: #fff;
    }
  }
  .empty {
    background-color: #000;
  }
}
</style>
