import { ref, computed } from 'vue';

export const useCartStore = () => {
  const cartItems = ref([]);
  const deliveryFee = 2.50;

  // Berechnung der Zwischensumme
  const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + getItemTotal(item);
    }, 0);
  });

  // Berechnung der Gesamtsumme
  const total = computed(() => {
    return subtotal.value + deliveryFee;
  });

  // Berechnet den Gesamtpreis für ein Produkt
  const getItemTotal = (item) => {
    const basePrice = item.basePrice;
    const sizePrice = item.size.additionalPrice;
    const toppingsPrice = item.toppings.reduce((sum, topping) => sum + topping.price, 0);
    
    return (basePrice + sizePrice + toppingsPrice) * item.quantity;
  };

  // Fügt ein Produkt zum Warenkorb hinzu
  const addToCart = (pizza, size, toppings) => {
    const newItem = {
      id: `${pizza.id}-${Date.now()}`, // Eindeutige ID erzeugen
      name: pizza.name,
      imageName: pizza.imageName,
      basePrice: pizza.basePrice,
      size: size,
      toppings: toppings,
      quantity: 1
    };
    
    cartItems.value.push(newItem);
  };

  // Erhöht die Menge eines Artikels
  const increaseQuantity = (index) => {
    cartItems.value[index].quantity += 1;
  };

  // Verringert die Menge eines Artikels
  const decreaseQuantity = (index) => {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity -= 1;
    }
  };

  // Entfernt ein Produkt aus dem Warenkorb
  const removeItem = (index) => {
    cartItems.value.splice(index, 1);
  };

  // Leert den Warenkorb
  const clearCart = () => {
    cartItems.value = [];
  };

  return {
    cartItems,
    deliveryFee,
    subtotal,
    total,
    getItemTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
  };
};

// Erstellen einer Singleton-Instanz
const cartStore = useCartStore();
export default cartStore;