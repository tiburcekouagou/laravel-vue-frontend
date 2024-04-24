<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
const router = useRouter()

const { logout } = useAuth(router)
logout()
</script>

<template>
  <div>Logging Out...</div>
</template>
