import { createConfigForNuxt } from '@nuxt/eslint-config';

export default createConfigForNuxt({})
  .prepend
  // ...Prepend some flat configs in front
  ()
  .override('nuxt/typescript/rules', {
    rules: {
      // ...Override rules, for example:
      '@typescript-eslint/ban-types': 'off',
    },
  });