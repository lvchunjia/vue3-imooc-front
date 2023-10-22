<script setup>
import { isMobile } from '@/utils/flexible'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['close'])

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {}

/**
 * 关闭事件
 */
const close = () => {
  emits('close')
}
</script>

<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobile"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img class="" ref="imageTarget" :src="blob" />

    <m-button :isActiveAnim="false" class="mt-4 w-[80%] xl:w-1/2" @click="onConfirmClick">
      确定
    </m-button>
  </div>
</template>

<style scoped lang="scss"></style>
