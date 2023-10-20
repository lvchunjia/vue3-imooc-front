import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import { getCategory } from '@/api/category'

export const useCategorysStore = defineStore(
  'category',
  () => {
    const categorys = ref(CATEGORY_NOMAR_DATA)

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
