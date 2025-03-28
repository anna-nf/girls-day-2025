<template>
  <v-container class="mb-16">
    <v-row>
      <v-col cols="12" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-6">Warenkorb</h1>
      </v-col>
    </v-row>

    <!-- Wenn der Warenkorb leer ist -->
    <v-row v-if="cartItems.length === 0">
      <v-col cols="12" class="text-center">
        <v-icon icon="mdi-cart-off" size="100" color="grey-lighten-1" class="mb-4"></v-icon>
        <h2 class="text-h5 mb-4">Dein Warenkorb ist leer</h2>
        <p class="mb-6">Füge köstliche Pizzen hinzu, um deine Bestellung zu starten.</p>
        <v-btn color="#2cabd8" to="/" prepend-icon="mdi-pizza">
          Zurück zur Speisekarte
        </v-btn>
      </v-col>
    </v-row>

    <!-- Wenn Artikel im Warenkorb sind -->
    <template v-else>
      <v-row>
        <v-col cols="12" lg="8">
          <v-card class="mb-4">
            <v-card-title class="bg-grey-lighten-4 py-3 px-4">
              Deine Artikel
            </v-card-title>
            <v-divider></v-divider>
            
            <v-list>
              <v-list-item
                v-for="(item, index) in cartItems"
                :key="index"
                :border="index < cartItems.length - 1"
              >
                <template v-slot:prepend>
                  <v-img
                    :src="getImagePath(item.imageName)"
                    :alt="item.name"
                    width="80"
                    height="80"
                    class="rounded-lg mr-4"
                  ></v-img>
                </template>
                
                <v-list-item-title class="font-weight-bold">
                  {{ item.name }}
                  <span class="text-subtitle-2">({{ item.size.name }})</span>
                </v-list-item-title>
                
                <v-list-item-subtitle class="mt-1">
                  <v-chip v-if="item.toppings.length > 0" size="x-small" class="mr-1">
                    + {{ item.toppings.length }} Zutaten
                  </v-chip>
                </v-list-item-subtitle>
                
                <v-list-item-subtitle class="d-flex align-center mt-2">
                  <v-btn-group variant="outlined" density="comfortable">
                    <v-btn icon="mdi-minus" @click="decreaseQuantity(index)" density="comfortable"></v-btn>
                    <v-btn disabled density="comfortable">{{ item.quantity }}</v-btn>
                    <v-btn icon="mdi-plus" @click="increaseQuantity(index)" density="comfortable"></v-btn>
                  </v-btn-group>
                </v-list-item-subtitle>
                
                <template v-slot:append>
                  <div class="d-flex flex-column align-end">
                    <div class="text-h6 mb-1">{{ formatPrice(getItemTotal(item)) }}</div>
                    <v-btn 
                      icon="mdi-delete-outline"
                      variant="text"
                      color="#e12226"
                      density="comfortable"
                      @click="removeItem(index)"
                    ></v-btn>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Zusammenfassung der Bestellung -->
        <v-col cols="12" lg="4">
          <v-card class="order-summary">
            <v-card-title class="bg-grey-lighten-4 py-3 px-4">
              Zusammenfassung
            </v-card-title>
            <v-divider></v-divider>
            
            <v-card-text class="py-4">
              <div class="d-flex justify-space-between mb-2">
                <span>Zwischensumme:</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              
              <div class="d-flex justify-space-between mb-2">
                <span>Lieferkosten:</span>
                <span>{{ formatPrice(deliveryFee) }}</span>
              </div>
              
              <v-divider class="my-3"></v-divider>
              
              <div class="d-flex justify-space-between font-weight-bold">
                <span class="text-h6">Gesamtsumme:</span>
                <span class="text-h6 primary--text">{{ formatPrice(total) }}</span>
              </div>
            </v-card-text>
            
            <v-divider></v-divider>
            
            <v-card-actions class="pa-4">
              <v-btn color="primary" block size="large" @click="checkout" prepend-icon="mdi-check">
                Bestellung aufgeben
              </v-btn>
            </v-card-actions>
          </v-card>
          
          <v-btn block variant="text" class="mt-4" to="/" prepend-icon="mdi-arrow-left">
            Weiter einkaufen
          </v-btn>
        </v-col>
      </v-row>
    </template>

    <!-- Checkout confirmation dialog -->
    <v-dialog v-model="checkoutDialogOpen" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Bestellung bestätigen</v-card-title>
        <v-card-text>   
          <!-- Bestelldetails -->
          <v-list class="bg-transparent">
  
            <v-list-item v-for="(item, index) in cartItems" :key="index" density="compact">
              <v-list-item-title>
                {{ item.quantity }}x {{ item.name }} ({{ item.size.name }})
              </v-list-item-title>
              <template v-slot:append>
                {{ formatPrice(getItemTotal(item)) }}
              </template>
            </v-list-item>
          </v-list>
          
          <v-divider class="my-3"></v-divider>
          
          <div class="d-flex justify-space-between mb-2">
            <span>Zwischensumme:</span>
            <span>{{ formatPrice(subtotal) }}</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span>Lieferkosten:</span>
            <span>{{ formatPrice(deliveryFee) }}</span>
          </div>
          <div class="d-flex justify-space-between font-weight-bold mb-4">
            <span class="text-subtitle-1">Gesamtbetrag:</span>
            <span class="text-subtitle-1">{{ formatPrice(total) }}</span>
          </div>
          
          <p><strong>Lieferadresse:</strong> {{ deliveryAddress || 'Heidenkampsweg 73' }}</p>
          <p><strong>Geschätzte Lieferzeit:</strong> {{ estimatedDeliveryTime }} Minuten</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="checkoutDialogOpen = false">Abbrechen</v-btn>
          <v-btn color="success" @click="confirmOrder">Bestätigen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import cartStore from '../stores/cartStore';
