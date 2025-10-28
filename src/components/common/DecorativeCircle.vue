<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: String,
  top: String,
  left: String,
  right: String,
  bottom: String,
  color: String,
  zIndex: { type: Number, default: 0 },
  opacity: { type: Number, default: 0.3 },
})
</script>

<template>
  <div
    class="absolute rounded-full filter blur-xl animate-pulse-slow pointer-events-none"
    :style="{
      width: props.size,
      height: props.size,
      top: props.top,
      left: props.left,
      right: props.right,
      bottom: props.bottom,
      backgroundColor: props.color,
      zIndex: props.zIndex,
      opacity: props.opacity,
    }"
  ></div>
</template>
