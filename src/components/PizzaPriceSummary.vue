<template>
  <v-card class="pa-4 h-100 price-summary" variant="outlined" border>
    <h2 class="text-h6 mb-4">Deine Pizza</h2>
    
    <div class="d-flex justify-space-between">
      <div class="text-body-1">{{ pizza.name }} (Grundpreis):</div>
      <div class="text-body-1">{{ formatPrice(pizza.basePrice) }}</div>
    </div>
    
    <div class="d-flex justify-space-between" v-if="sizeAdditionalPrice > 0">
      <div class="text-body-1">Größe ({{ currentSize.name }}):</div>
      <div class="text-body-1">+ {{ formatPrice(sizeAdditionalPrice) }}</div>
    </div>
    
    <div v-if="selectedToppings.length > 0">
      <div class="d-flex justify-space-between" v-for="topping in selectedToppingObjects" :key="topping.id">
        <div class="text-body-1">{{ topping.name }}:</div>
        <div class="text-body-1">+ {{ formatPrice(topping.price) }}</div>
      </div>
    </div>
    
    <v-divider class="my-3"></v-divider>
    
    <div class="d-flex justify-space-between">
      <div class="text-h6 font-weight-bold">Gesamtpreis:</div>
      <div class="text-h6 font-weight-bold primary--text">{{ formatPrice(totalPrice) }}</div>
    </div>

    <v-btn 
      size="large" 
      block 
      prepend-icon="mdi-cart" 
      class="mt-4 add-to-cart-button"
      @click="addToCartAndNavigate"
      :loading="isAddingToCart"
    >
      In den Warenkorb
    </v-btn>

  </v-card>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import cartStore from '../stores/cartStore';

const router = useRouter();
const isAddingToCart = ref(false);

const props = defineProps({
  pizza: {
    type: Object,
    required: true
  },
  selectedSize: {
    type: String,
    required: true
  },
  selectedToppings: {
    type: Array,
    default: () => []
  },
  pizzaSizes: {
    type: Array,
    required: true
  },
  allToppings: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);

// Hilfsfunktionen für Preis-Berechnungen
const currentSize = computed(() => {
  return props.pizzaSizes.find(size => size.id === props.selectedSize);
});

const sizeAdditionalPrice = computed(() => {
  return currentSize.value ? currentSize.value.additionalPrice : 0;
});

const selectedToppingObjects = computed(() => {
  return props.selectedToppings.map(toppingId => {
    return props.allToppings.find(t => t.id === toppingId);
  });
});

const toppingsPrice = computed(() => {
  return selectedToppingObjects.value.reduce((total, topping) => {
    return total + topping.price;
  }, 0);
});

// Berechnung des Gesamtpreises
const totalPrice = computed(() => {
  if (!props.pizza) return 0;
  return props.pizza.basePrice + sizeAdditionalPrice.value + toppingsPrice.value;
});

// Methode zum Hinzufügen zum Warenkorb und Navigation zum Warenkorb
const addToCartAndNavigate = () => {
  isAddingToCart.value = true;
  
  // Wir erstellen ein size-Objekt und toppings-Array im Format, das der Warenkorb erwartet
  const sizeObject = {
    id: props.selectedSize,
    name: currentSize.value.name,
    additionalPrice: currentSize.value.additionalPrice
  };
  
  const toppingsArray = selectedToppingObjects.value.map(topping => ({
    id: topping.id,
    name: topping.name,
    price: topping.price
  }));
  
  // Zum Warenkorb hinzufügen
  cartStore.addToCart(props.pizza, sizeObject, toppingsArray);
  
  // Event emittieren
  emit('add-to-cart');
  
  // Kurze Animation, dann zum Warenkorb navigieren
  setTimeout(() => {
    isAddingToCart.value = false;
    router.push('/cart');
  }, 500);
};

// Formatierung des Preises für die Anzeige
const formatPrice = (price) => {
  return `${price.toFixed(2).replace('.', ',')} €`;
};
</script>

<style scoped>
.price-summary {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background-color: #f5f5f5;
}

.add-to-cart-button {
  background-color: #2cabd8;
  color: #fff;
}
</style>