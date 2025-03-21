<template>
  <footer class="app-footer">
    <div class="footer-nav">
      <div class="footer-item" @click="goToHome">
        <v-icon icon="mdi-home"></v-icon>
        <span>Startseite</span>
      </div>
      <div class="footer-item" @click="goToCart">
        <v-icon icon="mdi-cart"></v-icon>
        <span>Warenkorb</span>
      </div>
      <div class="footer-item" @click="goToProfile">
        <v-icon icon="mdi-account"></v-icon>
        <span>Profil</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};

const goToCart = () => {
  router.push('/cart');
};

const goToProfile = () => {
  router.push('/profile');
};
</script>

<style scoped>
.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 8px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.footer-nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px 0;
}

.footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.footer-item:hover {
  opacity: 0.8;
}
</style>
