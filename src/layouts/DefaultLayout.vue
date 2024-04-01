<script setup lang="ts">
import TheMainNav from '@/components/TheMainNav.vue'
</script>
<template>
  <div>
    <TheMainNav />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
