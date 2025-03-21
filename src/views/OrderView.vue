<template>
  <v-container>
    <h2 class="text-h4 mb-4">Pizza Bestellung</h2>
    
    <v-card class="mb-4">
      <v-card-title>Wählen Sie Ihre Pizza</v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedPizza"
          :items="pizzaOptions"
          label="Pizza Typ"
          return-object
        ></v-select>
        
        <v-radio-group v-model="selectedSize" label="Größe">
          <v-radio value="Klein (26cm)" label="Klein (26cm)"></v-radio>
          <v-radio value="Mittel (28cm)" label="Mittel (28cm)"></v-radio>
          <v-radio value="Groß (32cm)" label="Groß (32cm)"></v-radio>
        </v-radio-group>
        
        <v-text-field
          v-model="address"
          label="Lieferadresse"
          placeholder="Straße, Hausnummer, PLZ, Stadt"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="placeOrder">Bestellung aufgeben</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, inject } from 'vue';


// Pizza options
const pizzaOptions = [
  { title: 'Margherita', ingredients: 'Tomaten, Mozzarella, Basilikum' },
  { title: 'Salami', ingredients: 'Tomaten, Mozzarella, Salami' },
  { title: 'Hawaii', ingredients: 'Tomaten, Mozzarella, Schinken, Ananas' },
  { title: 'Quattro Formaggi', ingredients: 'Vier verschiedene Käsesorten' }
];

// Form data
const selectedPizza = ref(pizzaOptions[0]);
const selectedSize = ref('Groß (32cm)');
const address = ref('');

// Estimated delivery time (random between 25-45 minutes)
const getRandomDeliveryTime = () => Math.floor(Math.random() * 20) + 25;

// Place order function
const placeOrder = () => {
  // Validate address
  if (!address.value) {
    alert('Bitte geben Sie Ihre Lieferadresse ein.');
    return;
  }
  
  // Create order details
  const orderDetails = {
    deliveryTime: getRandomDeliveryTime(),
    pizzaName: selectedPizza.value.title,
    pizzaSize: selectedSize.value,
    address: address.value
  };
  

};
</script>