import { getImagePath } from '../data/pizzaData';
import { ref } from 'vue';

const router = useRouter();

// Daten aus dem Cart-Store verwenden
const { 
  cartItems, 
  deliveryFee, 
  subtotal, 
  total, 
  getItemTotal, 
  increaseQuantity, 
  decreaseQuantity, 
  removeItem, 
  clearCart 
} = cartStore;

// Dialog-Steuerung
const checkoutDialogOpen = ref(false);
const deliveryAddress = ref('');
const estimatedDeliveryTime = ref(0);

// Aktualisierte Checkout-Funktion, um Dialog zu öffnen
const checkout = () => {
  if (cartItems.value.length === 0) {
    alert('Dein Warenkorb ist leer');
    return;
  }
  
  // Lieferzeit berechnen (25-45 Minuten)
  estimatedDeliveryTime.value = Math.floor(Math.random() * 20) + 25;
  
  // Öffne den Checkout-Dialog
  checkoutDialogOpen.value = true;
};

// Funktion zur Bearbeitung der endgültigen Bestellbestätigung
const confirmOrder = () => {
  // Bestelldetails basierend auf Artikeln im Warenkorb erstellen
  const orderDetails = {
    deliveryTime: estimatedDeliveryTime.value,
    pizzaName: cartItems.value.map(item => `${item.quantity}x ${item.name}`).join(', '),
    pizzaSize: cartItems.value[0].size.name,
    address: deliveryAddress.value || 'Heidenkampsweg 73',
    totalAmount: total.value
  };
  
  // Bestelldetails in localStorage oder State-Management speichern, falls nötig
  localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
  
  // Dialog schließen
  checkoutDialogOpen.value = false;
  
  // Warenkorb leeren
  clearCart();
  
  // Zur Startseite navigieren anstatt zur Bestätigungsseite
  router.push('/');
};

// Formatierung des Preises für die Anzeige
const formatPrice = (price) => {
  return `${price.toFixed(2).replace('.', ',')} €`;
};
</script>

<style scoped>
.order-summary {
  border-radius: 8px;
  position: sticky;
  top: 80px;
}

.v-list-item {
  padding: 16px;
}

@media (max-width: 600px) {
  .v-list-item__content {
    padding-right: 0;
  }
}

/* Add appropriate spacing for footer */
.v-container {
  padding-bottom: 80px !important;
}
</style>