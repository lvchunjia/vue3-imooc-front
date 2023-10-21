import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { useCategorysStore } from '@/store/modules/category'

export const useAppStore = defineStore('app', () => {
  // 当前选中的分类
  const currentCategory = ref(ALL_CATEGORY_ITEM)

  const categorysStore = useCategorysStore()
  const { categorys } = storeToRefs(categorysStore)
  // category选中项下标
  const currentCategoryIndex = computed(() =>
    categorys.value.findIndex((item) => item.id === currentCategory.value.id)
  )

  /**
   * 切换选中分类
   */
  const changeCurrentCategory = (category) => {
    currentCategory.value = category
  }

  return { currentCategory, currentCategoryIndex, changeCurrentCategory }
})
