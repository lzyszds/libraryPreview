
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
  ],
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
    '/assets/sass/style.scss'
  ],
  plugins: [

  ]

})
