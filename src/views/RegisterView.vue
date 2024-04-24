<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import type { RegisterPayload } from '@/types'
import { FormKit } from '@formkit/vue'
import { AxiosError } from 'axios'
import { type FormKitNode } from '@formkit/core'

const { register } = useAuth()

async function handleRegistration(payload: RegisterPayload, node?: FormKitNode) {
  try {
    await register(payload)
  } catch (err: any) {
    if (err instanceof AxiosError && err.response?.status === 422) {
      node?.setErrors([], err.response.data.errors)
    }
  }
}
</script>
<template>
  <div class="register">
    <h1>Register</h1>
    <FormKit type="form" submit-label="Register" @submit.prevent="handleRegistration">
      <FormKit label="Name" name="name" />
      <FormKit type="email" label="Email" name="email" />
      <FormKit
        type="password"
        label="Password"
        name="password"
        validation="required"
      />
      <FormKit type="password" label="Confirm Password" name="password_confirmation" validation="required|confirm:password" />
    </FormKit>

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
