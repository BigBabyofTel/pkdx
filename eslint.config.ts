	module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser', // Use TypeScript parser
		sourceType: 'module',
	},
	extends: [
		'plugin:vue/vue3-essential', // Vue 3 rules
		'eslint:recommended', // ESLint recommended rules
		'plugin:@typescript-eslint/recommended', // TypeScript rules
		'plugin:prettier/recommended', // Prettier integration
	],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
			   // Vue-specific rules
		'vue/singleline-html-element-content-newline': [
			'error',
			{
				ignoreWhenNoAttributes: true,
				ignoreWhenEmpty: true,
				ignores: ['pre', 'textarea'],
				externalIgnores: [],
			},
		],
		'vue/html-indent': ['error', 'tab'], // Enforce tab indentation for HTML
		'vue/multi-word-component-names': 'off', // Allow single-word component names
		'vue/html-closing-bracket-newline': [
			'error',
			{
				singleline: 'never',
				multiline: 'always',
			},
		],

			   // General ESLint rules
		'no-console': 'off', // Allow console.log
		'@typescript-eslint/no-unused-vars': 'error', // TypeScript rule

			   // Prettier rules
		'prettier/prettier': 'error', // Ensure Prettier rules are enforced
	},
	settings: {
		// Optional: Add settings for Vue or other plugins
	},
	};