<script setup>
import { defineProps } from "vue";
import { Trash2, Edit } from "lucide-vue-next";

// Mapping React's status styles to a Vue constant
const STATUS_STYLES = {
  open: "border-emerald-500 bg-emerald-900/20 text-emerald-300",
  in_progress: "border-amber-500 bg-amber-900/20 text-amber-300",
  closed: "border-slate-500 bg-slate-900/20 text-slate-300",
};

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete"]);

const statusColor = STATUS_STYLES[props.ticket.status] || STATUS_STYLES.open;

const formattedStatus = props.ticket.status.replace("_", " ");
</script>

<template>
  <article
    v-motion
    class="bg-[#1E293B] p-5 rounded-xl shadow-xl border border-[#334155] flex flex-col justify-between hover:border-[#3B82F6] transition-colors duration-200"
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0 }"
    :in-view="{ opacity: 1, y: 0, transition: { duration: 0.5 } }"
    :delay="50"
    role="region"
    :aria-label="`Ticket ${props.ticket.id}: ${props.ticket.title}`"
  >
    <div>
      <header class="mb-3 flex justify-between items-start">
        <h3 class="text-xl font-bold text-[#F8FAFC] leading-tight pr-4">
          {{ props.ticket.title }}
        </h3>
        <span
          :class="statusColor"
          class="text-xs font-semibold px-2 py-1 rounded-full border whitespace-nowrap"
        >
          {{ formattedStatus }}
        </span>
      </header>
      <p class="text-[#94A3B8] text-sm mb-4 line-clamp-3">
        {{ props.ticket.description || "No description provided." }}
      </p>
    </div>

    <footer class="flex justify-end space-x-2 border-t border-[#334155] pt-3">
      <button
        @click="emit('edit', props.ticket)"
        class="text-[#3B82F6] hover:text-[#2563EB] transition duration-150 p-2 rounded-full hover:bg-[#3B82F6]/10 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        :aria-label="`Edit ticket ${props.ticket.id}`"
        v-motion
        :hovered="{ scale: 1.1 }"
        :tap="{ scale: 0.9 }"
      >
        <Edit size="18" />
      </button>
      <button
        @click="emit('delete', props.ticket.id)"
        class="text-[#EF4444] hover:text-[#DC2626] transition duration-150 p-2 rounded-full hover:bg-[#EF4444]/10 focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
        :aria-label="`Delete ticket ${props.ticket.id}`"
        v-motion
        :hovered="{ scale: 1.1 }"
        :tap="{ scale: 0.9 }"
      >
        <Trash2 size="18" />
      </button>
    </footer>
  </article>
</template>
