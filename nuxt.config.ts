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
});