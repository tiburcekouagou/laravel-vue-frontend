<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
const router = useRouter()

const { user } = useAuth(router) // using user directly from useAuth
</script>

<template>
  <div v-if="user">
    <p><strong>User Name:</strong> {{ user.name }}</p>
    <p><strong>User Email:</strong> {{ user.email }}</p>
  </div>
</template>
