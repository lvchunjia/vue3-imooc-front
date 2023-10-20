<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
defineEmits(['update:modelValue'])
// 通过 useVModel 获取到响应式数据 isOpen，当 isOpen 改变时，会自动触发 update:modelValue
const isOpen = useVModel(props)

/**
 * 滚动锁定
 */
const isLocked = useScrollLock(document.body)
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="popup">
    <teleport to="body">
      <!-- 蒙版 -->
      <transition name="fade">
        <div
          v-if="isOpen"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="isOpen = false"
        ></div>
      </transition>

      <!-- 内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isOpen"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
// fade 展示动画
// 离开、进入
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
// 准备进入、离开完成
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// popup-down-up 展示动画
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
