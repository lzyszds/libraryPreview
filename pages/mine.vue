<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { voucherToken } from "../api/userApi";
//如果未登录，跳转到登录页面
import { useRouter } from "vue-router";
const token = useLocalStorage("token", "");
const data = ref(await voucherToken());

if (!token || typeof data.value === "string") {
  const router = useRouter();
  router.push("/login");
  ElNotification({
    title: "提示",
    message: "请先登录",
    type: "warning",
  });
}
const tools = [
  {
    title: "个人中心",
    icon: "typcn:user-outline",
    component: "center",
  },
  {
    title: "借阅历史",
    icon: "typcn:th-small-outline",
    component: "history",
  },
  {
    title: "我的收藏",
    icon: "typcn:star-outline",
    component: "collect",
  },
];
const activeTool = ref("center");
</script>

<template>
  <div class="mine">
    <div class="card">
      <div class="tools">
        <div class="info">
          <img src="../assets/images/user.png" alt="" />
          <h2>{{ data?.username }}</h2>
          <p>{{ data?.email }}</p>
        </div>
        <div
          v-for="(item, index) in tools"
          :key="index"
          :class="{ active: activeTool == item.component }"
          @click="activeTool = item.component"
          class="item"
        >
          <Icon :name="item.icon"></Icon>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  .card {
    width: 1280px;
    height: 800px;
    margin: 100px auto;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: grid;
    grid-template-columns: 200px 1fr;
    .tools {
      display: grid;
      gap: 10px;
      align-content: start;
      .info {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
        height: 158px;
        img {
          width: 100px;
          height: 100px;
          margin-bottom: 10px;
          border-radius: 10px;
          box-shadow: 0 2px 2px rgba(127, 108, 255, 0.4),
            0 -1px 2px rgba(255, 87, 87, 0.4);
        }
        h2 {
          margin: 0;
        }
        p {
          color: #666;
          margin: 0;
        }
      }
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer !important;
        vertical-align: bottom;
        height: 50px;
        border-radius: 5px;
        gap: 10px;
        &:hover,
        &.active {
          color: #fff;
          background-color: var(--themeColor);
        }
        svg{
          font-size: 22px;
        }
      }
    }
  }
}
</style>
