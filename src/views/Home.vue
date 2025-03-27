<template>
    <v-container class="py-4 mb-16">

      <SearchField v-model="search" label="Nach Pizzas suchen..." />

      <SpecialOfferCard />

      <PizzaFilterBar
        :filters="filters"
        :activeFilters="activeFilters"
        :toggleFilter="toggleFilter"
      />

      <v-row>
        <v-col v-for="(pizza, index) in filteredPizzas" :key="index" cols="12" md="4">
          <PizzaCard
            :id="pizza.id"
            :name="pizza.name"
            :imageName="pizza.imageName"
            :rating="pizza.rating"
            :isPopular="pizza.isPopular"
            :isNew="pizza.isNew"
            :isVegan="pizza.isVegan"
            :isSpicy="pizza.isSpicy"
          />
        </v-col>
        
        <v-col v-if="filteredPizzas.length === 0" cols="12" class="text-center">
          <v-alert type="info">
            Keine Pizzen gefunden, die zu deiner Suche passen.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <AppFooter />
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import PizzaCard from "../components/PizzaCard.vue";
  import AppFooter from "../components/AppFooter.vue";
  import { pizzas } from "../data/pizzaData.js";
  import { pizzaFilters } from "../data/constants.js";
  import SearchField from '../components/SearchField.vue';
  import SpecialOfferCard from '../components/SpecialOfferCard.vue';
  import PizzaFilterBar from '../components/PizzaFilterBar.vue';
  
  const search = ref("");
  const activeFilters = ref([]);
  
  const filters = ref(pizzaFilters);
  
  // Funktion zum Umschalten der Filter
  const toggleFilter = (filterValue) => {
    const index = activeFilters.value.indexOf(filterValue);
    if (index === -1) {
      activeFilters.value.push(filterValue);
    } else {
      activeFilters.value.splice(index, 1);
    }
  };
  
  // Gefilterte Pizzen basierend auf der Suche und den ausgewählten Filtern
  const filteredPizzas = computed(() => {
    let result = pizzas;
    
    // Textsuche anwenden
    if (search.value) {
      const searchLower = search.value.toLowerCase();
      result = result.filter(pizza => 
        pizza.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter anwenden
    if (activeFilters.value.length > 0) {
      result = result.filter(pizza => {
        return activeFilters.value.some(filter => pizza[filter] === true);
      });
    }
    
    return result;
  });
  </script>
  
  <style scoped>


  /* Add appropriate spacing for footer */
  .v-container {
    padding-bottom: 80px !important;
  }
  </style>


