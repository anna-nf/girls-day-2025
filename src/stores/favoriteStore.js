import { ref, computed } from 'vue';
import { pizzas, getImagePath } from '../data/pizzaData.js';

// Store for managing favorite pizzas
const favoritePizzaIds = ref([]);

// Export favorite store functions and state
export default {
  // State
  favoritePizzaIds,
  
  // Computed
  favoritePizzas: computed(() => {
    return pizzas.filter(pizza => favoritePizzaIds.value.includes(pizza.id));
  }),
  
  // Actions
  toggleFavorite(pizzaId) {
    const index = favoritePizzaIds.value.indexOf(pizzaId);
    if (index === -1) {
      // Add to favorites
      favoritePizzaIds.value.push(pizzaId);
    } else {
      // Remove from favorites
      favoritePizzaIds.value.splice(index, 1);
    }
  },
  
  isFavorite(pizzaId) {
    return favoritePizzaIds.value.includes(pizzaId);
  }
};
