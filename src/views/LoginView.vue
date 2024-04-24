<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { AxiosError } from 'axios';

interface LoginErrors {
  [key: string]: string[];
}

const form = ref({
  email: '',
  password: ''
})

const errors = ref<LoginErrors>({
  email: [],
  password: [],
});

const { login } = useAuth()
async function handleLogin() {
  try {
    await login(form.value);
  } catch (err: any) {
    if (err instanceof AxiosError && err.response?.status === 422) {
      errors.value = err.response.data.errors;
    }
  }
}

</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="space-y-2">
      <label>
        <div>Email</div>
        <input class="p-2 outline-none border block w-full" type="text" v-model="form.email" />
        <div class="text-red-600 p-1" v-for="error in errors.email" :key="error">{{ error  }}</div>
      </label>
      
      <label>
        <div>Password</div>
        <input
        class="p-2 outline-none border block w-full"
        type="password"
        v-model="form.password"
        />
        <div class="text-red-600 p-1" v-for="error in errors.password" :key="error">{{ error  }}</div>
      </label>
      <button class="px-2 py-1 text-white bg-gray-700 rounded-md">Login</button>
    </form>

    <p>
      Don't have an account?
      <router-link class="underline text-lime-600" to="/register">Register now!</router-link>
    </p>
  </div>
</template>

<style scoped></style>
