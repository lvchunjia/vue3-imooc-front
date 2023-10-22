import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { useCategorysStore } from '@/store/modules/category'
import { isMobile } from '@/utils/flexible'

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

  // 搜索的文本
  const searchText = ref('')
  /**
   * 修改 searchText
   */
  const changeSearchText = (text) => {
    searchText.value = text
  }

  // 路由跳转类型
  const routersType = ref('none')
  const routerType = computed(() => (isMobile ? routersType.value : 'none'))
  /**
   * 修改 routerType
   */
  const changeRouterType = (newType) => {
    routersType.value = newType
  }

  return {
    currentCategory,
    currentCategoryIndex,
    changeCurrentCategory,
    searchText,
    changeSearchText,
    routerType,
    changeRouterType
  }
})
