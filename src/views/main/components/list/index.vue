<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import gsap from 'gsap'
import { getPexelsList } from '@/api/pexels'
import { isMobile } from '@/utils/flexible'
import ListItem from './item.vue'
import PinsVue from '@/views/pins/components/pins.vue'

import { useAppStore } from '@/store/modules/app'
import { useEventListener } from '@vueuse/core'
const appStore = useAppStore()
const { currentCategory, searchText } = storeToRefs(appStore)

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

/**
 * 监听搜索内容项的变化
 */
watch(
  () => searchText.value,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)

// 控制 pins 展示
const isVisiblePins = ref(false)
// 当前选中的 pins 属性
const currentPins = ref({})
/**
 * 进入 pins
 */
const onToPins = (item) => {
  history.pushState(null, null, `/pins/${item.id}`)
  currentPins.value = item
  isVisiblePins.value = true
}

const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.location?.translateX,
    y: currentPins.value.location?.translateY,
    opacity: 0
  })
}

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
</script>

<template>
  <div>
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
          <list-item :data="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>
    </m-infinite-list>

    <!-- 大图详情处理 -->
    <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <pins-vue v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<style scoped lang="scss"></style>
