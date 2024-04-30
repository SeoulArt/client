import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            store: "/src/store",
            layout: "/src/layout",
            pages: "/src/pages",
            components: "/src/components",
            assets: "/src/assets",
            hooks: "/src/hooks",
            UI: "/src/UI",
            queries: "/src/queries",
        },
    },
});
