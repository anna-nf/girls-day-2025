import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/girls-day-2025/', // WICHTIG: Repository-Name genau so eintragen!
});
