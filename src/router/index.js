import { createRouter, createWebHistory } from 'vue-router'
import { isMobile } from '@/utils/flexible'
import mobileRoutes from './modules/mobile-routes'
import pcRoutes from './modules/pc-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: isMobile.value ? mobileRoutes : pcRoutes
})

export default router
