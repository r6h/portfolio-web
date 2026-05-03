// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "en",
    detectBrowserLanguage: false,
    locales: [
      { code: "en", file: "en.ts", language: "en-US", name: "English" },
      { code: "es", file: "es.ts", language: "es-ES", name: "Español" },
    ],
    langDir: "../app/locales",
    vueI18n: "./i18n.config.ts",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Roger Kernel | Systems & Security Engineer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "I design and build complex software systems, and understand how they break before others do.",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap",
        },
      ],
    },
  },
});
