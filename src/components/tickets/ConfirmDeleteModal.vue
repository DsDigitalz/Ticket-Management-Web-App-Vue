<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  ticketId: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(['close', 'confirm']);

const handleConfirm = () => {
  emit('confirm', props.ticketId);
};
</script>

<template>
  <Transition name="modal-fade">
    <div
      class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      @click="emit('close')"
      role="presentation"
    >
      <div
        v-motion
        class="bg-[#0F172A] w-full max-w-sm rounded-xl shadow-2xl p-6 border border-[#EF4444]/50"
        :initial="{ y: -50, opacity: 0, scale: 0.9 }"
        :enter="{ y: 0, opacity: 1, scale: 1 }"
        :leave="{ y: 50, opacity: 0, scale: 0.9 }"
        :transition="{ type: 'spring', stiffness: 100, damping: 20 }"
        @click.stop
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-description"
      >
        <h2
          id="confirm-title"
          class="text-xl font-bold text-[#F8FAFC] mb-3"
        >
          Confirm Deletion
        </h2>
        <p id="confirm-description" class="text-[#94A3B8] mb-6">
          Are you sure you want to delete ticket ID
          <span class="font-bold text-[#EF4444]">#{{ props.ticketId }}</span>? This
          action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="emit('close')"
            class="px-4 py-2 text-[#94A3B8] rounded-lg hover:bg-[#1E293B] transition focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
          >
            Cancel
          </button>
          <button
            @click="handleConfirm"
            class="px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-[#F8FAFC] font-semibold rounded-lg transition shadow-lg shadow-[#EF4444]/30 focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Custom style for modal backdrop transition, matching AnimatePresence behavior */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>