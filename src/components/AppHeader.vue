<template>
  <v-app-bar color="white" elevation="1">
    <v-container class="d-flex align-center">
      <router-link to="/" class="text-decoration-none">
        <div class="d-flex align-center">
          <v-icon icon="mdi-pizza" color="primary" size="large" class="mr-2"></v-icon>
          <span class="text-h6 font-weight-bold">Pizza App</span>
        </div>
      </router-link>

      <v-spacer></v-spacer>
      
      <v-btn icon to="/cart" class="ml-2">
        <v-badge :content="cartItemCount" :model-value="cartItemCount > 0" color="primary" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import cartStore from '../stores/cartStore';

// Anzahl der Artikel im Warenkorb
const cartItemCount = computed(() => {
  return cartStore.cartItems.value.reduce((count, item) => count + item.quantity, 0);
});
</script>