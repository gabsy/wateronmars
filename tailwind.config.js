/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {

		extend: {
			fontFamily: {
				'sans': 'Inter, Helvetica, Arial, sans-serif',
			},
			fontWeight: {
				default: 200,
			},
			colors: {
				wom: {
					primary: '#617AFF',
					grayLight: '#fafafa',
					grayMedium: '#E5E8FF',
					grayMediumLight: 'rgba(246, 248, 255, 0.70)',
					green: '#49A18C',
					greenLight: '#D2EEDB',
					bgGlobal: '#D9EBFC',
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
