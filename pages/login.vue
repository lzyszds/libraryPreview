<script setup lang="ts">
import { useRouter } from "vue-router";
import { userLogin, userRegister } from "../api/userApi";
//@ts-ignore
import { LNotification } from "lzyutils";

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
    } else {
      LNotification(res.message);
    }
  });
};
const handleCaptcha = () => {
  const img = document.querySelector(".yzm img");
  img?.setAttribute("src", host + "/Api/util/captcha?time=" + new Date().getTime());
};

const isLogin = ref(true);
const registerForm = ref<any>({
  username: "",
  password: "",
  rePassword: "",
  name: "",
  sex: "男",
  email: "",
  phone: "",
  addres: "",
});
const register = () => {
  // 判断是否为空 允许为空的字段：性别、地址、电话、邮箱
  for (const key in registerForm.value) {
    if (['email', 'phone', 'addres'].includes(key)) continue
    if (!registerForm.value[key]) {
      LNotification("请填写完整信息");
      return;
    }
  }
  // 判断两次密码是否一致
  if (registerForm.value.password !== registerForm.value.rePassword) {
    LNotification("两次密码不一致");
    return;
  }
  // 发送请求
  userRegister(registerForm.value).then((res) => {
    if (res.code === 200) {
      LNotification("注册成功");
      isLogin.value = true;
    } else {
      LNotification(res.message);
    }
  });
};

const isOpen = ref(true);
//打开更多选项
const open = () => {
  isOpen.value = !isOpen.value;
};

</script>

<template>
  <div class="login">
    <div class="card" v-if="isLogin">
      <div class="title">
        <h1>登录</h1>
      </div>
      <div class="content">
        <div class="left">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="form">
          <div ref="username">
            <ElInput v-model="form.username" placeholder="账号" clearable>
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:user-outline"></Icon>
              </template>
            </ElInput>
          </div>
          <div ref="password">
            <ElInput v-model="form.password" type="password" placeholder="密码" clearable show-password
              @keydown.enter="login">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:lock-closed-outline"></Icon>
              </template>
            </ElInput>
          </div>
          <div class="yzm" ref="yzm">
            <ElInput v-model="form.yzm" type="text" placeholder="验证码" clearable @keydown.enter="login">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:key-outline"></Icon>
              </template>
            </ElInput>
            <img @click="handleCaptcha" :src="host + '/Api/util/captcha'" alt="" />
          </div>
          <div class="reserve">
            <el-checkbox v-model="form.isRemember" label="记住密码" />
          </div>
          <ElButton type="primary" @click="login">登录</ElButton>
          <ElButton type="primary" @click="isLogin = false">前往注册</ElButton>
        </div>
      </div>
    </div>
    <div class="card" v-else>
      <div class="title">
        <h1>注册</h1>
      </div>
      <div class="content">
        <div class="left">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="form">
          <div class="default" v-if="isOpen">
            <ElInput v-model="registerForm.username" placeholder="账号" clearable>
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:user-outline"></Icon>
              </template>
            </ElInput>
            <ElInput v-model="registerForm.password" type="password" placeholder="密码" clearable show-password
              @keydown.enter="login">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:lock-open-outline"></Icon>
              </template>
            </ElInput>
            <ElInput v-model="registerForm.rePassword" type="password" placeholder="重复密码" clearable show-password
              @keydown.enter="login">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:lock-closed-outline">
                </Icon>
              </template>
            </ElInput>
            <ElInput v-model="registerForm.name" placeholder="名称" @keydown.enter="register">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:mortar-board"></Icon>
              </template>
            </ElInput>
            <p class="openBtn" @click="open">
              <Icon name="typcn:arrow-sorted-down" />点击设置更多内容
            </p>
          </div>

          <div class="options" v-else>
            <!-- 性别 -->
            <div class="sex ">
              <label>
                <Icon name="guidance:unisex-restroom" />
              </label>
              <ElRadioGroup v-model="registerForm.sex">
                <ElRadio label="男">男</ElRadio>
                <ElRadio label="女">女</ElRadio>
              </ElRadioGroup>
            </div>
            <ElInput v-model="registerForm.email" placeholder="邮箱" @keydown.enter="register">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:mail"></Icon>
              </template>
            </ElInput>
            <ElInput v-model="registerForm.phone" placeholder="手机号" @keydown.enter="register">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:device-phone"></Icon>
              </template>
            </ElInput>
            <ElInput v-model="registerForm.addres" placeholder="地址" @keydown.enter="register">
              <template #prefix>
                <Icon style="padding: 0px 0 3px; color: #999; font-size: 20px" name="typcn:news"></Icon>
              </template>
            </ElInput>
            <p class="openBtn" @click="open">
              <Icon name="typcn:arrow-sorted-up" />点击设置更多内容
            </p>
          </div>
          <ElButton type="primary" @click="register">注册</ElButton>
          <ElButton type="primary" @click="isLogin = true">前往登录</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color: #76d2ab;
$fontColor: #5161ce;

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .card {
    background-color: $color;
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
        display: grid;
        gap: 5px;
        font-family: "dindin" !important;

        .el-button+.el-button {
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

        .default {
          display: grid;
          gap: 5px;
        }

        .options {
          display: grid;
          gap: 5px;
          overflow: hidden;

          .el-radio__inner {
            border-color: #76d2ab;
          }

          .el-radio__input {
            color: #76d2ab;
          }

          .sex {
            color: #000;
            box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
            border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
            display: grid;
            padding: 0 14px;
            grid-template-columns: 30px 1fr;
            justify-content: center;
            align-items: center;

            svg {
              font-size: 14px;
              color: #000;
            }
          }
        }

        p.openBtn {
          margin: 0;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          user-select: none;
          color: #000;
          border: 1px solid $color;
          border-radius: 3px;
          padding: 5px 0;

          &:hover {
            border: 1px solid $fontColor;
          }
        }
      }
    }
  }
}
</style>
