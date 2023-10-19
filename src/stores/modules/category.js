import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'

export const useCategorysStore = defineStore(
  'category',
  () => {
    const categorys = ref([ALL_CATEGORY_ITEM])

    const getCategoryData = async () => {
      const res = await getCategory()
      categorys.value = [ALL_CATEGORY_ITEM, ...res.categorys]
    }

    return { categorys, getCategoryData }
  },
  {
    persist: true
  }
)
