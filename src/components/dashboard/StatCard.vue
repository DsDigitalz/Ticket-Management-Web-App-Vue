<script setup>
import { computed } from "vue";
// import { motion } from "vue-motion";
import { TrendingUp, Clock, CheckCircle } from "lucide-vue-next";

// 🎯 Replication of STATUS_COLORS object
const STATUS_COLORS = {
  total: { hex: "#3B82F6", icon: TrendingUp },
  open: { hex: "#10B981", icon: Clock },
  resolved: { hex: "#A855F7", icon: CheckCircle },
};

const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, required: true },
  type: { type: String, required: true }, // e.g., 'total', 'open', 'resolved'
});

const statData = computed(
  () => STATUS_COLORS[props.type] || STATUS_COLORS.total
);
const cardColor = computed(() => statData.value.hex);
const CardIcon = computed(() => statData.value.icon);

const cardVariants = {
  // Replication of the initial opacity and y from the React version
  initial: { opacity: 0, y: 50 },
  // This uses the v-motion:in-view custom directive from vue-motion
  inView: { opacity: 1, y: 0 },
};
</script>

<template>
  <motion.article
    :variants="cardVariants"
    v-motion-once
    :transition="{ duration: 0.6 }"
    :style="{ borderLeftColor: cardColor }"
    class="bg-[#1E293B] p-6 rounded-xl shadow-2xl shadow-black/30 h-full border-l-4 transition-transform duration-300 hover:scale-[1.02] hover:bg-[#2C3B53]"
  >
    <h3 class="text-[#94A3B8] uppercase text-sm font-semibold mb-2">
      {{ title }}
    </h3>
    <div class="flex items-center justify-between">
      <p class="text-5xl font-extrabold text-[#F8FAFC]">{{ count }}</p>
      <component
        :is="CardIcon"
        :size="36"
        :style="{ color: cardColor }"
        class="transition-colors duration-300"
      />
    </div>
  </motion.article>
</template>
