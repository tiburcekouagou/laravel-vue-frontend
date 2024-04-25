<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true }
})

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const localValue = ref(props.modelValue)
const debouncedLocalValue = refDebounced(localValue, 500)

watch(debouncedLocalValue, () => {
  console.log('watch', new Date().getMilliseconds())
  emit('update:modelValue', localValue.value)
})
</script>
<template>
  <div class="relative">
    <span class="pi pi-search w-3 absolute top-[50%] translate-y-[-50%] left-2 opacity-30"></span>

    <input type="text" placeholder="Search" class="pl-10 p-2 rounded" v-model="localValue" />
  </div>
</template>
