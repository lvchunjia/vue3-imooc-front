<script setup>
import { onMounted, ref } from 'vue'
import { styles, typeEnum } from './constants'

const props = defineProps({
  /**
   * message 的消息类型
   */
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(`type 必须是 ${typeEnum.join('、')} 中的一个`)
      }
      return result
    }
  },
  /**
   * 描述文本
   */
  content: {
    type: String,
    required: true
  },
  /**
   * 展示时长
   */
  duration: {
    type: Number,
    default: 5000
  },
  /**
   * 关闭时的回调
   */
  destroy: {
    type: Function
  }
})

// 控制显示处理
const isVisable = ref(false)
// 关闭动画执行时间
const animDuration = '0.5s'

/**
 * 动画展示，在 mounted 之后进行展示
 */
onMounted(() => {
  isVisable.value = true
  /**
   * 延迟时间关闭
   */
  setTimeout(() => {
    isVisable.value = false
    setTimeout(
      () => {
        if (props.duration) props.destroy()
      },
      parseInt(animDuration.replace('0.', '').replace('s', '')) * 100
    )
  }, props.duration)
})
</script>

<template>
  <transition name="down" @after-leave="destroy">
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>

      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.down-enter-active,
.down-leave-active {
  transition: all v-bind(animDuration);
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
