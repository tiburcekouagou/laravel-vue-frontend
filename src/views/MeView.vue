<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const {user} = useAuth();
</script>

<template>
  <div v-if="user">
    <p><strong>User Name:</strong> {{ user.name }}</p>
    <p><strong>User Email:</strong> {{ user.email }}</p>
  </div>
</template>
