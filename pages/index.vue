<script setup lang="ts">

const colorMode = useColorMode();


</script>

<template>
  <div class="home">
    <div class="cover">
      <img
        v-if="colorMode.preference == 'light' || colorMode.preference == 'system'"
        class="image"
        src="../assets/images/cover.png"
        alt=""
      />
      <img class="drakcover" v-else src="../assets/images/dark.jpg" alt="" />
    </div>
    <div class="bookContent">
      <div class="hot">
        <h2 class="title">热门推荐</h2>
        <div class="bookList">
          <BookList />
        </div>
      </div>
      <div class="news">
        <h2 class="title">新书抢鲜</h2>
        <div class="bookList">
          <BookList />
        </div>
      </div>
      <div class="sort">
        <h2 class="title">热门分类</h2>
        <div class="bookList">
          <BookList />
        </div>
      </div>
      <div class="fiction">
        <h2 class="title">网文小说</h2>
        <div class="bookList">
          <BookList />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  overflow-y: auto;
  height: 100vh;
  .cover {
    height: 500px;
    background-color: #f0f0f0;
    background-color: #fff;
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
    margin: 0 auto;
    h2.title {
      position: relative;
      padding-left: 20px;
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
    }
    .bookList {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
    }
  }
}
</style>
