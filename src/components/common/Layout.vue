<script setup>
// 💡 Import the new Footer component
import Footer from "./Footer.vue";

// You would typically import a Navbar here as well
</script>

<template>
  <div class="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col">
    <main class="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <slot></slot>
    </main>

    <Footer />
  </div>
</template>
