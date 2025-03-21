<template>
  <v-dialog v-model="dialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 bg-orange-lighten-1 text-white">
        <v-icon class="mr-2">mdi-pizza</v-icon>
        Pizza Bestätigung
      </v-card-title>
      <v-card-text class="pt-4">
        <v-alert
          type="success"
          icon="mdi-check-circle"
          class="mb-4"
        >
          Vielen Dank für Ihre Bestellung!
        </v-alert>
        
        <p class="text-body-1 mb-3">Ihre leckere Pizza wird in <strong>{{ orderDetails.deliveryTime }} Minuten</strong> bei Ihnen eintreffen!</p>
        
        <v-list density="compact" class="bg-grey-lighten-4 rounded">
          <v-list-subheader>Ihre Bestellung:</v-list-subheader>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="orange-darken-2">mdi-food</v-icon>
            </template>
            <v-list-item-title>{{ orderDetails.pizzaName }}</v-list-item-title>
            <v-list-item-subtitle>{{ orderDetails.pizzaSize }}</v-list-item-subtitle>
          </v-list-item>
          
          <v-divider></v-divider>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="green">mdi-map-marker</v-icon>
            </template>
            <v-list-item-title>Lieferadresse:</v-list-item-title>
            <v-list-item-subtitle>{{ orderDetails.address }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        
        <p class="text-caption mt-4">
          Sie können den Status Ihrer Bestellung in der App verfolgen.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          @click="closeDialog"
          variant="elevated"
        >
          Verstanden
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  orderDetails: {
    type: Object,
    default: () => ({
      deliveryTime: 30,
      pizzaName: 'Margherita',
      pizzaSize: 'Groß (32cm)',
      address: 'Musterstraße 123, 12345 Berlin'
    })
  }
});

const emit = defineEmits(['update:modelValue']);

// Create a computed property to bind the dialog visibility
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Method to close the dialog
const closeDialog = () => {
  dialogVisible.value = false;
};
</script>
