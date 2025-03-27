<template>
  <v-row class="mb-4">
    <v-col v-for="filter in filters" :key="filter.text" cols="3">
      <v-btn
        variant="outlined"
        block
        rounded
        size="small"
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
</script>

<style scoped>
.active-filter {
  background-color: #2cabd8;
  color: white;
  border-color: #2cabd8;
}
</style>
