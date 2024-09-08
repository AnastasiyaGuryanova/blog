import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@actions": "/src/actions",
			"@components": "/src/components",
			"@constants": "/src/constants",
			"@hooks": "/src/hooks",
			"@pages": "/src/pages",
			"@reducers": "/src/reducers",
			"@selectors": "/src/selectors",
			"@utils": "/src/utils",
		},
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3001",
				changeOrigin: true,
			},
		},
	},
});
