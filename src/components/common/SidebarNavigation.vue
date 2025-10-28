<script setup>
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Home, ListTodo, LogOut } from "lucide-vue-next";

// 💡 Mock useAuth (CRITICAL: Moved useRouter inside the function for correct usage)
const useAuth = () => {
  const router = useRouter(); // Initialize router instance
  return {
    logout: () => {
      console.log("User logged out (Auth Mock)");
      router.push("/auth/login"); // 🎯 This handles the routing to login
    },
  };
};

const { logout } = useAuth();
// --- End Mock ---

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

// The navItems array remains the same as its structure works well
const navItems = [
  { name: "Dashboard", to: "/dashboard", icon: Home },
  { name: "Ticket Management", to: "/tickets", icon: ListTodo },
  {
    name: "Logout",
    to: "/auth/login", // The 'to' is technically unused for the button, but kept for reference
    icon: LogOut,
    action: logout,
    isLogout: true,
  },
];

// Helper function to build the common styles and active styles
const getLinkClass = (isActive, isLogout) => {
  const baseStyles =
    "flex items-center space-x-3 p-2 rounded-lg text-[#F8FAFC] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]";
  if (isLogout) {
    return `${baseStyles} hover:bg-[#EF4444]/20 hover:text-[#EF4444]`;
  }
  if (isActive) {
    return `${baseStyles} bg-[#3B82F6] text-[#F8FAFC] font-bold shadow-inner shadow-black/20`;
  }
  return `${baseStyles} hover:bg-[#3B82F6]/20 hover:text-[#3B82F6]`;
};

// 🎯 handleLinkClick function is updated to correctly call logout only when needed
const handleLinkClick = (isLogout) => {
  if (isLogout) {
    logout(); // This handles the router push internally
  }
  emit("close");
};
</script>

<template>
  <nav
    :class="['flex flex-col', isMobile ? 'p-6 space-y-4' : 'space-y-2']"
    aria-label="Main Navigation"
  >
    <template v-for="(item, index) in navItems" :key="item.name">
      <button
        v-if="item.isLogout"
        @click="handleLinkClick(true)"
        :class="[getLinkClass(false, true), 'text-left w-full']"
        :aria-label="item.name"
      >
        <component :is="item.icon" :size="20" />
        <span class="font-semibold">{{ item.name }}</span>
      </button>

      <RouterLink
        v-else
        :to="item.to"
        @click="handleLinkClick(false)"
        custom
        v-slot="{ navigate, href, isActive, isExactActive }"
      >
        <a
          :href="href"
          @click="navigate"
          :class="[
            'text-left w-full',
            getLinkClass(isActive || isExactActive, false),
          ]"
          :aria-label="`Maps to ${item.name}`"
        >
          <component :is="item.icon" :size="20" />
          <span class="font-semibold">{{ item.name }}</span>
        </a>
      </RouterLink>
    </template>
  </nav>
</template>
