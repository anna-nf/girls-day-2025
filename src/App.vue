<template>
  <v-app>
    <AppHeader />
    
    <v-main>
      <router-view />
    </v-main>
    
    
    <AppFooter />
    
    <!-- Add dialog for checkout -->
    <v-dialog v-model="checkoutDialog" max-width="500px">
      <v-card>
        <v-card-title>Checkout</v-card-title>
        <v-card-text>
          Checkout content goes here
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="checkoutDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { ref } from 'vue';

// Define the missing variables
const activeTab = ref('home');
const checkoutDialog = ref(false);
</script>

