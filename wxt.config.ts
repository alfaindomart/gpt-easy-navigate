import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    permissions: ["scripting", "storage"],
    host_permissions: ["*://chatgpt.com/c/*, *://*.google.com/*"],
    icons: {
      "16": "icon16.png",
      "32": "icon32.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  },
  modules: ["@wxt-dev/module-react"],
});
