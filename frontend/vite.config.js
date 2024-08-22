import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/applications': 'http://localhost:2354',
            '/launch': 'http://localhost:2354',
        },
    },
});
