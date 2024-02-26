<script setup lang="ts"></script>

<template>
  <div class="home">
    <div class="cover">
      <img class="image" src="../assets/images/cover.png" alt="" />
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
      height: 100%;
      object-fit: cover;
    }
  }
}
.dark-mode{
  .cover{
    filter: contrast(.5);
  }
}
</style>
