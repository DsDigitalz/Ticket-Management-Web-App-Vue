<script setup>
import { ref, computed, watch, defineProps } from 'vue';
import { X } from 'lucide-vue-next';
import toast from 'vue-toastification'; // Using vue-toastification for toast
// Mock STATUS_OPTIONS as it's not provided but needed for select
const STATUS_OPTIONS = [
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Closed', value: 'closed' },
];

const props = defineProps({
  ticket: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'submit']);

const defaultFormData = {
  title: '',
  description: '',
  status: STATUS_OPTIONS[0].value,
  priority: 'medium',
};

const formData = ref({ ...defaultFormData });
const errors = ref({});

const isEdit = computed(() => !!props.ticket?.id);

// Sync prop changes (for edit mode)
watch(() => props.ticket, (newTicket) => {
  if (newTicket) {
    formData.value = {
      title: newTicket.title || '',
      description: newTicket.description || '',
      status: newTicket.status || STATUS_OPTIONS[0].value,
      priority: newTicket.priority || 'medium',
    };
  } else {
    // Reset for creation mode if prop changes to null
    formData.value = { ...defaultFormData };
  }
}, { immediate: true });

const validate = () => {
  const newErrors = {};
  if (!formData.value.title.trim()) {
    newErrors.title = "Title is mandatory.";
  }
  if (!formData.value.status) {
    newErrors.status = "Status is mandatory.";
  } else if (!STATUS_OPTIONS.some((opt) => opt.value === formData.value.status)) {
    newErrors.status = "Invalid status value. Must be 'open', 'in_progress', or 'closed'.";
  }
  if (formData.value.description.length > 500) {
    newErrors.description = "Description must be under 500 characters.";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleChange = (e) => {
  const { name, value } = e.target;
  formData.value[name] = value;

  // Real-time validation for the current field if an error already exists
  if (errors.value[name]) {
    const newErrors = { ...errors.value };
    delete newErrors[name];

    if (name === "title" && !value.trim()) {
      newErrors.title = "Title is mandatory.";
    }
    if (name === "status" && !STATUS_OPTIONS.some((opt) => opt.value === value)) {
      newErrors.status = "Invalid status value.";
    } else if (name === "status" && !value) {
      newErrors.status = "Status is mandatory.";
    }
    if (name === "description" && value.length > 500) {
      newErrors.description = "Description must be under 500 characters.";
    }

    errors.value = newErrors;
  }
};

const handleSubmit = () => {
  if (validate()) {
    const dataToSubmit = isEdit.value 
      ? { id: props.ticket.id, ...formData.value } 
      : formData.value;
      
    emit('submit', dataToSubmit);
  } else {
    // Display clear error feedback via toast
    toast.error("Please correct the validation errors below.");
  }
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
        class="bg-[#0F172A] w-full max-w-lg rounded-xl shadow-2xl p-6 border border-[#334155]"
        :initial="{ y: -50, opacity: 0, scale: 0.9 }"
        :enter="{ y: 0, opacity: 1, scale: 1 }"
        :leave="{ y: 50, opacity: 0, scale: 0.9 }"
        :transition="{ type: 'spring', stiffness: 100, damping: 20 }"
        @click.stop
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header class="flex justify-between items-center border-b border-[#334155] pb-3 mb-5">
          <h2 id="modal-title" class="text-2xl font-bold text-[#F8FAFC]">
            {{ isEdit ? "Edit Ticket" : "Create New Ticket" }}
          </h2>
          <button
            @click="emit('close')"
            class="text-[#94A3B8] hover:text-[#F8FAFC] transition p-1 rounded-full hover:bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            aria-label="Close modal"
          >
            <X size="24" />
          </button>
        </header>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div
            v-motion
            :initial="{ opacity: 0, x: -10 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 0.3 } }"
          >
            <label
              for="title"
              class="text-[#94A3B8] font-medium block mb-1"
            >
              Title <span class="text-[#EF4444]">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              :value="formData.title"
              @input="handleChange"
              :class="`w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border ${
                errors.title ? 'border-[#EF4444]' : 'border-[#334155]'
              } focus:ring-2 focus:ring-[#3B82F6] outline-none transition`"
              placeholder="Enter ticket title (mandatory)"
              required
              :aria-invalid="!!errors.title"
              :aria-describedby="errors.title ? 'title-error' : undefined"
            />
            <p v-if="errors.title" id="title-error" class="text-[#EF4444] text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, x: -10 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 } }"
          >
            <label
              for="description"
              class="text-[#94A3B8] font-medium block mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              :value="formData.description"
              @input="handleChange"
              rows="3"
              :class="`w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border ${
                errors.description ? 'border-[#EF4444]' : 'border-[#334155]'
              } focus:ring-2 focus:ring-[#3B82F6] outline-none transition resize-none`"
              placeholder="Detailed description (max 500 chars)"
              :aria-invalid="!!errors.description"
              :aria-describedby="errors.description ? 'description-error' : undefined"
            ></textarea>
            <p v-if="errors.description" id="description-error" class="text-[#EF4444] text-sm mt-1">
              {{ errors.description }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div
              v-motion
              :initial="{ opacity: 0, x: -10 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.2 } }"
            >
              <label
                for="status"
                class="text-[#94A3B8] font-medium block mb-1"
              >
                Status <span class="text-[#EF4444]">*</span>
              </label>
              <select
                id="status"
                name="status"
                :value="formData.status"
                @change="handleChange"
                :class="`w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border ${
                  errors.status ? 'border-[#EF4444]' : 'border-[#334155]'
                } focus:ring-2 focus:ring-[#3B82F6] outline-none transition`"
                required
                :aria-invalid="!!errors.status"
                :aria-describedby="errors.status ? 'status-error' : undefined"
              >
                <option v-for="opt in STATUS_OPTIONS" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
              <p v-if="errors.status" id="status-error" class="text-[#EF4444] text-sm mt-1">
                {{ errors.status }}
              </p>
            </div>

            <div
              v-motion
              :initial="{ opacity: 0, x: 10 }"
              :enter="{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.2 } }"
            >
              <label
                for="priority"
                class="text-[#94A3B8] font-medium block mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                :value="formData.priority"
                @change="handleChange"
                class="w-full p-3 rounded-lg bg-[#1E293B] text-[#F8FAFC] border border-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            class
            ="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-[#3B82F6]/30 mt-6 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            v-motion
            :hovered="{ scale: 1.01 }"
            :tap="{ scale: 0.99 }"
          >
            {{ isEdit ? "Save Changes" : "Create Ticket" }}
          </button>
        </form>
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