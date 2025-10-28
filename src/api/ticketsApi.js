// src/api/ticketsApi.js

// In-memory ticket store for mock API simulation
let ticketsDB = [
  {
    id: 1,
    title: "Login page crashes on submit",
    description: "Users encounter a 500 error when submitting the login form.",
    status: "open",
    priority: "high",
  },
  {
    id: 2,
    title: "Add dark mode toggle",
    description: "Implement a theme toggle for better accessibility.",
    status: "in_progress",
    priority: "medium",
  },
  {
    id: 3,
    title: "Fix mobile layout spacing",
    description: "Padding is inconsistent on smaller viewports.",
    status: "closed",
    priority: "low",
  },
];

// Utility: Simulate async delay
const simulateDelay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// --- Mock API Methods ---
export const mockTicketApi = {
  // Read all tickets
  async readAll() {
    await simulateDelay(500);
    // Return a copy to prevent direct mutation of mock DB
    return [...ticketsDB];
  },

  // Create new ticket
  async create(newTicketData) {
    await simulateDelay(500);
    const id = ticketsDB.length
      ? Math.max(...ticketsDB.map((t) => t.id)) + 1
      : 1;
    const newTicket = {
      id,
      ...newTicketData,
      status: newTicketData.status || "open",
      priority: newTicketData.priority || "medium",
    };
    ticketsDB = [newTicket, ...ticketsDB];
    return newTicket;
  },

  // Update existing ticket
  async update(id, updatedTicketData) {
    await simulateDelay(400);
    const index = ticketsDB.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Ticket not found.");
    const updatedTicket = { ...ticketsDB[index], ...updatedTicketData };
    ticketsDB[index] = updatedTicket;
    return updatedTicket;
  },

  // Delete ticket
  async delete(id) {
    await simulateDelay(300);
    const exists = ticketsDB.some((t) => t.id === id);
    if (!exists) throw new Error("Ticket not found.");
    ticketsDB = ticketsDB.filter((t) => t.id !== id);
    return true;
  },
};
