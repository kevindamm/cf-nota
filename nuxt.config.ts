import nitroCloudflareBindings from 'nitro-cloudflare-dev';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  nitro: {
    preset: 'cloudflare_module',
    // Pages-like routing behavior - does not generate /index.html in URL.
    prerender: {
      autoSubfolderIndex: false
    },
    /* database layer is still experimental
    database: {
      connector: 'sqlite',
      options: { name: 'db' }},
    // users: { ??? cloudflare D1 & token },
    */
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    }},

  kinde: {
    debug: false,
    endpoints: {
      callback: '/kindecall',
      login: '/auth/login',
      logout: '/auth/logout',
      register: '/auth/register',
      health: '/_health',
    }},

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  routeRules: {
    '/**': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        redirectUrl: '/auth/login',
        external: true,
      }},
    '/': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        public: true,
      }},
    '/author': {
      appMiddleware: ['auth-logged-in'],
      kinde: {
        permissions: {
          author: true,
        },
        redirectUrl: '/auth/login',
        external: true,
      }}
  },

  // One root CSS where dependencies are imported into layers, making cascading explicit.
  css: ['~/assets/css/app.css'],

  // zero-config modules are defined here
  modules: [
    nitroCloudflareBindings,
    '@vueuse/nuxt',
    '@nuxtjs/kinde',
  ]
})
