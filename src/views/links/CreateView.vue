<script setup lang="ts">
import { getAxiosInstance } from '@/axios'
import GoBack from '@/components/GoBack.vue'
import { handleInvalidForm } from '@/utils'
import type { FormKitNode } from '@formkit/core'
import { nanoid } from 'nanoid'
interface Payload {
  full_link: string
}

async function createLink(payload: Payload, node?: FormKitNode): Promise<void> {
  try {
    const axiosClient = await getAxiosInstance()
    axiosClient.post('/links', {
      ...payload,
      short_link: nanoid(8)
    })
  } catch (err: any) {
    handleInvalidForm(err, node)
  }
}
</script>
<template>
  <h1>Create New Link</h1>
  <GoBack>or go back to links</GoBack>

  <FormKit type="form" submit-label="Create Link" @submit="createLink">
    <FormKit label="Link" type="url" name="full_link" />
  </FormKit>
</template>
