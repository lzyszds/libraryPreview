<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
useEventListener("scroll", () => {
  const header = document.getElementById("header");
  const y = window.scrollY;
  if (header) {
    if (y > 0) {
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.backdropFilter = "none";
    }
  }
});
</script>

<template>
  <div id="app" ref="main">
    <Header />
    <Suspense>
      <NuxtPage />
    </Suspense>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
