<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useTickets } from "../composables/useTickets"; // Assuming this is a Vue composable now
import { useAuth } from "../composables/useAuth"; // Assuming this is a Vue composable now
import PrivateLayout from "../components/common/PrivateLayout.vue";
import { Plus } from "lucide-vue-next";
import TicketCard from "../components/tickets/TicketCard.vue"; // Adjusted path/name
import TicketFormModal from "../components/tickets/TicketForm.vue"; // Adjusted path/name
import ConfirmDeleteModal from "../components/tickets/ConfirmDeleteModal.vue"; // Adjusted path/name
import toast from "vue-toastification";

// --- Hooks and State ---
// NOTE: useTickets and useAuth need to be converted to Vue Composables to work correctly.
// The provided code assumes they are already correctly set up in a Vue environment.
const {
  tickets,
  loading,
  error,
  fetchTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = useTickets();

// Assuming useAuth provides isAuthenticated (ref) and a navigate function
const { isAuthenticated, navigate } = useAuth();

const isModalOpen = ref(false);
const isConfirmOpen = ref(false);
const currentTicket = ref(null); // Used for editing (TicketFormModal prop)
const ticketToDelete = ref(null); // Used for deletion (ConfirmDeleteModal prop)

// --- Lifecycle and Auth Check (Translated useEffect) ---
watch(
  isAuthenticated,
  (newIsAuthenticated) => {
    if (newIsAuthenticated === false) {
      // Explicitly check for false after loading
      toast.error("Your session has expired — please log in again.");
      navigate("/auth/login"); // Redirect unauthorized users
    } else if (newIsAuthenticated === true) {
      fetchTickets(); // Fetch tickets only if authorized
    }
  },
  { immediate: true }
);

// --- CRUD Handlers ---
const handleOpenCreate = () => {
  currentTicket.value = null; // Clear previous ticket for creation
  isModalOpen.value = true;
};

const handleOpenEdit = (ticket) => {
  currentTicket.value = ticket;
  isModalOpen.value = true;
};

const handleOpenDelete = (id) => {
  ticketToDelete.value = id;
  isConfirmOpen.value = true;
};

const handleFormSubmit = async (data) => {
  if (data.id) {
    await updateTicket(data);
  } else {
    await createTicket(data);
  }
  isModalOpen.value = false; // Close modal on success
  currentTicket.value = null; // Clear state
};

const handleConfirmDelete = async (id) => {
  await deleteTicket(id);
  isConfirmOpen.value = false; // Close modal on success
  ticketToDelete.value = null;
};

// --- Rendering Logic ---
// Equivalent to the early return in React
if (isAuthenticated.value === false) {
  // We can't actually prevent rendering completely in Vue's setup,
  // but if the redirect happens immediately in watch, this will be fine.
  // We can return a minimal template if needed, but for now, the main template handles it.
}
</script>

<template>
  <PrivateLayout>
    <template v-if="isAuthenticated === false"> </template>

    <template v-else>
      <div
        class="absolute top-1/4 left-1/4 w-72 h-72 bg-[#3B82F6]/10 rounded-full filter blur-3xl opacity-30 pointer-events-none z-0 hidden lg:block"
        aria-hidden="true"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EF4444]/10 rounded-full filter blur-3xl opacity-20 pointer-events-none z-0 hidden lg:block"
        aria-hidden="true"
      />

      <header
        class="flex flex-col sm:flex-row justify-between items-center py-6 sm:py-8 border-b border-[#334155] mb-8 relative z-10"
        role="banner"
      >
        <h1
          class="text-3xl sm:text-4xl font-bold text-[#F8FAFC]"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.5 }"
        >
          Ticket Management
        </h1>
        <button
          @click="handleOpenCreate"
          class="mt-4 sm:mt-0 bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-lg shadow-[#3B82F6]/30 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          aria-label="Create new ticket"
          v-motion
          :hovered="{ scale: 1.05 }"
          :tap="{ scale: 0.95 }"
        >
          <Plus size="20" />
          <span>New Ticket</span>
        </button>
      </header>

      <div v-if="loading" class="text-center py-20 text-[#94A3B8]">
        Loading data...
      </div>

      <div
        v-if="error"
        class="bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444] p-4 rounded-lg mb-8 relative z-10"
        role="alert"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        <p class="font-medium">Failed to load tickets. Please retry.</p>
      </div>

      <section
        v-else-if="!loading && !error"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 relative z-10"
        aria-label="Existing Tickets"
        role="region"
      >
        <template v-if="tickets.length > 0">
          <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :ticket="ticket"
            @edit="handleOpenEdit"
            @delete="handleOpenDelete"
          />
        </template>
        <div
          v-else
          class="sm:col-span-2 lg:col-span-3 text-center py-10 text-[#94A3B8] border border-dashed border-[#334155] rounded-xl"
          v-motion
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.2 }"
        >
          No tickets found. Click "New Ticket" to get started!
        </div>
      </section>

      <Transition mode="out-in">
        <TicketFormModal
          v-if="isModalOpen"
          :ticket="currentTicket"
          @close="isModalOpen = false"
          @submit="handleFormSubmit"
        />
      </Transition>

      <Transition mode="out-in">
        <ConfirmDeleteModal
          v-if="isConfirmOpen"
          :ticket-id="ticketToDelete"
          @close="isConfirmOpen = false"
          @confirm="handleConfirmDelete"
        />
      </Transition>
    </template>
  </PrivateLayout>
</template>

<style scoped>
/* Base transition for modals matching AnimatePresence */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
