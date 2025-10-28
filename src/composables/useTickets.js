import { ref } from "vue";

// Mock data to ensure the table renders
const mockTickets = ref([
  {
    id: 1,
    title: "Database Connection Issue",
    description: "The main server cannot connect to the primary database.",
    priority: "high",
    status: "open",
  },
  {
    id: 2,
    title: "Authentication Flow Test",
    description:
      "Verify that OAuth and JWT tokens are handled correctly on login.",
    priority: "medium",
    status: "in_progress",
  },
  {
    id: 3,
    title: "Update Button Styling",
    description:
      "The 'Submit' button needs to be primary blue, not default gray.",
    priority: "low",
    status: "closed",
  },
]);

// Helper for unique ID generation
const getNextId = (currentTickets) =>
  Math.max(0, ...currentTickets.map((t) => t.id)) + 1;

export function useTickets() {
  // --- STATE REQUIRED BY TicketManagement.vue ---
  const tickets = ref(mockTickets.value);
  const loading = ref(false);
  const error = ref(null);

  // --- ASYNC PLACEHOLDER FUNCTIONS ---

  const fetchTickets = async () => {
    // Simulate fetching: sets loading to true, then false instantly.
    loading.value = true;
    error.value = null; // Clear any previous error
    await new Promise((resolve) => setTimeout(resolve, 100)); // Short artificial delay
    loading.value = false;
    // Data is already loaded via 'tickets' ref initialization
  };

  // Renamed to 'createTicket' to match the component's expected prop
  const createTicket = async (newTicket) => {
    const ticketWithId = {
      id: getNextId(tickets.value),
      ...newTicket,
    };
    tickets.value.unshift(ticketWithId);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
  };

  // Renamed to 'updateTicket' to match the component's expected prop
  const updateTicket = async (updatedTicket) => {
    const id = updatedTicket.id;
    const index = tickets.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tickets.value[index] = { ...tickets.value[index], ...updatedTicket };
    }
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
  };

  // Renamed to 'deleteTicket' to match the component's expected prop
  const deleteTicket = async (id) => {
    tickets.value = tickets.value.filter((t) => t.id !== id);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
  };

  return {
    tickets,
    loading, // 💡 ADDED
    error, // 💡 ADDED
    fetchTickets, // 💡 ADDED
    createTicket, // 💡 RENAMED from addTicket
    updateTicket, // 💡 RENAMED from updateTicket (made async)
    deleteTicket, // 💡 RENAMED from removeTicket
  };
}

// NOTE: You must also ensure STATUS_OPTIONS is available,
// likely by exporting it from this same file or a dedicated constants file.

// Example of STATUS_OPTIONS export (if you choose to place it here):
export const STATUS_OPTIONS = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Closed", value: "closed" },
];
