<template>
  <v-bottom-navigation app grow>
    <v-btn @click="navigateTo('/')">
      <v-icon>mdi-home</v-icon>
      Startseite
    </v-btn>
    <v-btn @click="navigateTo('/cart')">
      <v-icon>mdi-cart</v-icon>
      Warenkorg
    </v-btn>
    <v-btn @click="navigateTo('/profile')">
      <v-icon>mdi-account</v-icon>
      Profil
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
