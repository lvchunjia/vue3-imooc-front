<script setup>
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/store/modules/search'
import { confirm } from '@/libs'

const searchStore = useSearchStore()
const { historys } = storeToRefs(searchStore)
const { deleteHistory, deleteAllHistory } = searchStore

const emits = defineEmits(['itemClick'])

/**
 * 删除所有记录
 */
const onDeleteAllClick = () => {
  confirm('要删除所有历史记录吗？')
    .then(() => {
      deleteAllHistory()
    })
    .catch(() => {})
}

/**
 * 删除单个记录
 */
const onDeleteClick = (index) => {
  deleteHistory(index)
}

/**
 * item 点击触发事件
 */
const onItemClick = (item) => {
  emits('itemClick', item)
}
</script>

<template>
  <div class="">
    <div class="flex items-center text-xs mb-1 text-zinc-400">
      <span>最近搜索</span>
      <m-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 rounded-sm hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        @click="onDeleteAllClick"
      ></m-svg-icon>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in historys"
        :key="item"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 text-sm font-bold rounded-sm duration-300 hover:bg-zinc-200"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
          @click.stop="onDeleteClick(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
