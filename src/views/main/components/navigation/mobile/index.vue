<script setup>
import { useScroll } from '@vueuse/core'
import { onBeforeUpdate, ref, watch } from 'vue'
import MenuPopup from '@/views/main/components/menu/index.vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块位置
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})
// 选中的 item 下标
const currentCategoryIndex = ref(0)

/**
 * 获取填充的所有 item 元素
 */
let itemRefs = []
// 每次dom更新都会执行
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})

/**
 * 计算偏移位置
 */
// 获取ul元素
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (val) => {
  // 获取选中元素的 left、width
  const { left, width } = itemRefs[val].getBoundingClientRect()
  // 为 sliderStyle 设置属性
  sliderStyle.value = {
    // ul 横向滚动位置 + 当前元素的 left 偏移量 - ul-padding
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: width + 'px'
  }
  // 点击弹出层时自动滚动到nav-bar选中位置
  if (isVisable.value) {
    isVisable.value = false
    ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft
  }
})

/**
 * item 点击事件
 * @param {*} index
 */
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}

const isVisable = ref(false)
const onShowPopup = () => {
  isVisable.value = true
}
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-1">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 汉堡按钮 -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white shadow-l-white"
        @click="onShowPopup"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>

      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>

      <!-- category item -->
      <li
        v-for="(item, index) in data"
        :key="item.id"
        :ref="setItemRef"
        @click="onItemClick(index)"
        :class="{
          'text-zinc-100 ': currentCategoryIndex === index
        }"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
      >
        {{ item.name }}
      </li>
    </ul>

    <m-popup v-model="isVisable">
      <menu-popup :categorys="data" @onItemClick="onItemClick" />
    </m-popup>
  </div>
</template>

<style scoped lang="scss"></style>
