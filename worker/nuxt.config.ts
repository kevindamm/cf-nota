import nitroCloudflareBindings from "nitro-cloudflare-dev";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare_module",
    // // Pages-like routing behavior
    // prerender: {
    //   autoSubfolderIndex: false
    // },
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  modules: ["nitro-cloudflare-dev", "@vueuse/nuxt", "@nuxtjs/kinde"]
})