import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
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
                    secure: true,
                },
            },
        },
        resolve: {
            alias: [{ find: "@", replacement: "/src" }],
        },
    });
};
