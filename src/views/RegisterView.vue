<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { AxiosError } from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

interface RegisterErrors {
  [key: string]: string[];
}

const errors = ref<RegisterErrors>({
  name: [],
  email: [],
  password: [],
})

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const { register } = useAuth()

async function handleRegistration() {
  try {
  await register(form.value);
  } catch(err: any) {
    if (err instanceof AxiosError && err.response?.status === 422) {
      errors.value = err.response.data.errors
    }
  }
}
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleRegistration">
      <label>
        <div>Name</div>
        <input type="text" v-model="form.name" />
        <div class="text-red-600 p-1" v-for="error in errors.name" :key="error">{{ error }}</div>
      </label>

      <label>
        <div>Email</div>
        <input type="email" v-model="form.email" />
        <div class="text-red-600 p-1" v-for="error in errors.email" :key="error">{{ error  }}</div>
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
        <div class="text-red-600 p-1" v-for="error in errors.password" :key="error">{{ error  }}</div>
      </label>

      <label>
        <div>Confirm Password</div>
        <input type="password" v-model="form.password_confirmation" />
      </label>

      <button
        class="text-white bg-gray-700 hover:bg-gray-800 inline-block mt-3 px-3 py-2 rounded-sm shadow-sm"
      >
        Register
      </button>
    </form>

    <p>
      Already have an account?
      <router-link class="underline text-lime-600" to="/login">Login</router-link>
    </p>
  </div>
</template>
<style scoped>
input {
  @apply border border-gray-400 bg-slate-100 rounded-md block w-full;
}
</style>
