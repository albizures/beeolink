const antfu = require('@antfu/eslint-config').default
const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')

const compat = new FlatCompat({
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})

module.exports = antfu(
	{
		typescript: true,
		react: true,
		stylistic: {
			indent: 'tab',
		},
	},
	{
		rules: {
			'ts/array-type': ['error', { default: 'generic', readonly: 'generic' }],
			'ts/consistent-type-definitions': ['error', 'type'],
			'ts/indent': 'off',
			'ts/no-redeclare': 'off',
			'arrow-parens': ['error', 'always'],
			'style/arrow-parens': ['error', 'always'],
			'curly': ['error', 'all'],
			'indent': 'off',
			'antfu/consistent-list-newline': 'off',
			'ts/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
				},
			],
		},
	},

	// Legacy config
	...compat.config({
		extends: [
			// 'next/core-web-vitals',
			'plugin:eslint-plugin-next-on-pages/recommended',
		],
		plugins: [
			'eslint-plugin-next-on-pages',
		],
	}),

	// Other flat configs...
)
