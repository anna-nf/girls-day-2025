<template>
  <v-card class="pa-4 h-100">
    <h2 class="text-h6 mb-4">Zusätzliche Zutaten</h2>
    <v-row dense>
      <v-col v-for="topping in toppings" :key="topping.id" cols="12" sm="6">
        <v-checkbox
          v-model="localSelectedToppings"
          :value="topping.id"
          hide-details
          density="compact"
        >
          <template v-slot:label>
            <div class="d-flex justify-space-between align-center w-100">
              <span>{{ topping.name }}</span>
              <span>+{{ formatPrice(topping.price) }}</span>
            </div>
          </template>
        </v-checkbox>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  toppings: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:modelValue']);

// Lokale Variable für die Zwei-Wege-Bindung
const localSelectedToppings = ref(props.modelValue);

// Update modelValue wenn sich localSelectedToppings ändert
watch(localSelectedToppings, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

// Update localSelectedToppings wenn sich modelValue ändert
watch(() => props.modelValue, (newValue) => {
  localSelectedToppings.value = newValue;
}, { deep: true });

// Formatierung des Preises
const formatPrice = (price) => {
  return `${price.toFixed(2).replace('.', ',')} €`;
};
</script>

<style scoped>
.v-checkbox {
  margin-bottom: 8px;
}
</style>