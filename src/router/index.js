// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import AuthScreen from "../views/AuthScreen.vue";
import Dashboard from "../views/Dashboard.vue"; // Placeholder
import LandingPage from "../views/LandingPage.vue"; // Placeholder
import TicketManagement from "../views/TicketManagement.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  // Authentication Routes using the same component
  {
    path: "/auth/login",
    name: "Login",
    component: AuthScreen,
    props: { isLogin: true }, // Pass isLogin = true for login mode
  },
  {
    path: "/auth/register",
    name: "Register",
    component: AuthScreen,
    props: { isLogin: false }, // Pass isLogin = false for register mode
  },

  // Dashboard Placeholder (for navigation target)
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  // Redirect for home
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/tickets",
    name: "TicketManagement",
    component: TicketManagement,
  },

  {
    path: "/:catchAll(.*)", // Vue Router 4 syntax for catch-all
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
