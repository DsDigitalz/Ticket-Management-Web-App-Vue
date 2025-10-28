<script setup>
// src/views/Dashboard.vue
import { computed, watch } from "vue"; // Ensure 'watch' is imported for reactive checks
import { RouterLink } from "vue-router";
// 💡 FIX: Import 'motion' and ensure it's used correctly if 'vue-motion' is configured
// import { motion } from "vue-motion";

// 💡 FIX: Layout is unnecessary if PrivateLayout already wraps the entire view
// import Layout from "../components/common/Layout.vue";

import StatCard from "../components/dashboard/StatCard.vue";
import { useTickets } from "../composables/useTickets";
import { useAuth } from "../composables/useAuth"; // Import useAuth for redirect safety
import { Loader2 } from "lucide-vue-next";
import PrivateLayout from "../components/common/PrivateLayout.vue";

// --- 1. Get Authentication State (Used for post-auth checks/redirects) ---
const { isAuthenticated, navigate } = useAuth();

// --- 2. Get Tickets Composable State ---
// 💡 FIX: Destructure properties directly from the composable return object.
const {
  tickets,
  loading: isTicketsLoading, // Rename 'loading' to avoid conflict if needed
  error: ticketsError,
  fetchTickets, // Assuming this is present and called in setup (or onMounted)
} = useTickets();

// --- 3. Reactive Redirect Guard ---
watch(
  isAuthenticated,
  (newAuthStatus) => {
    if (newAuthStatus === false) {
      navigate("/auth/login");
    }
  },
  { immediate: true }
);

// --- 4. Corrected Computed Properties ---
// 💡 FIX: Use the destructured 'tickets' ref directly (Vue unwraps it in computed)
const total = computed(() => (tickets.value ? tickets.value.length : 0));

const open = computed(() =>
  tickets.value
    ? tickets.value.filter(
        (t) => t.status === "open" || t.status === "in_progress"
      ).length
    : 0
);
const resolved = computed(() =>
  tickets.value ? tickets.value.filter((t) => t.status === "closed").length : 0
);

// --- Animation Variants ---
// (No change to variants)
const sectionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const navVariants = {
  initial: { opacity: 0, y: 20 },
  inView: { opacity: 1, y: 0 },
};

// 💡 Ensure fetchTickets is called, e.g., using onMounted or relying on useTickets doing it internally
// import { onMounted } from 'vue';
// onMounted(fetchTickets);
</script>

<template>
  <PrivateLayout>
    <header
      class="flex flex-col sm:flex-row justify-between sm:items-center py-6 sm:py-8 border-b border-[#334155] mb-10"
    >
      <h1 class="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4 sm:mb-0">
        Welcome Back!
        <span class="text-[#94A3B8]">Dashboard Overview</span>
      </h1>
    </header>

    <div
      v-if="isTicketsLoading"
      class="text-center py-20 text-[#94A3B8] flex flex-col items-center"
      role="status"
    >
      <Loader2 :size="32" class="animate-spin text-[#3B82F6] mb-4" />
      <p class="text-lg">Loading dashboard statistics instantly...</p>
    </div>

    <div
      v-else-if="ticketsError"
      class="text-center py-20 text-red-400"
      role="alert"
    >
      <p class="text-lg">
        An error occurred: {{ ticketsError }}. Please try refreshing.
      </p>
    </div>

    <motion.section
      v-else
      :variants="sectionVariants"
      initial="initial"
      animate="animate"
      :transition="{ duration: 0.5 }"
      class="grid md:grid-cols-3 gap-8 mb-16"
      role="region"
      aria-labelledby="key-metrics-heading"
    >
      <StatCard title="Total Tickets" :count="total" type="total" />
      <StatCard title="Open/Progress" :count="open" type="open" />
      <StatCard title="Resolved Tickets" :count="resolved" type="resolved" />
    </motion.section>

    <motion.nav
      v-if="!isTicketsLoading && !ticketsError"
      :variants="navVariants"
      v-motion-once
      :transition="{ duration: 0.5, delay: 0.2 }"
      :viewport="{ once: true, amount: 0.1 }"
      class="flex flex-col items-center text-center"
      aria-label="Quick Navigation"
      role="navigation"
    >
      <h2
        id="quick-navigation-heading"
        class="text-2xl font-semibold text-[#F8FAFC] mb-6"
      >
        Ready to manage your tickets?
      </h2>
      <RouterLink
        to="/tickets"
        class="px-10 py-4 text-lg sm:text-xl font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.01] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
      >
        Go to Ticket Management ➡️
      </RouterLink>
    </motion.nav>
  </PrivateLayout>
</template>
