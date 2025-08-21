import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    manifest: {
    permissions: ["scripting", "storage"],
    host_permissions: ["*://chatgpt.com/c/*, *://*.google.com/*"],
  },
  modules: ['@wxt-dev/module-react'],
});
