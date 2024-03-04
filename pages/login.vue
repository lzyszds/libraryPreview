<script setup lang="ts">
import { useRouter } from "vue-router";
import { userLogin } from "../api/userApi";
import { useStorage } from "@vueuse/core";

const host = import.meta.env.VITE_APP_HOST;
const form = ref({
  username: "",
  password: "",
  yzm: "",
  isRemember: false,
});
const router = useRouter();
const login = () => {
  const { username, password, yzm } = form.value;
  userLogin(username, password, yzm).then((res) => {
    if (res.code === 200) {
      localStorage.setItem("token", res.data);
      //设置cookie
      document.cookie = `token=${res.data};path=/`;
      router.push("/mine");
    }
  });
};
const handleCaptcha = () => {
  const img = document.querySelector(".yzm img");
  img?.setAttribute("src", host + "/Api/util/captcha?time=" + new Date().getTime());
};
</script>

<template>
  <div class="login">
    <div class="card">
      <div class="title">
        <h1>login</h1>
      </div>
      <div class="content">
        <div class="left">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="form">
          <div ref="username">
            <ElInput v-model="form.username" placeholder="账号" clearable>
              <template #prefix>
                <Icon
                  style="padding: 0px 0 3px; color: #999; font-size: 20px"
                  name="typcn:user-outline"
                ></Icon>
              </template>
            </ElInput>
          </div>
          <div ref="password">
            <ElInput
              v-model="form.password"
              type="password"
              placeholder="密码"
              clearable
              show-password
              @keydown.enter="login"
            >
              <template #prefix>
                <Icon
                  style="padding: 0px 0 3px; color: #999; font-size: 20px"
                  name="typcn:lock-closed-outline"
                ></Icon>
              </template>
            </ElInput>
          </div>
          <div class="yzm" ref="yzm">
            <ElInput
              v-model="form.yzm"
              type="text"
              placeholder="验证码"
              clearable
              @keydown.enter="login"
            >
              <template #prefix>
                <Icon
                  style="padding: 0px 0 3px; color: #999; font-size: 20px"
                  name="typcn:key-outline"
                ></Icon>
              </template>
            </ElInput>
            <img @click="handleCaptcha" :src="host + '/Api/util/captcha'" alt="" />
          </div>
          <div class="reserve">
            <el-checkbox v-model="form.isRemember" label="记住密码" />
          </div>
          <ElButton type="primary" @click="login">登录</ElButton>
          <ElButton type="primary" @click="login">注册</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color: #76d2ab;
$fontColor: #5163ce;
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: $color;
  .card {
    background-color: $fontColor;
    color: #fff;
    height: 400px;
    width: 800px;
    border-radius: 20px;
    box-shadow: 0 20px 10px rgba(0, 0, 0, 0.6);
    .title {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 80px;
      h1 {
        text-align: center;
        margin: 0;
        font-size: 3rem !important;
      }
    }
    .content {
      background-color: #fff;
      height: 320px;
      border-radius: 0 0 20px 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-content: center;
      align-items: center;
      &:deep(.el-form-item__label) {
        color: #000;
      }
      .left {
        width: 100%;
        text-align: center;
        img {
          width: 200px;
        }
      }
      .form {
        padding: 0 20px;
        width: 300px;
        height: 70%;
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        gap: 5px;
        font-family: "dindin" !important;
        .el-button + .el-button {
          margin: 0;
        }
        :deep(.ElInput__wrapper) {
          .ElInput__inner {
            font-family: "dindin" !important;
          }
          &.is-focus {
            svg {
              color: #76d2ab !important;
            }
          }

          --ElInput-focus-border-color: #76d2ab;
          --ElInput-hover-border-color: #76d2ab;
        }
        .yzm {
          display: flex;
          gap: 5px;
          img {
            height: 32px;
            width: 100px;
            cursor: pointer;
            border: 2px solid $color;
            border-radius: 5px;
          }
        }
        button {
          background-color: $color;
          border-color: $color;
          cursor: pointer !important;
          &:hover {
            background-color: #fff;
            color: $color;
          }
        }
        .el-checkbox {
          --el-checkbox-checked-bg-color: #76d2ab;
          --el-checkbox-checked-input-border-color: #76d2ab;
          --el-checkbox-checked-icon-color: #fff;
          --el-checkbox-checked-icon-border-color: #76d2ab;
          --el-checkbox-checked-text-color: #76d2ab;
        }
      }
    }
  }
}
</style>
