import { createPinia } from "pinia";
import { createApp } from "vue";
import Notifications from '@kyvg/vue3-notification';
import colorDirective from './helpers/color.js';

import App from "./App.vue";

import "./assets/main.css";

// Create the Vue app instance
const app = createApp(App);

// Use the plugins
app.use(Notifications);
app.use(createPinia());

// Mount the app
app.mount("#app");
app.directive('color',colorDirective);
