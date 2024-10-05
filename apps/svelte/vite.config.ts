import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
	// Load the default Vite .env files
	const envLocal = loadEnv(mode, path.resolve(process.cwd(), ".env"), "");
	const envRoot = loadEnv(
		mode,
		path.resolve(process.cwd(), "../..", ".env"),
		"",
	);
	const env = { ...envRoot, ...envLocal };

	return {
		plugins: [sveltekit()],
		define: { "process.env": env },
		test: {
			include: ["src/**/*.{test,spec}.{js,ts}"],
		},
	};
});
