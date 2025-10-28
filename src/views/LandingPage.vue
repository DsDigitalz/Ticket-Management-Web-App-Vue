<script setup>
import { RouterLink } from "vue-router";
// 🎯 Ensure all necessary component imports are here
import Layout from "../components/common/Layout.vue";
// import FeatureBox from '../components/Landing/FeatureBox.vue'; // <-- UNCOMMENTED/ADDED
import DecorativeCircle from "../components/common/DecorativeCircle.vue";
import AnimateOnScroll from "../components/common/AnimateOnScroll.vue";

// Import Lucide icons for Vue 3
import { Shield, LayoutDashboard, Database } from "lucide-vue-next";

// 🚨 All nested component definitions (like DecorativeCircle) must be removed from here.
// They belong in their own .vue files!
</script>

<template>
  <Layout>
    <section
      class="relative overflow-hidden my-auto pt-30 pb-20 lg:pb-30 text-center bg-[#0F172A] -mx-4 sm:-mx-8 rounded-b-[50px] md:rounded-b-[100px] shadow-xl shadow-black/40"
    >
      <svg
        class="absolute bottom-0 left-0 w-full text-[#1E293B] z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fill-opacity="1"
          d="M0,192L60,197.3C120,203,240,213,360,224C480,235,600,245,720,229.3C840,213,960,171,1080,170.7C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      <DecorativeCircle
        size="200px"
        top="10%"
        left="5%"
        color="#3B82F6"
        :opacity="0.2"
        :z-index="1"
      />
      <DecorativeCircle
        size="150px"
        bottom="35%"
        right="10%"
        color="#A855F7"
        :opacity="0.15"
        :z-index="1"
      />

      <AnimateOnScroll :duration="0.8" :delay="0">
        <header
          class="mb-12 flex px-4 flex-col justify-center items-center relative z-10"
        >
          <h1
            class="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#F8FAFC] mb-4 opacity-90"
          >
            Ticketrax
          </h1>
          <p class="text-xl text-center text-[#94A3B8] mb-8">
            Your robust, multi-platform solution for simple and efficient ticket
            management.
          </p>

          <nav class="space-x-4">
            <RouterLink
              to="/auth/login"
              class="inline-block px-8 py-3 text-lg font-bold rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] transition duration-300 shadow-lg shadow-[#3B82F6]/50"
              aria-label="Login to your account"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/auth/register"
              class="inline-block px-8 py-3 text-lg font-bold rounded-lg border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10 transition duration-300"
              aria-label="Create a new account"
            >
              Get Started
            </RouterLink>
          </nav>
        </header>
      </AnimateOnScroll>
    </section>

    <section class="relative grid md:grid-cols-3 gap-8 pt-20 pb-20">
      <DecorativeCircle
        size="150px"
        top="20%"
        right="45%"
        color="#10B981"
        :opacity="0.1"
        :z-index="0"
      />

      <!-- <FeatureBox
        :icon="LayoutDashboard"
        title="Unified Design"
        description="A consistent look across all frameworks (React, Vue, Twig)."
        :delay="0.1"
      />
      <FeatureBox
        :icon="Shield"
        title="Secure Workflow"
        description="Protected routes and session management with local storage."
        :delay="0.25"
      />
      <FeatureBox
        :icon="Database"
        title="Full CRUD"
        description="Create, Read, Update, and Delete tickets with real-time validation."
        :delay="0.4"
      /> -->
    </section>
  </Layout>
</template>
