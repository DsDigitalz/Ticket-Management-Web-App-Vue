import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const TOAST_STYLE = {
  background: "#1E293B", // same as React: dark slate background
  color: "#F8FAFC", // light text
  border: "1px solid #334155", // soft border
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)", // subtle shadow
  padding: "16px",
  borderRadius: "8px",
  fontFamily: "Manrope, sans-serif", // match your UI font
};

const app = createApp(App);

app.use(router);

app.use(Toast, {
  position: "top-right",
  transition: "Vue-Toastification__fade",
  maxToasts: 4,
  newestOnTop: true,
  toastDefaults: {
    // 🔹 Global base style (applied to all toasts)
    style: TOAST_STYLE,

    // 🔹 Success Toast customization
    success: {
      icon: "✅",
      style: {
        ...TOAST_STYLE,
        border: "1px solid #10B981", // green border
      },
    },

    // 🔹 Error Toast customization
    error: {
      icon: "❌",
      style: {
        ...TOAST_STYLE,
        border: "1px solid #EF4444", // red border
      },
    },

    // // 🔹 Info Toast (optional)
    // info: {
    //   icon: "ℹ️",
    //   style: {
    //     ...TOAST_STYLE,
    //     border: "1px solid #3B82F6", // blue border
    //   },
    // },
  },
});

app.mount("#app");
