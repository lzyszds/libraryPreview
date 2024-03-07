<script setup lang="ts">
const colorMode = useColorMode();
const route = useRoute();
const router = useRouter();
const keyword = ref("");
if (route.path === "/stack") {
  keyword.value = route.query.keyword as string;
}
const searchbook = () => {
  if (keyword.value) {
    router.push(`/stack?keyword=${keyword.value}`);
  } else {
    router.push(`/stack`);
  }
};
const empty = () => {
  keyword.value = "";
};
</script>

<template>
  <header class="header" id="header">
    <div class="header_child">
      <div class="logo">
        <img src="../assets/images/logo.png" alt="" />
        <h3>书香雅苑</h3>
      </div>
      <div class="search">
        <input
          v-model="keyword"
          type="text"
          placeholder="书犹药也，善读之可以医愚"
          @keydown.enter="searchbook"
        />
        <span @click="searchbook"><Icon name="mingcute:search-line"></Icon></span>
      </div>
      <ul>
        <li @click="empty"><NuxtLink to="/">首页</NuxtLink></li>
        <li @click="empty"><NuxtLink to="/stack">书库</NuxtLink></li>
        <li @click="empty"><NuxtLink to="/mine">我的</NuxtLink></li>
        <li class="isDark">
          <Icon
            @click="$colorMode.preference = 'dark'"
            v-if="colorMode.preference == 'light'"
            name="line-md:sun-rising-filled-loop"
            class="light"
          ></Icon>
          <Icon
            @click="$colorMode.preference = 'light'"
            v-else
            name="line-md:moon"
            class="dark"
          ></Icon>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: clamp(550px, 100%, 100vw);
  height: 60px;
  background-color: transparent;
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  backdrop-filter: blur(0);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  .header_child {
    width: 60%;
    height: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(120px, 1fr) minmax(200px, 400px) minmax(200px, 420px);
    justify-content: center;
    align-items: center;

    .logo {
      height: 60px;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      user-select: none;
      img {
        width: 30px;
      }
    }
    .search {
      height: 60%;
      background-color: #eee;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        border: none;
        outline: none;
        padding: 10px 20px;
        font-size: 1.3rem;
        font-family: "dindin";
        width: 100%;
      }
      span {
        cursor: pointer;
        font-size: 2rem;
        height: 100%;
        width: 50px;
        border-radius: 0 5px 5px 0;
        text-align: center;
        line-height: 35px;
        transition: 0.5s background-color;
        background-color: var(--themeColor);
        color: #fff;
      }
    }
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        cursor: pointer;
        a {
          text-decoration: none;
          color: #000;
          font-size: 1.5rem;
          transition: 0.5s color;
          font-weight: 600;
        }
        &:hover a {
          color: var(--themeColor);
        }
      }
    }
    .isDark {
      display: flex;
      font-size: 2.2rem;
      cursor: pointer;
      padding: 0.2rem;
      svg {
        padding: 0.2rem;
      }
      &:active {
        svg {
          border-radius: 50%;
          transition: 0.5s background-color;

          &.light {
            background-color: #eee;
          }
          &.dark {
            background-color: #333;
          }
        }
      }
    }
  }
}

.dark-mode {
  .logo,
  h3 {
    filter: invert(1);
  }
  ul {
    a {
      filter: invert(1);
    }
  }
}
</style>
