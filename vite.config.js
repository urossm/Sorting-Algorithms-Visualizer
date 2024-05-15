import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ghPages } from "vite-plugin-gh-pages";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), ghPages()],
	base: "https://github.com/urossm/Sorting-Algorithms-Visualizer",
});
