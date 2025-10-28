// // vite.config.js
// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";

// export default defineConfig({
//   plugins: [vue()],
//   // You may keep this if you still have resolution issues, but it's not directly for Tailwind
//   optimizeDeps: {
//     exclude: ["lucide-vue-next"],
//   },
// });

// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue"; // 💡 Import the Vue plugin
import tailwindcss from "@tailwindcss/vite"; // Keep the Tailwind Vite plugin

export default defineConfig({
  plugins: [
    vue(), // ✅ Include the Vue plugin
    tailwindcss(), // ✅ Include the Tailwind plugin
  ],

  // Re-add your previous fix for the lucide-vue-next dependency resolution
  optimizeDeps: {
    exclude: ["lucide-vue-next"],
  },
});
