// src/composables/useAuth.js

import { computed } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
// import { computed } from "vue"; // Not strictly needed here

// --- Storage Keys ---
const SESSION_KEY = "TICKETAPP_AUTH_TOKEN";
const USER_DATA_KEY = "TICKETAPP_REGISTERED_USER";

// --- Auth State (shared across app) ---
const isAuthenticated = ref(false);

// 💡 RENAMED from isAuthReady to isLoaded, and exposed the inverse (isLoading)
const isLoaded = ref(false);

// --- Initialization: Check token on first load ---
function initAuth() {
  // Only run initialization logic once
  if (isLoaded.value) return;

  const token = localStorage.getItem(SESSION_KEY);
  isAuthenticated.value = !!token;
  isLoaded.value = true;
}

// --- Auth Composable ---
export function useAuth() {
  const router = useRouter();
  const toast = useToast();

  // ✅ Call initAuth once per app load
  initAuth();

  // Helper function for navigation (Used by TicketManagement.vue)
  const navigate = (path) => {
    router.push(path);
  };

  // --- Register user (mock) ---
  function register(username, password) {
    if (localStorage.getItem(USER_DATA_KEY)) {
      toast.error("Account already exists. Please log in.");
      return false;
    }

    if (!username || !password) {
      toast.error("Username and password are required for registration.");
      return false;
    }

    const newUser = { username, password };
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(newUser));
    toast.success("Registration successful! Please log in.");
    return true;
  }

  // --- Login user (mock) ---
  function login(username, password) {
    const storedData = localStorage.getItem(USER_DATA_KEY);
    const storedUser = storedData ? JSON.parse(storedData) : null;

    if (
      !storedUser ||
      storedUser.username !== username ||
      storedUser.password !== password
    ) {
      toast.error("Invalid username or password.");
      return false;
    }

    // ✅ Successful login
    localStorage.setItem(SESSION_KEY, "mock-jwt-token-" + new Date().getTime());
    isAuthenticated.value = true;
    toast.success("Login successful! Redirecting...");
    router.push("/dashboard"); // Redirect to dashboard
    return true;
  }

  // --- Logout user ---
  function logout() {
    localStorage.removeItem(SESSION_KEY);
    isAuthenticated.value = false;
    toast("Logged out successfully 👋");
    router.push("/auth/login");
  }

  return {
    isAuthenticated,
    // 💡 FIX: Expose the inverse of isLoaded as isLoading
    // isAuthReady is true when auth is ready (i.e., NOT loading)
    isLoading: computed(() => !isLoaded.value),
    login,
    logout,
    register,
    navigate,
  };
}
