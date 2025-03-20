<template>
  <v-container class="mb-16">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-6">Mein Profil</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="d-flex align-center text-h5 font-weight-bold">
            <v-icon icon="mdi-heart" color="red" class="mr-2"></v-icon>
            Meine Lieblingspizzas
          </v-card-title>

          <!-- Keine Favoriten -->
          <v-card-text v-if="favoritePizzas.length === 0" class="text-center pt-6">
            <v-icon icon="mdi-pizza" size="100" color="grey-lighten-1" class="mb-4"></v-icon>
            <p class="text-body-1">Du hast noch keine Lieblingspizzas ausgewählt.</p>
            <p class="text-body-2 mb-4">Markiere deine Lieblingspizzas mit dem Herz-Symbol, um sie hier zu speichern.</p>
            <v-btn color="primary" to="/" prepend-icon="mdi-pizza">
              Zur Speisekarte
            </v-btn>
          </v-card-text>

          <!-- Liste der Favoriten -->
          <div v-else>
            <v-row class="mt-2">
              <v-col v-for="pizza in favoritePizzas" :key="pizza.id" cols="12" sm="6" md="4">
                <v-card class="favorite-card mx-auto" max-width="400" height="100%" @click="navigateToPizzaDetail(pizza.id)">
                  
                  <!-- Bild der Pizza -->
                  <v-img
                    :src="getImagePath(pizza.imageName)"
                    :alt="pizza.name"
                    width="100"
                    height="100"
                    class="rounded-lg pizza-img"
                    contain
                  ></v-img>

                  <!-- Pizza Infos -->
                  <div class="ml-4">
                    <v-card-title class="pa-0 text-subtitle-1 font-weight-bold">{{ pizza.name }}</v-card-title>
                    <v-card-subtitle class="pa-0 pb-1">
                      <v-icon icon="mdi-star" size="small" color="amber"></v-icon>
                      {{ pizza.rating }}
                    </v-card-subtitle>
                  </div>

                  <v-spacer></v-spacer>

                  <!-- Favoriten-Button -->
                  <v-btn
                    icon="mdi-heart"
                    color="red"
                    variant="text"
                    @click.stop="removeFavorite(pizza.id)"
                    class="mr-2"
                  ></v-btn>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import favoriteStore from '../stores/favoriteStore';
import { getImagePath } from '../data/pizzaData';

const router = useRouter();
const favoritePizzas = favoriteStore.favoritePizzas;

const navigateToPizzaDetail = (id) => {
  router.push(`/pizza/${id}`);
};

const removeFavorite = (id) => {
  favoriteStore.toggleFavorite(id);
};
</script>

<style scoped>
.v-container {
  padding-bottom: 80px !important;
}

.favorite-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
}

.favorite-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.pizza-img {
  border-radius: 12px;
}
</style>
