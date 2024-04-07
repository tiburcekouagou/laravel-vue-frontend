<script setup lang="ts">
import { getAxiosInstance } from '@/axios'
import type { AxiosInstance } from 'axios'
import { onMounted, ref } from 'vue'
import type { AppUser } from '@/types/index'

let axiosClient: AxiosInstance
let user = ref<AppUser>()

onMounted(async function () {
  axiosClient = await getAxiosInstance()
  user.value = (await axiosClient.get('/user')).data
})
</script>

<template>
  <div v-if="user">
    <p><strong>User Name:</strong> {{ user.name }}</p>
    <p><strong>User Email:</strong> {{ user.email }}</p>
  </div>
</template>
