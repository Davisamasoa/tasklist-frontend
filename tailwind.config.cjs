/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primaryColor: "#8171e9",
				secondaryColor: "#27272e",
				textColor: "#F2F2F2",
				bgColor: "#171827",
			},
		},
		fontFamily: {
			lato: ["Lato", "sans-serif"],
		},
	},
	plugins: [],
};
