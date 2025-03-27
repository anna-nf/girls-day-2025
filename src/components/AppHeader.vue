<template>
  <v-app-bar color="white" elevation="1">
    <v-container class="d-flex align-center">
      <router-link to="/" class="text-decoration-none">
        <img src="/images/girls-app-new.png" alt="App Logo" style="max-height: 100px;" />
      </router-link>

      <v-spacer></v-spacer>
      
      <v-btn icon to="/cart" class="ml-2">
        <v-badge :content="cartItemCount" :model-value="cartItemCount > 0" color="#2cabd8" class="cart-icon" overlap>
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