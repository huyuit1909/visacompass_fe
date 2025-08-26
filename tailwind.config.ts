import type { Config } from 'tailwindcss'

export default {
	content: [
		'./index.html',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('daisyui'),
	],
	daisyui: {
		themes: [
			'light',
			'dark',
			{
				modern: {
					primary: '#6366f1',
					secondary: '#22d3ee',
					accent: '#f472b6',
					neutral: '#1f2937',
					'base-100': '#0b1020',
				},
			},
		],
	},
} satisfies Config


