<script setup lang="ts">
import { getBooklist } from "../api/books";

const booklist = ref<any>();
const { data } = await getBooklist();
booklist.value = data.data;
</script>

<template>
  <Book v-for="(item, index) in booklist" :key="item.id" :item="item"></Book>
</template>

<style lang="scss" scoped></style>
