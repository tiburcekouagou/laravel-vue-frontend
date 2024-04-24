<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { AxiosError } from 'axios'
import type { LoginPayload } from '@/types'
import type { FormKitNode } from '@formkit/core'

const { login } = useAuth()
async function handleLogin(payload: LoginPayload, node?: FormKitNode) {
  try {
    await login(payload)
  } catch (err: any) {
    if (err instanceof AxiosError && err.response?.status === 422) {
      node?.setErrors([], err.response.data.errors)
    }
  }
}
</script>

<template>
  <div class="login">
    <h1>Login</h1>
    <FormKit type="form" submit-label="Login" @submit="handleLogin">
      <FormKit label="Email" name="email" type="email" />
      <FormKit label="Password" name="password" type="password" />
    </FormKit>

    <p>
      Don't have an account?
      <router-link class="underline text-lime-600" to="/register">Register now!</router-link>
    </p>
  </div>
</template>

<style scoped></style>
