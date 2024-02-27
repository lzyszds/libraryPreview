<script setup lang="ts">
import { getBooklist } from "../api/books";
const booklist = ref<any>();
const { data } = await getBooklist();
booklist.value = data;
const host = import.meta.env.VITE_APP_HOST;
</script>

<template>
  <div class="book" v-for="(item, index) in booklist" :key="item.id">
    <img :src="host + item.cover" alt="" />
    <div class="name">{{ item.book_name }}</div>
    <div class="author">{{ item.author }}</div>
    <div class="desc">{{ item.desc }}</div>
  </div>
</template>

<style lang="scss" scoped>
.book {
  width: 300px;
  display: grid;
  gap: 10px;
  grid-template-areas:
    "cover name"
    "cover author"
    "cover desc";
  box-sizing: border-box;
  width: 290px;
  min-width: 290px;
  max-width: 290px;
  padding: 8px;
  border-radius: 9px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.12);
  img {
    height: 120px;
    object-fit: cover;
    grid-area: cover;
    border-radius: 10px;
    filter:drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));
  }
  .name {
    font-size: 1.5rem;
    margin-top: 10px;
  }
  .author {
    font-size: 16px;
    margin-top: 10px;
  }
  .desc {
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
