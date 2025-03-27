<template>
  <v-row class="mb-4">
    <v-col v-for="filter in filters" :key="filter.text" cols="6" sm="3">
      <v-btn
        variant="tonal"
        block
        rounded
        size="small"
        :style="getBtnStyle(filter.value)"
        :class="{ 'active-filter': activeFilters.includes(filter.value) }"
        @click="toggleFilter(filter.value)"
      >
        <v-icon left :color="activeFilters.includes(filter.value) ? 'white' : filter.iconColor">
          {{ filter.icon }}
        </v-icon> 
        {{ filter.text }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  filters: { type: Array, default: () => [] },
  activeFilters: { type: Array, default: () => [] },
  toggleFilter: { type: Function, required: true },
});

function getBtnStyle(value) {
  if (props.activeFilters.includes(value)) {
    return { backgroundColor: '#2cabd8', color: 'white' };
  }
  
  switch (value) {
    case 'isPopular': return { backgroundColor: '#fef7e7', color: '#e69500' };
    case 'isNew': return { backgroundColor: '#fef4e6', color: '#ff9800' };
    case 'isVegan': return { backgroundColor: '#e9f5eb', color: '#2e7d32' };
    case 'isSpicy': return { backgroundColor: '#fbe6e6', color: '#e12226' };
    default: return { backgroundColor: '#f5f5f5', color: '#000000' };
  }
}
</script>

<style scoped>
.active-filter {
  background-color: #2cabd8 !important;
  color: white !important;
  border-color: #2cabd8 !important;
}
</style>

