import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import "@/assets/css/app.scss";

const app = createApp(App);
const pinia = createPinia()

app.use(pinia)
app.mount("weather-widget");