<template>
  <div>
    <h2 class="text-h6 mb-2">Größe auswählen</h2>
    <v-radio-group v-model="localSelectedSize" class="mb-0">
      <v-radio
        v-for="size in sizes"
        :key="size.id"
        :value="size.id"
        hide-details
        density="compact"
      >
        <template v-slot:label>
          <div class="d-flex justify-space-between align-center w-100">
            <span>{{ size.name }} ({{ size.diameter }}cm)</span>
            <span>+{{ formatPrice(size.additionalPrice) }}</span>
          </div>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  sizes: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: 'medium'
  }
});

const emit = defineEmits(['update:modelValue']);

// Lokale Variable für die Zwei-Wege-Bindung
const localSelectedSize = ref(props.modelValue);

// Update modelValue wenn sich localSelectedSize ändert
watch(localSelectedSize, (newValue) => {
  emit('update:modelValue', newValue);
});

// Update localSelectedSize wenn sich modelValue ändert
watch(() => props.modelValue, (newValue) => {
  localSelectedSize.value = newValue;
});

// Formatierung des Preises
const formatPrice = (price) => {
  return `${price.toFixed(2).replace('.', ',')} €`;
};
</script>