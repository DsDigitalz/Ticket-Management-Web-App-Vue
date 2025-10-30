<template>
  <Layout>
    <section
      class="flex items-center justify-center min-h-[70vh] py-10 sm:py-16"
    >
      <div
        class="w-full max-w-md bg-[#1E293B] p-8 rounded-xl border border-[#334155] shadow-2xl shadow-black/50"
      >
        <!-- Title -->
        <h2 class="text-3xl font-bold text-center text-[#F8FAFC] mb-8">
          {{ isLogin ? "Login to Ticketrax" : "Create Account" }}
        </h2>

        <!-- Auth Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Username -->
          <div class="space-y-2">
            <label for="username" class="text-[#94A3B8] font-medium"
              >Username</label
            >
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="Enter your username"
              required
              class="bg-[#0F172A] border border-[#334155] text-[#F8FAFC] rounded-lg p-3 w-full focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition duration-150"
            />
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="text-[#94A3B8] font-medium"
              >Password</label
            >
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showMainPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                required
                class="bg-[#0F172A] border border-[#334155] text-[#F8FAFC] rounded-lg p-3 w-full focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition duration-150 pr-10"
              />
              <button
                type="button"
                @click="toggleMainPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8]"
                :aria-label="
                  showMainPassword ? 'Hide password' : 'Show password'
                "
              >
                <component :is="showMainPassword ? EyeOff : Eye" size="20" />
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div v-if="!isLogin" class="space-y-2">
            <label for="confirmPassword" class="text-[#94A3B8] font-medium"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                required
                class="bg-[#0F172A] border border-[#334155] text-[#F8FAFC] rounded-lg p-3 w-full focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition duration-150 pr-10"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8]"
                :aria-label="
                  showConfirmPassword ? 'Hide password' : 'Show password'
                "
              >
                <component :is="showConfirmPassword ? EyeOff : Eye" size="20" />
              </button>
            </div>
          </div>

          <!-- Inline Error -->
          <p v-if="error" class="text-[#EF4444] text-sm mt-1">{{ error }}</p>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-bold py-3 rounded-lg transition duration-200 shadow-lg shadow-[#3B82F6]/30"
          >
            {{ isLogin ? "Login" : "Sign Up" }}
          </button>
        </form>

        <!-- Switch Auth Link -->
        <p class="mt-6 text-center text-[#94A3B8]">
          {{ isLogin ? "Need an account? " : "Already have an account? " }}
          <RouterLink
            :to="isLogin ? '/auth/register' : '/auth/login'"
            class="text-[#3B82F6] hover:text-[#77A4FF] font-medium transition duration-150"
          >
            {{ isLogin ? "Sign Up" : "Log In" }}
          </RouterLink>
        </p>
      </div>
    </section>
  </Layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { Eye, EyeOff } from "lucide-vue-next";
import { useAuth } from "../composables/useAuth";
import Layout from "../components/common/Layout.vue";

const props = defineProps({
  isLogin: Boolean,
});

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const showMainPassword = ref(false);
const showConfirmPassword = ref(false);

const router = useRouter();
const toast = useToast();
const { login, register } = useAuth();

const toggleMainPassword = () =>
  (showMainPassword.value = !showMainPassword.value);
const toggleConfirmPassword = () =>
  (showConfirmPassword.value = !showConfirmPassword.value);

function handleSubmit() {
  error.value = "";

  // Validation
  if (
    !username.value ||
    !password.value ||
    (!props.isLogin && !confirmPassword.value)
  ) {
    error.value = "All fields are mandatory.";
    toast.error("Please fill in all fields.");
    return;
  }

  if (props.isLogin) {
    const success = login(username.value, password.value);
    if (!success) {
      error.value = "Invalid username or password.";
      toast.error("Login failed: Invalid username or password.");
    } else {
      toast.success("Login successful! Redirecting...");
      router.push("/dashboard"); // ✅ Redirect to Dashboard after login
    }
  } else {
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match.";
      toast.error("Password and Confirm Password must match.");
      return;
    }

    const success = register(username.value, password.value);
    if (success) {
      toast.success("Account created successfully! Please log in.");
      router.push("/auth/login");
    }
  }
}
</script>
