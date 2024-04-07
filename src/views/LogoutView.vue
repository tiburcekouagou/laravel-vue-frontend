<script setup lang="ts">
import { getAxiosInstance } from '@/axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = async () => {
  const axiosClient = await getAxiosInstance()
  await axiosClient.post('/logout')
  router.replace({ name: 'login' })
}
logout()
</script>

<template>
  <div>Logging Out...</div>
</template>
