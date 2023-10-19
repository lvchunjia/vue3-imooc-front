import './styles/index.scss'
import 'tailwindcss/tailwind.css'

import { createApp } from 'vue'
import store from '@/stores'
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'

import { useREM } from './utils/flexible.js'
import mLibs from './libs'

useREM()
createApp(App).use(store).use(router).use(mLibs).mount('#app')
