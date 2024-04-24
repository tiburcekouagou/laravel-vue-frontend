import './assets/main.css'

import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'

import config from '../formkit.config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})

app.mount('#app')
