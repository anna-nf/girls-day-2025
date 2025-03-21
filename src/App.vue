<template>
  <v-app>
    <AppHeader />
    
    <v-main>
      <router-view />
    </v-main>
    
    <v-bottom-navigation name="bottom-navigation">
      <!--  navigation items here -->
      <v-btn value="home">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>
      <v-btn value="about">
        <v-icon>mdi-information</v-icon>
        About
      </v-btn>
      <!--  buttons  -->
    </v-bottom-navigation>
    
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue'; 
</script>

