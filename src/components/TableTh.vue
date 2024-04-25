<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const withoutDash = computed(() => props.name.replace(/^-/, ''))
const withDash = computed(() => `-${withoutDash.value}`)

const sorting = computed(() => props.name === props.modelValue.replace(/^-/, ''))
const desc = computed(() => props.modelValue.startsWith('-'))
</script>
<template>
  <th>
    <button class="flex items-center" @click="$emit('update:modelValue', desc ? withoutDash : withDash)">
      <slot />
      <button v-if="sorting && desc">
        <span class="pi pi-chevron-down inline w-[10px] ml-2"></span>
      </button>
      <button v-if="sorting && !desc">
        <span class="pi pi-chevron-up inline w-[10px] ml-2"></span>
      </button>
    </button>
  </th>
</template>
