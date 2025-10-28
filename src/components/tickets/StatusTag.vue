<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const statusClasses = computed(() => {
  switch (props.status) {
    case 'open':
      return 'bg-green-600/30 text-green-400 border-green-600';
    case 'in_progress':
      return 'bg-yellow-600/30 text-yellow-400 border-yellow-600';
    case 'closed':
      return 'bg-purple-600/30 text-purple-400 border-purple-600';
    default:
      return 'bg-gray-600/30 text-gray-400 border-gray-600';
  }
});
</script>

<template>
  <span
    :class="statusClasses"
    class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border"
  >
    {{ status.replace('_', ' ').toUpperCase() }}
  </span>
</template>