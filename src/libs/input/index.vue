<script setup>
import { computed } from 'vue'
import { useVModel } from '@vueuse/core'
import { TYPE_TEXT, TYPE_TEXTAREA } from './constants'

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  },
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const result = arr.includes(value)
      if (!result) {
        throw new Error(`type 的值必须在可选范围内 [${arr.join('、')}]`)
      }
      return result
    }
  },
  max: {
    type: [String, Number]
  }
})
// 事件声明
defineEmits(['update:modelValue'])

// 输入的字符
const text = useVModel(props)

// 输入的字符数
const currentNumber = computed(() => {
  return text.value.length
})
</script>

<template>
  <div class="relative">
    <input
      v-if="type === TYPE_TEXT"
      v-model="text"
      :maxlength="max"
      type="text"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    />

    <textarea
      v-if="type === TYPE_TEXTAREA"
      v-model="text"
      :maxlength="max"
      rows="5"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    ></textarea>

    <span
      v-if="max"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<style scoped lang="scss"></style>
