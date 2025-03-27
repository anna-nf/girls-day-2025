<template>
  <v-text-field
    v-model="internalValue"
    :label="label"
    variant="outlined"
    density="compact"
    append-inner-icon="mdi-magnify"
    class="mb-4"
  />
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: 'Nach Pizzas suchen...',
  },
});

const emit = defineEmits(['update:modelValue']);
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
