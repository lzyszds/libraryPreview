<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { voucherToken } from "../api/userApi";
import { useSessionStorage } from "@vueuse/core";
import Center from "../components/Center.vue";
import History from "../components/History.vue";
const activeTool = useSessionStorage("activeTool", "Center");
const router = useRouter();

const components: any = {
  Center,
  History,
};
const store = useStore();
const hasRander = ref(false);

onMounted(async () => {
  const token = localStorage.getItem("token");
  //如果未登录，跳转到登录页面
  if (!token) {
    const router = useRouter();
    router.push("/login");
    ElNotification({
      title: "提示",
      message: "请先登录",
      type: "warning",
    });
  } else {
    store.userInfo = await voucherToken();
    if (!store.userInfo) {
      ElNotification({
        title: "提示",
        message: "登录已过期，请重新登录",
        type: "warning",
      });
      localStorage.removeItem("token");
      router.push("/login");
    }
    hasRander.value = true;
  }
});
const tools = [
  {
    title: "个人中心",
    icon: "typcn:user-outline",
    component: "Center",
  },
  {
    title: "借阅历史",
    icon: "typcn:th-small-outline",
    component: "History",
  },
  {
    title: "退出登录",
    icon: "mingcute:exit-fill",
    handle: () => {
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
];
const isActive = (item: any) => {
  return activeTool.value === item.component;
};

const active = (item: any) => {
  if (item.handle) return item.handle();
  activeTool.value = item.component;
};
</script>

<template>
  <div class="mine">
    <div class="card" v-if="hasRander">
      <div class="tools">
        <div class="info">
          <img src="../assets/images/user.png" alt="" />
          <h2>{{ store.userInfo?.username }}</h2>
          <p>{{ store.userInfo?.email }}</p>
        </div>
        <div
          v-for="(item, index) in tools"
          :key="index"
          :class="{ active: isActive(item) }"
          @click="active(item)"
          class="item"
        >
          <Icon :name="item.icon"></Icon>
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="content">
        <component :is="components[activeTool]"></component>
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
        svg {
          font-size: 22px;
        }
      }
    }
  }
  .content {
    :deep(h1) {
      color: var(--themeColor);
      margin-bottom: 50px;
      text-shadow: 0 0 1px #000;
    }
  }
}
</style>
