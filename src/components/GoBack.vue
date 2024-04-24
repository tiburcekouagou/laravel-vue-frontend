<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <a href="#" class="text-sm mb-5 italic flex items-center mt-[-10px]">
    <span class="pi pi-arrow-left" @click.prevent="router.back()"></span>
    <slot>Go back</slot>
  </a>
</template>
