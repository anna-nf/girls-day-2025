<template>
    <v-card class="pizza-card" elevation="3" rounded="lg" @click="navigateToPizzaDetail">
      <!-- Pizza-Bild mit "Beliebt"-Chip & Rating -->
    <div class="image-container position-relative">
      <v-img :src="getImagePath(imageName)" :alt="name" class="pizza-image" :class="{'rounded-t-lg': true}"></v-img>
      <div class="d-flex justify-space-between position-absolute top-0 w-100 pa-2">
        <div>
          <v-chip v-if="isPopular" color="white" text-color="white" variant="flat" class="mr-1">Beliebt</v-chip>
          <v-chip v-if="isNew" color="orange" text-color="white" variant="flat" class="mr-1">Neu</v-chip>
          <v-chip v-if="isVegan" color="green" text-color="white" variant="flat" class="mr-1">Vegan</v-chip>
          <v-chip v-if="isSpicy" color="red" text-color="white" variant="flat" class="mr-1">Scharf</v-chip>
        </div>
        <v-spacer></v-spacer>
        <v-chip color="white" text-color="white" variant="flat">
          <v-icon size="16">mdi-star</v-icon> {{ rating }}
        </v-chip>
      </div>
    </div>
  
      <!-- Unterer Bereich der Karte -->
      <v-card-text class="card-content">
        <h3 class="text-h6">{{ name }}</h3>
      </v-card-text>
  
      <v-divider></v-divider>
  
      <!-- Herz-Icon -->
      <v-card-actions class="card-actions">
        <v-spacer></v-spacer>
        <v-btn 
          :icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'" 
          :color="isFavorite ? 'red' : undefined"
          variant="text" 
          @click.stop="toggleFavorite"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import favoriteStore from "../stores/favoriteStore";
  
  const router = useRouter();
  
  // Props für dynamische Inhalte
  const props = defineProps({
    id: String,
    name: String,
    imageName: String,
    rating: Number,
    isPopular: Boolean,
    isNew: Boolean,
    isVegan: Boolean,
    isSpicy: Boolean,
  });
  
  // Use the centralized image path helper
  const getImagePath = (imageName) => {
  return `${import.meta.env.BASE_URL}images/${imageName}.png`;
};

  
  // Favoriten-Logik mit dem Store
  const isFavorite = computed(() => favoriteStore.isFavorite(props.id));
  
  const toggleFavorite = () => {
    favoriteStore.toggleFavorite(props.id);
  };

  // Navigation zur Detail-Seite
  const navigateToPizzaDetail = () => {
    // Erzeugt eine ID aus dem Namen für die URL
    const pizzaId = props.id || props.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/pizza/${pizzaId}`);
  };
  </script>
  
  <style scoped>
  .pizza-card {
    transition: transform 0.2s;
    cursor: pointer;
  }
  
  .pizza-card:hover {
    transform: translateY(-5px);
  }
  </style>
