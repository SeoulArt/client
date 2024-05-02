import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
console.log(process.env.VITE_API_URL);
// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd());

    return defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                "/back": {
                    target: env.VITE_API_URL,
                    changeOrigin: true,
                    rewrite: (_path) => _path.replace(/^\/back/, ""),
                },
            },
        },
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
};
