import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PizzaDetail from '../views/PizzaDetail.vue';
import Cart from '../views/Cart.vue';
import Profile from '../views/Profile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pizza/:id',
    name: 'PizzaDetail',
    component: PizzaDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
