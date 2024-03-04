// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', 'nuxt-icon', '@nuxtjs/color-mode', "@pinia/nuxt"],
  alias: {
    "~": "/<srcDir>",
    "@": "/<srcDir>",
    "~~": "/<rootDir>",
    "@@": "/<rootDir>",
    "assets": "/<srcDir>/assets",
    "public": "/<srcDir>/public"
  },
  css: [
    //系统默认样式
    '/assets/sass/style.scss',
    '/assets/font/font.css',
    '/assets/sass/element.scss',
  ],
  plugins: [

  ],
  vite: {
    server: {
      proxy: {
        '/admin': {
          target: "http://localhost:4090",  //这里是接口地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/admin/, '')
        },
      },
    }
  },
})
