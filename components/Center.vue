<script setup lang="ts">
import { userEdit, voucherToken } from "../api/userApi";
import type { User } from "../types/user";
import { useStore } from "../store";
const store = useStore();
const loading = ref(true);

const save = () => {
  const info = {
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
    sex: userInfo.sex,
  };
  userEdit(info).then(async (res) => {
    if (res.code === 200) {
      ElNotification({
        title: "提示",
        message: "保存成功",
        type: "success",
      });
      const result = await voucherToken();
      localStorage.setItem("userInfo", JSON.stringify(result));
    }
  });
};
onMounted(() => {
  loading.value = false;
});
</script>
<template>
  <div class="center" v-if="loading == false">
    <h1 style="text-align: center">个人信息修改中心</h1>
    <div class="info">
      <p>
        用户名：<ElInput color="#5161ce" v-model="store.userInfo.username" disabled />
      </p>
      <p>姓名：<ElInput color="#5161ce" v-model="store.userInfo.name" /></p>
      <p>
        性别：
        <el-radio-group v-model="store.userInfo.sex" size="large">
          <el-radio-button label="男" value="男" />
          <el-radio-button label="女" value="女" />
        </el-radio-group>
      </p>
      <p>电话：<ElInput color="#5161ce" v-model="store.userInfo.phone" /></p>
      <p>邮箱：<ElInput color="#5161ce" v-model="store.userInfo.email" /></p>
      <p>地址：<ElInput color="#5161ce" v-model="store.userInfo.address" /></p>
      <p style="display: flex; justify-content: center">
        <ElButton style="width: 200px" type="primary" @click="save">保存</ElButton>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center {
  h1 {
    color: var(--themeColor);
    margin-bottom: 50px;
    text-shadow: 0 0 1px #000;
  }
  .info {
    width: 80%;
    height: 50%;
    margin: 0 auto;
    p {
      display: grid;
      grid-template-columns: 100px 1fr;
      line-height: 40px;
    }
  }
  :deep(.el-button--primary) {
    --el-button-border-color: var(--themeColor) !important;
    --el-button-hover-border-color: var(--themeHoverColor) !important;
    --el-button-primary-color: var(--themeColor) !important;
    --el-button-primary-hover-color: var(--themeHoverColor) !important;
    --el-button-bg-color: var(--themeColor) !important;
    --el-button-hover-bg-color: var(--themeHoverColor) !important;
    cursor: pointer !important;
  }
  :deep(.el-input) {
    --el-color-primary: var(--themeColor) !important;
  }
  :deep(.el-radio-group) {
    --el-color-primary: var(--themeColor) !important;
  }
}
</style>
