<script setup lang="ts">
import { getAxiosInstance } from '@/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
interface LoginPayload {
  email: string
  password: string
}

const router = useRouter()
const form = ref<LoginPayload>({
  email: '',
  password: ''
})

async function login(form: LoginPayload) {
  const axiosClient = await getAxiosInstance()
  await axiosClient.post('/login', form)
  router.replace({ name: 'me' })
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login(form)">
      <label>
        <div>Email</div>
        <input type="text" />
      </label>

      <label>
        <div>Password</div>
        <input type="password" />
      </label>
      <button class="btn">Login</button>
    </form>

    <p>
      Don't have an account?
      <router-link class="underline text-lime-600" to="/register">Register now!</router-link>
    </p>
  </div>
</template>
