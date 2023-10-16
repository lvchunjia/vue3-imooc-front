import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PC_WIDTH } from '../constants'

const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备
 * 根据屏幕宽度是否小于1280
 */
export const isMobile = computed(() => {
  return width.value < PC_WIDTH
})

/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
})
