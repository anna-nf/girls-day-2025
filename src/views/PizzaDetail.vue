<template>
  <v-container class="mb-16">
    <!-- Navigation zurück -->
    <v-row>
      <v-col cols="12">
        <v-btn prepend-icon="mdi-arrow-left" variant="text" to="/">
          Zurück zur Übersicht
        </v-btn>
      </v-col>
    </v-row>

    <!-- Erste Reihe: Pizza-Bild und Grundinformationen + Größenauswahl -->
    <v-row v-if="pizza">
      <v-col cols="12" md="6">
        <v-img
          :src="getImagePath(pizza.imageName)"
          :alt="pizza.name"
          height="400"
          cover
          class="rounded-lg"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <div class="d-flex align-center mb-4">
          <h1 class="text-h4 font-weight-bold">{{ pizza.name }}</h1>
          <v-spacer></v-spacer>
          <v-chip class="ml-2" color="amber">
            <v-icon start>mdi-star</v-icon>
            {{ pizza.rating }}
          </v-chip>
        </div>

        <div class="d-flex flex-wrap mb-6">
          <v-chip v-if="pizza.isPopular" class="mr-2 mb-2" color="amber-darken-2" text-color="white">
            <v-icon start>mdi-star-outline</v-icon>
            Beliebt
          </v-chip>
          <v-chip v-if="pizza.isNew" class="mr-2 mb-2" color="orange" text-color="white">
            <v-icon start>mdi-fire</v-icon>
            Neu
          </v-chip>
          <v-chip v-if="pizza.isVegan" class="mr-2 mb-2" color="green" text-color="white">
            <v-icon start>mdi-leaf</v-icon>
            Vegan
          </v-chip>
          <v-chip v-if="pizza.isSpicy" class="mr-2 mb-2" color="#e12226" text-color="white">
            <v-icon start>mdi-chili-hot</v-icon>
            Scharf
          </v-chip>
        </div>

        <h2 class="text-h6 mb-2">Beschreibung</h2>
        <p class="text-body-1 mb-4">
          {{ pizza.description || 'Eine köstliche Pizza mit ausgewählten Zutaten, perfekt zubereitet im Steinofen.' }}
        </p>

        <!-- Größenauswahl Komponente -->
        <PizzaSizeSelector 
          :sizes="pizzaSizes" 
          v-model="selectedSize"
        />
      </v-col>
    </v-row>

    <!-- Zweite Reihe: Zusätzliche Zutaten links und Preiszusammenfassung rechts -->
    <v-row v-if="pizza" class="mt-4">
      <!-- Zusätzliche Zutaten Komponente -->
      <v-col cols="12" md="6">
        <PizzaToppingsSelector 
          :toppings="toppings"
          v-model="selectedToppings"
        />
      </v-col>

      <!-- Preiszusammenfassung Komponente -->
      <v-col cols="12" md="6">
        <PizzaPriceSummary
          :pizza="pizza"
          :selected-size="selectedSize"
          :selected-toppings="selectedToppings"
          :pizza-sizes="pizzaSizes"
          :all-toppings="toppings"
          @add-to-cart="addToCart"
        />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="error">
          Diese Pizza wurde nicht gefunden.
        </v-alert>
      </v-col>
    </v-row>

    <!-- Snackbar for cart notification -->
    <v-snackbar
      v-model="snackbar"
      :timeout="40000"
      color="success"
      location="top"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        Pizza wurde zum Warenkorb hinzugefügt!
      </div>
      
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Schließen
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import PizzaSizeSelector from '../components/PizzaSizeSelector.vue';
import PizzaToppingsSelector from '../components/PizzaToppingsSelector.vue';
import PizzaPriceSummary from '../components/PizzaPriceSummary.vue';
import { getPizzaById, getImagePath } from '../data/pizzaData.js';
import { pizzaSizes, availableToppings } from '../data/constants.js';

const route = useRoute();
const pizzaId = computed(() => route.params.id);

// Auswahl für Größe und Zutaten
const selectedSize = ref('medium'); // Standard-Größe
const selectedToppings = ref([]); // Ausgewählte Zutaten

// Get data from constants
const toppings = ref(availableToppings);

// Get pizza by ID
const pizza = computed(() => {
  return getPizzaById(pizzaId.value);
});

// State for snackbar
const snackbar = ref(false);

// Funktion zum Hinzufügen der Pizza zum Warenkorb
const addToCart = () => {
  // Hier würde die Warenkorb-Logik implementiert werden
  snackbar.value = true;
};
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.v-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Add appropriate spacing for footer */
.v-container {
  padding-bottom: 80px !important;
}
</style>