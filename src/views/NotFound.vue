<script setup>
import { RouterLink } from "vue-router";
// import { motion } from "vue-motion";
import { AlertTriangle } from "lucide-vue-next";
// Assuming your public Layout is available, e.g., imported as a component or
// used as a wrapper in your main router setup. We will assume it's imported here:
import Layout from "../components/common/Layout.vue";

// Framer Motion Variants for scroll animation and overall page entry (User Instruction)
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
</script>

<template>
  <Layout>
    <motion.main
      class="min-h-[70vh] flex flex-col items-center justify-center text-center p-8 bg-[#1E293B] rounded-xl shadow-2xl shadow-black/50 border-t-4 border-[#3B82F6]"
      :variants="containerVariants"
      initial="hidden"
      animate="visible"
      aria-label="404 Page Not Found"
      role="main"
    >
      <motion.div :variants="itemVariants">
        <AlertTriangle :size="80" class="text-[#3B82F6] mb-6 animate-pulse" />
      </motion.div>

      <motion.hgroup :variants="itemVariants">
        <h1 class="text-9xl font-extrabold text-[#F8FAFC] mb-4">404</h1>
        <h2 class="text-3xl sm:text-4xl font-semibold text-[#94A3B8] mb-8">
          Page Not Found
        </h2>
      </motion.hgroup>

      <motion.p
        :variants="itemVariants"
        class="text-lg text-[#94A3B8] max-w-md mb-10"
      >
        Oops! It looks like you've followed a broken link or entered a URL that
        doesn't exist on this app.
      </motion.p>

      <motion.nav :variants="itemVariants">
        <RouterLink
          to="/"
          class="inline-block px-8 py-3 text-lg font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] shadow-xl shadow-[#3B82F6]/30 hover:scale-[1.05] transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/50"
          aria-label="Go back to Home"
        >
          Return to Home Page
        </RouterLink>
      </motion.nav>
    </motion.main>
  </Layout>
</template>
