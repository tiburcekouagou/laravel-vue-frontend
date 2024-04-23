<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const form = ref({
  email: '',
  password: ''
})
const { login } = useAuth()
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login(form)" class="space-y-2">
      <label>
        <div>Email</div>
        <input class="p-2 outline-none border block w-full" type="text" v-model="form.email" />
      </label>

      <label>
        <div>Password</div>
        <input
          class="p-2 outline-none border block w-full"
          type="password"
          v-model="form.password"
        />
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
