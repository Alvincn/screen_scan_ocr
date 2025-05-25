// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxtjs/device'
  ],
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  vite: {
    assetsInclude: ['**/*.svg'],
  }
})