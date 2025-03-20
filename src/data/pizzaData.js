// Central data store for pizza information

// List of all available pizzas
export const pizzas = [
  {
    id: 'margherita',
    name: "Pizza Margherita",
    imageName: "pizza-margherita",
    rating: 4.5,
    isPopular: true,
    isNew: false,
    isVegan: false,
    isSpicy: false,
    basePrice: 8.90,
    description: 'Die klassische italienische Pizza mit Tomatensoße, Mozzarella und frischem Basilikum.'
  },
  {
    id: 'salami',
    name: "Pizza Salami",
    imageName: "pizza-salami",
    rating: 4.2,
    isPopular: false,
    isNew: false,
    isVegan: false,
    isSpicy: false,
    basePrice: 9.90,
    description: 'Eine traditionelle Pizza mit Tomatensoße, Mozzarella und würziger Salami.'
  },
  {
    id: 'hawaii',
    name: "Pizza Hawaii",
    imageName: "pizza-hawaii", 
    rating: 3.8,
    isPopular: false,
    isNew: true,
    isVegan: false,
    isSpicy: false,
    basePrice: 10.90,
    description: 'Eine süß-herzhafte Kombination aus Tomatensoße, Mozzarella, Schinken und Ananas.'
  },
  {
    id: 'mozarella',
    name: "Pizza Mozarella",
    imageName: "pizza-mozarella",
    rating: 4.3,
    isPopular: true,
    isNew: false,
    isVegan: true,
    isSpicy: false,
    basePrice: 9.50,
    description: 'Köstliche Pizza mit extra viel Mozzarella auf Tomatensoße und frischem Basilikum.'
  },
  {
    id: 'vegetariana',
    name: "Pizza Vegetariana",
    imageName: "pizza-vegetariana",
    rating: 4.8,
    isPopular: true,
    isNew: false,
    isVegan: true,
    isSpicy: false,
    basePrice: 10.50,
    description: 'Frische Pizza mit Tomatensoße, Mozzarella und verschiedenem saisonalem Gemüse.'
  },
  {
    id: 'vegan',
    name: "Pizza Vegan",
    imageName: "pizza-vegan",
    rating: 4.2,
    isPopular: true,
    isNew: true,
    isVegan: true,
    isSpicy: false,
    basePrice: 11.90,
    description: 'Vegane Pizza mit hausgemachter Tomatensauce und pflanzlichen Käsealternativen.'
  },
  {
    id: 'fungi',
    name: "Pizza Fungi",
    imageName: "pizza-fungi",
    rating: 4.2,
    isPopular: true,
    isNew: false,
    isVegan: true,
    isSpicy: false,
    basePrice: 9.90,
    description: 'Eine leckere Kombination aus Tomatensoße, Mozzarella und frischen Champignons.'
  },
  {
    id: 'tomaten',
    name: "Pizza Tomaten",
    imageName: "pizza-tomaten",
    rating: 4.2,
    isPopular: true,
    isNew: false,
    isVegan: true,
    isSpicy: false,
    basePrice: 8.50,
    description: 'Klassische Pizza mit Tomatensoße, Mozzarella und frischen Kirschtomaten.'
  },
  {
    id: 'diabolo',
    name: "Pizza Diabolo",
    imageName: "pizza-diabolo",
    rating: 2.2,
    isPopular: false,
    isNew: false,
    isVegan: false,
    isSpicy: true,
    basePrice: 10.90,
    description: 'Unsere schärfste Pizza mit Tomatensoße, Mozzarella, scharfer Salami und Jalapeños.'
  }
];

// Helper function to find a pizza by ID
export const getPizzaById = (id) => {
  return pizzas.find(pizza => pizza.id === id);
};

// Helper function to get image path for a pizza
export const getImagePath = (imageName) => {
  const basePath = import.meta.env.PROD 
    ? '/netfonds-gruppe-girls-day-2025/images/' 
    : '/images/';
  return `${basePath}${imageName}.png`;
};

// Helper function to format price
export const formatPrice = (price) => {
  return `${price.toFixed(2).replace('.', ',')} €`;
};
