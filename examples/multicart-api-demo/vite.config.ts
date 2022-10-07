import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify';
import { join } from 'path';
import pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vuetify({ autoImport: true }), pages()],
    base: './',
    resolve: {
        alias: {
            '@': join(__dirname, 'src'),
        },
    },
    define: { 'process.env': {} },
});
