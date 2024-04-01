<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const id = ref<string>('')
</script>
<template>
  <h1>show view {{ $route.params.id }}</h1>
</template>
