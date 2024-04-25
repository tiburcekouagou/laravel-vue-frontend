<script setup lang="ts">
import TheMainNav from '@/components/TheMainNav.vue'
</script>
<template>
  <div>
    <TheMainNav />
    <div class="p-10">
      <Suspense>
        <router-view></router-view>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </div>
  </div>
</template>
