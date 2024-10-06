/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}", "node_modules/preline/dist/*.js"],
	plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
