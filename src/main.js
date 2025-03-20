import { createApp } from 'vue';
import App from './App.vue';

// Vuetify importieren
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Router importieren
import router from './router';
import '@mdi/font/css/materialdesignicons.css';

// Vuetify-Instanz erstellen
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',  // Standard Icon-Set setzen
  },
});

createApp(App)
  .use(vuetify)  // Vuetify aktivieren
  .use(router)    // Vue Router aktivieren
  .mount('#app');
