import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    vite: () => ({
    plugins: [tailwindcss()],
  }),
    manifest: {
    permissions: ["scripting", "storage", "contextMenus"],
    host_permissions: ["*://chatgpt.com/c/*, *://*.google.com/*"],
  },
  modules: ['@wxt-dev/module-react']
});
