import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	// your custom flat configs go here, for example:
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
		extends: [
			'plugin:vue/vue3-essential',
			'eslint:recommended',
			'plugin:prettier/recommended',
		],
		plugins: ['prettier'],
		rules: {
			'no-console': 'off',
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
			'@stylistic/eol-last': ['error', 'always'], // Ensure a newline at the end of files
			'@stylistic/semi': ['error', 'always'], // Enforce semicolons
			'prettier/prettier': 'error', // Ensure Prettier rules are enforced
		},
	},
);
