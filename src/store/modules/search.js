import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore(
  'search',
  () => {
    // 搜索历史
    const historys = ref([])

    /**
     * 新增历史记录
     */
    const addHistory = (newHistory) => {
      // 不可出现重复的记录
      const isFindIndex = historys.value.findIndex((item) => item === newHistory)
      if (isFindIndex !== -1) {
        historys.value.splice(isFindIndex, 1)
      }

      // 新增记录位于头部
      historys.value.unshift(newHistory)
    }

    /**
     * 删除指定数据
     */
    const deleteHistory = (index) => {
      historys.value.splice(index, 1)
    }

    /**
     * 删除所有历史记录
     */
    const deleteAllHistory = () => {
      historys.value = []
    }

    return { historys, addHistory, deleteHistory, deleteAllHistory }
  },
  {
    persist: true
  }
)
