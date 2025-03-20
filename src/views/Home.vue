<template>
    <v-container class="py-4 mb-16">

      <v-text-field
        v-model="search"
        label="Nach Pizzas suchen..."
        variant="outlined"
        density="compact"
        append-inner-icon="mdi-magnify"
        class="mb-4"
      ></v-text-field>
  
      <v-card class="mb-4 pa-4 text-white offer-card">
        <h2 class="text-h6 font-weight-bold">Sonderangebot für Pizza!</h2>
        <p class="text-body-2">Erhalten Sie 20 % Rabatt auf Ihre erste Pizza-Bestellung</p>

      </v-card>

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
  .offer-card {
    background-color: #e53935;
    border-radius: 10px;
    text-align: center;
  }

  .active-filter {
    background-color: #1867c0;
    color: white;
    border-color: #1867c0;
  }

  /* Ensure the bottom navigation is always visible */
  .v-bottom-navigation {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  /* Add appropriate spacing for footer */
  .v-container {
    padding-bottom: 80px !important;
  }
  </style>


