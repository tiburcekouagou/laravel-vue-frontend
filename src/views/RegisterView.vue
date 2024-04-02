<script setup lang="ts">
import axiosClient from '@/axios'
import { ref } from 'vue'

interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const form = ref<RegisterPayload>({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

function register(payload: RegisterPayload) {
  axiosClient
    .get('/sanctum/csrf-cookie', {
      baseURL: 'http://localhost:8000'
    })
    .then(async (response) => {
      const res = await axiosClient.post('/register', payload)
      console.log(res)
    })
}
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register(form)">
      <label>
        <div>Name</div>
        <input type="text" v-model="form.name" />
      </label>

      <label>
        <div>Email</div>
        <input type="email" v-model="form.email" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password" />
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
