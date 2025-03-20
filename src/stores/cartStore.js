import { ref, computed } from 'vue';
import { DELIVERY_FEE } from '../data/constants';
import { formatPrice, getImagePath } from '../data/pizzaData';

// Cart items
const cartItems = ref([]);

// Calculate subtotal
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + getItemTotal(item);
  }, 0);
});

// Calculate total with delivery fee
const total = computed(() => {
  return subtotal.value + DELIVERY_FEE;
});

// Get total price for an item
const getItemTotal = (item) => {
  // Base price + size price
  let itemPrice = item.basePrice + item.size.additionalPrice;
  
  // Add toppings prices
  if (item.toppings && item.toppings.length > 0) {
    item.toppings.forEach(topping => {
      itemPrice += topping.price;
    });
  }
  
  // Multiply by quantity
  return itemPrice * item.quantity;
};

// Add item to cart
const addToCart = (pizza, size, toppings) => {
  // Check if the same pizza with same size and toppings already exists
  const existingItemIndex = cartItems.value.findIndex(item => {
    if (item.id !== pizza.id || item.size.id !== size.id) return false;
    
    // Check if toppings are the same
    if (item.toppings.length !== toppings.length) return false;
    
    // Check each topping
    const toppingIds = toppings.map(t => t.id).sort();
    const itemToppingIds = item.toppings.map(t => t.id).sort();
    
    return JSON.stringify(toppingIds) === JSON.stringify(itemToppingIds);
  });
  
  if (existingItemIndex > -1) {
    // Increase quantity if item already exists
    cartItems.value[existingItemIndex].quantity += 1;
  } else {
    // Add new item
    cartItems.value.push({
      id: pizza.id,
      name: pizza.name,
      imageName: pizza.imageName,
      basePrice: pizza.basePrice,
      size: size,
      toppings: toppings,
      quantity: 1
    });
  }
};

// Increase item quantity
const increaseQuantity = (index) => {
  cartItems.value[index].quantity += 1;
};

// Decrease item quantity
const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity -= 1;
  } else {
    removeItem(index);
  }
};

// Remove item from cart
const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};

// Clear the cart
const clearCart = () => {
  cartItems.value = [];
};

export default {
  cartItems,
  deliveryFee: DELIVERY_FEE,
  subtotal,
  total,
  getItemTotal,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart
};