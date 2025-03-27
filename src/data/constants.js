// Central storage for app constants

// Pizza sizes with additional prices
export const pizzaSizes = [
  { id: 'small', name: 'Klein', diameter: 26, additionalPrice: 0 },
  { id: 'medium', name: 'Mittel', diameter: 32, additionalPrice: 2 },
  { id: 'large', name: 'Groß', diameter: 38, additionalPrice: 4 },
  { id: 'family', name: 'Familie', diameter: 45, additionalPrice: 6 }
];

// Available toppings
export const availableToppings = [
  { id: 'cheese', name: 'Extra Käse', price: 1.50 },
  { id: 'ham', name: 'Schinken', price: 1.50 },
  { id: 'pepperoni', name: 'Pepperoni', price: 1.50 },
  { id: 'mushrooms', name: 'Champignons', price: 1.00 },
  { id: 'olives', name: 'Oliven', price: 1.00 },
  { id: 'onions', name: 'Zwiebeln', price: 0.80 },
  { id: 'pineapple', name: 'Ananas', price: 1.20 },
  { id: 'spinach', name: 'Spinat', price: 1.20 },
];

// Filter definitions for the home page
export const pizzaFilters = [
  { text: "Beliebt", icon: "mdi-star-outline", value: "isPopular", iconColor: "amber-darken-2" },
  { text: "Vegan", icon: "mdi-leaf", value: "isVegan", iconColor: "green" },
  { text: "Neu", icon: "mdi-fire", value: "isNew", iconColor: "orange" },
  { text: "Scharf", icon: "mdi-chili-hot", value: "isSpicy", iconColor: "red" },
];

// Delivery fee
export const DELIVERY_FEE = 2.50;
