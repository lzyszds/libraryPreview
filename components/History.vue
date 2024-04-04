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
      <div v-for="(item, index) in books" :key="index" class="divRuturn">
        <Book :item="item">
        </Book>
        <span class="trueRuturn" v-if="loanInfo[index].returnDate">已归还</span>
        <span class="falseRuturn" v-else>未归还</span>
      </div>
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

.divRuturn {
  display: grid;
  gap: 5px;
  position: relative;
  overflow: hidden;
}

.trueRuturn,
.falseRuturn {
  padding: 3px 10px;
  border-radius: 5px;
  width: 30%;
  text-align: center;
  font-size: 1.2rem;
  font-family: 'dindin';
  color: #fff;
  position: absolute;
  top: 10px;
  right: -40px;
  transform: rotate(45deg);
}


.trueRuturn {
  background-color: var(--themeColor);
}

.falseRuturn {
  background-color: rgb(255, 75, 75);
}
</style>
