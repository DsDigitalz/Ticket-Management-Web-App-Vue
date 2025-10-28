<script setup>
import { ref } from "vue";
import { Menu, X } from "lucide-vue-next";
import SidebarNavigation from "./SidebarNavigation.vue";

// 💡 NEW: Import useAuth to handle conditional rendering
import { useAuth } from "../../composables/useAuth";

const isSidebarOpen = ref(false);

const sidebarVariants = {
  closed: { x: "-100%" },
  open: { x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// 💡 NEW: Integrate useAuth state
const { isLoading, isAuthenticated } = useAuth();
</script>

<template>
  <div
    v-if="isLoading"
    class="min-h-screen flex items-center justify-center bg-[#0F172A] text-[#3B82F6]"
  >
    <div role="status" aria-live="polite">Loading authentication state...</div>
  </div>

  <div v-else-if="!isAuthenticated" class="min-h-screen bg-[#0F172A]"></div>

  <div v-else class="min-h-screen bg-[#0F172A]">
    <aside
      class="fixed top-0 left-0 w-64 h-full bg-[#1E293B] border-r border-[#334155] p-4 hidden lg:block z-40"
      aria-label="Sidebar navigation"
    >
      <header class="py-6 mb-8 border-b border-[#334155]">
        <h2 class="text-2xl font-extrabold text-[#3B82F6] px-3">Ticketrax</h2>
      </header>
      <SidebarNavigation @close="() => {}" />
    </aside>

    <main class="lg:ml-64 relative min-h-screen">
      <header
        class="flex lg:hidden justify-between items-center bg-[#1E293B] p-4 border-b border-[#334155] sticky top-0 z-50"
        role="navigation"
      >
        <h2 class="text-xl font-extrabold text-[#3B82F6]">TicketApp</h2>
        <button
          @click="isSidebarOpen = true"
          class="p-2 text-[#F8FAFC] hover:text-[#3B82F6] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          aria-label="Open navigation menu"
        >
          <Menu :size="24" />
        </button>
      </header>

      <AnimatePresence>
        <div
          v-if="isSidebarOpen"
          class="fixed inset-0 z-[60] bg-black/70 lg:hidden"
          @click="isSidebarOpen = false"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial="{ opacity: 0 }"
            animate="{ opacity: 1 }"
            exit="{ opacity: 0 }"
            class="h-full w-full"
          >
            <motion.aside
              :variants="sidebarVariants"
              initial="closed"
              animate="open"
              exit="closed"
              class="fixed top-0 left-0 w-64 h-full bg-[#1E293B] shadow-2xl"
              @click.stop
            >
              <div
                class="flex justify-between items-center p-4 border-b border-[#334155]"
              >
                <h2 class="text-2xl font-extrabold text-[#3B82F6]">
                  TicketApp
                </h2>
                <button
                  @click="isSidebarOpen = false"
                  class="p-2 text-[#F8FAFC] hover:text-[#3B82F6] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  aria-label="Close navigation menu"
                >
                  <X :size="24" />
                </button>
              </div>
              <SidebarNavigation
                :is-mobile="true"
                @close="isSidebarOpen = false"
              />
            </motion.aside>
          </motion.div>
        </div>
      </AnimatePresence>

      <div
        class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
        role="region"
      >
        <slot />
      </div>
    </main>
  </div>
</template>
