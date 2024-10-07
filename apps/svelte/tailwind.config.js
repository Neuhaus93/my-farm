/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["node_modules/preline/dist/*.js", "./src/**/*.{html,js,svelte,ts}"],
	darkMode: "class",
	plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
