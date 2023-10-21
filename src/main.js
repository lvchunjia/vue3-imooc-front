import './styles/index.scss'
import 'tailwindcss/tailwind.css'

import { createApp } from 'vue'
import store from '@/store'
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'

import mLibs from './libs'
import directives from './directives'
import { useREM } from './utils/flexible.js'
import useTheme from './utils/theme.js'

useREM()

const app = createApp(App)
app.use(router)
app.use(store)
app.use(mLibs)
app.use(directives)
useTheme()
app.mount('#app')
