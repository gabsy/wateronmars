/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {

		extend: {
			fontFamily: {
				'sans': 'Inter, Helvetica, Arial, sans-serif',
			},
			fontWeight: {
				default: 400,
			},
			colors: {
				wom: {
					primary: '#617AFF',
					grayLight: '#fafafa',
					grayMedium: '#F0F1FF',
					grayMediumLight: 'rgba(246, 248, 255, 0.70)',
					green: '#6FD1E7',
					greenLight: '#DCF9FF',
					bgGlobal: '#F5F7FF',
				},
			},
		},
	},
	plugins: [
		function({ addBase, config }) {
			addBase({
				'body': { fontWeight: config('theme.fontWeight.default') },
			});
		},
	],
};
