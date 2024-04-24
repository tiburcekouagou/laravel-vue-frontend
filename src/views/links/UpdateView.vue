<script setup lang="ts">
import GoBack from '@/components/GoBack.vue'
</script>
<template>
  <h1>Update Link</h1>
  <GoBack>or go back to links</GoBack>

  <FormKit type="form" submit-label="Update link">
    <FormKit type="text" name="short_link" label="Short Link" />
    <FormKit type="text" name="full_link" label="Full Link" />
  </FormKit>
</template>
