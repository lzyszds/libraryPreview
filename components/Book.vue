<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Book } from "../types/book";
const router = useRouter();
const { item } = defineProps<{ item: Book }>();

const readIntDuction = () => {
  router.push({
    path: "/book/" + item.book_id,
  });
};
const host = import.meta.env.VITE_APP_HOST;
</script>

<template>
  <div class="book" @click="readIntDuction()">
    <img
      :src="host + item.cover"
      alt=""
      :on-error="host + '/static/images/coverUndefined.png'"
    />
    <div class="name">{{ item.book_name }}</div>
    <div class="category">
      <span># {{ item.category_name }}</span>
      <span>{{ item.author }}</span>
    </div>
    <div class="desc">{{ item.introduction }}</div>
  </div>
</template>

<style lang="scss" scoped>
.book {
  display: grid;
  gap: 0 5px;
  grid-template-areas:
    "cover name"
    "cover author"
    "cover desc";
  grid-template-rows: 33px 28px 1fr;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 9px;
  position: relative;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  &:hover {
    border-color: var(--themeColor);
    img {
      box-shadow: none;
    }
  }
  img {
    height: 120px;
    object-fit: cover;
    grid-area: cover;
    transition: 0.3s;
    border-radius: 10px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
  }
  .name {
    font-size: 16px;
    /* 超出显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "dindin";
  }
  .category {
    font-size: 10px;
    display: flex;
    gap: 10px;
    span {
      width: 50px;
      height: 12px;
      line-height: 12px;
      background-color: var(--themeColor);
      color: #fff;
      /* 超出显示省略号 */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 2px 5px;
      text-align: center;
      border-radius: 5px;
    }
  }
  .desc {
    font-size: 12px;
    height: 48px;
    /* 超出两行显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    background-color: #eee;
    padding: 2px;
    border-radius: 3px;
  }
}

.dark-mode {
  .book {
    background-color: #333;
    border-color: #fff;
    .name {
      color: #fff;
    }
    .category {
      span {
        background-color: #fff;
        color: #333;
      }
    }
    .desc {
      background-color: #555;
    }
  }
}
</style>
