// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  devtools: { enabled: false },
  compatibilityDate: '2024-11-01',
  eslint: {},
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },
});