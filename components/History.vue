<script setup lang="ts">
import { getBorrowedBooks, getBookLoanByUserId } from "../api/bookloanApi";
import type { Book } from "../types/book";
const books = ref<Book[]>([]);

//获取借阅记录归还时间等详情信息
const loanInfo = ref();
const getLoanInfo = async () => {
  loanInfo.value = await getBookLoanByUserId();
};

//获取借阅记录
setTimeout(async () => {
  await getLoanInfo();
  books.value = await getBorrowedBooks();
}, 50);
const refresh = async () => {
  books.value = await getBorrowedBooks();
};
</script>

<template>
  <div>
    <h1 style="text-align: center">借阅记录中心</h1>
    <div v-if="books.length != 0" class="history">
      <Book v-for="(item, index) in books" :key="index" :item="item"></Book>
    </div>
    <!-- 提醒没有数据 -->
    <div v-else style="text-align: center; margin-top: 20px">
      <el-empty description="书籍是最好的朋友，快来结识您的新朋友吧！">
        <el-button type="primary" @click="refresh">刷新</el-button>
      </el-empty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("../assets/sass/element.scss");
.history {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
