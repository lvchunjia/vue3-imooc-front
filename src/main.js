import './styles/index.scss'
import 'tailwindcss/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useREM } from './utils/flexible.js'
useREM()

createApp(App).use(createPinia()).use(router).mount('#app')
