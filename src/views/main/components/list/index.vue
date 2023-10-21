<script setup>
import { nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { getPexelsList } from '@/api/pexels'
import { isMobile } from '@/utils/flexible'
import { useAppStore } from '@/store/modules/app'
import ListItem from './item.vue'

const appStore = useAppStore()
const { currentCategory } = storeToRefs(appStore)

/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20
}
// 数据是否在加载中
const isLoading = ref(false)
// 数据是否全部加载完成
const isFinished = ref(false)
const pexelsList = ref([])

const getPexelsData = async () => {
  // 数据全部加载完成则 return
  if (isFinished.value) return

  // 完成第一次请求之后，后续请求让 page 自增
  if (pexelsList.value.length) {
    query.page += 1
  }

  // 触发接口请求
  const res = await getPexelsList(query)
  pexelsList.value.push(...res.list)

  // 判断数据是否全部加载完成
  if (pexelsList.value.length === res.total) {
    isFinished.value = true
  }

  // 修改 loading 标记
  isLoading.value = false
}

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  pexelsList.value = []
}

watch(
  () => currentCategory.value,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      categoryId: val.id
    })
  }
)
</script>

<template>
  <m-infinite-list
    ref="mInfiniteListRef"
    v-model="isLoading"
    :isFinished="isFinished"
    @onLoad="getPexelsData"
  >
    <m-waterfall
      :data="pexelsList"
      :nodeKey="'id'"
      :column="isMobile ? 2 : 5"
      :picturePreReading="false"
      class="w-full px-1"
    >
      <template v-slot="{ item, width }">
        <list-item :data="item" :width="width" />
      </template>
    </m-waterfall>
  </m-infinite-list>
</template>

<style scoped lang="scss"></style>
