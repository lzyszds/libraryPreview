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
        <h2>热门推荐</h2>
        <div class="bookList">
          <BookList />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
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
    .bookList {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
}
</style>
