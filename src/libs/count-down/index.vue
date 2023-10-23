<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import dayjs from './utils'

const props = defineProps({
  // 毫秒
  time: {
    type: Number,
    required: true
  },
  // 遵循 dayjs format 标准：https://day.js.org/docs/zh-CN/parse/string-format
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits(['finish', 'change'])
// 倒计时的时间间隔
const INTERVAL_COUNT = 1000

// 倒计时时长
const duration = ref(0)

/**
 * 处理显示时间
 */
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})

/**
 * 开始倒计时
 */
let interval = null
const start = () => {
  close()
  console.log(1)
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}

/**
 * 倒计时行为
 */
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits('change')
  // 监听结束行为
  if (duration.value <= 0) {
    duration.value = 0
    emits('finish')
    close()
  }
}

/**
 * 清理倒计时
 */
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}

/**
 * 开始倒计时
 */
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  {
    immediate: true
  }
)

/**
 * 组件销毁时，清理倒计时
 */
onUnmounted(() => {
  close()
})
</script>

<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<style scoped lang="scss"></style>
