<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <input
    :value="modelValue"
    :disabled="disabled"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
</template>

<script setup lang="ts">
interface Props {
  modelValue: string,
  disabled?: boolean
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>
