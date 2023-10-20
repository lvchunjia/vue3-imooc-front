import { ref } from 'vue'
import { defineStore } from 'pinia'
import { THEME_LIGHT } from '@/constants'

export const useThemeStore = defineStore(
  'theme',
  () => {
    // 主题模式
    const theme = ref(THEME_LIGHT)

    /**
     *  切换主题模式
     */
    const toggleTheme = (newTheme) => {
      theme.value = newTheme
    }

    return {
      theme,
      toggleTheme
    }
  },
  {
    persist: true
  }
)
