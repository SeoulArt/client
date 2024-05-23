import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";
// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd());

    return defineConfig({
        plugins: [react(), mkcert()],
        server: {
            proxy: {
                "/back": {
                    target: env.VITE_API_URL + "/api",
                    changeOrigin: true,
                    rewrite: (_path) => _path.replace(/^\/back/, ""),
                    secure: true,
                },
            },
            // https: true,
        },
        resolve: {
            alias: [{ find: "@", replacement: "/src" }],
        },
    });
};
