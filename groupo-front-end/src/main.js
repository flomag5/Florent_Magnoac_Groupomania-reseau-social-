//--- Configuration du projet ---//

// Composants à utiliser
import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index.js';
import store from './store/index.js';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export const eventBus = createApp(App)

// Précision d'où le rendu doit être effectué
createApp(App).use(router).use(store).mount('#app')