<script setup lang="ts">
interface props {
  data?: any;
  [key: string]: any;
}

const { data } = defineProps<props>();
</script>

<template>
  <Book v-for="(item, index) in data" :key="item.id" :item="item"></Book>
</template>

<style lang="scss" scoped></style>
