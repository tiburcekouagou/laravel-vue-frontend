<script setup lang="ts">
import GoBack from '@/components/GoBack.vue'
import { useLinks } from '@/composables/useLinks';
import { useRoute, useRouter } from 'vue-router';
import type {FormKitNode} from '@formkit/core'
import type { Link } from '@/types';
import { handleInvalidForm } from '@/utils';

const route = useRoute();
const router = useRouter();
const {find, link, update} = useLinks();
await find(Number (route.params.id))

async function handleUpdate(payload: Partial<Link>, node?: FormKitNode) {
  try {
    await update(Number(route.params.id), payload)
    router.back()
  } catch (err: any) {
    handleInvalidForm(err, node)
  }
}
</script>
<template>
  <h1>Update Link</h1>
  <GoBack>or go back to links</GoBack>
  <div v-if="link">
    <FormKit type="form" submit-label="Update link" @submit="handleUpdate">
    <FormKit type="text" name="short_link" label="Short Link" :value="link.short_link" />
    <FormKit type="text" name="full_link" label="Full Link" :value="link.full_link" />
  </FormKit>
  </div>
</template>
