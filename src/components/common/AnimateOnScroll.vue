<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  delay: {
    type: [Number, String],
    default: 0,
  },
  duration: {
    type: [Number, String],
    default: 0.6,
  },
});
</script>

<template>
  <Transition 
    name="fade-slide" 
    appear 
    :style="{ transitionDelay: `${delay}s`, transitionDuration: `${duration}s` }"
  >
    <div class="h-full w-full">
      <slot></slot>
    </div>
  </Transition>
</template>

<style>
/* 🎯 Replicates the fade-in and slide-in animation specified in user context */
.fade-slide-enter-active {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  /* Ensures the layout doesn't jump during animation */
  will-change: opacity, transform; 
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(50px);
}
</style>