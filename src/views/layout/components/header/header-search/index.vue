<script setup>
import { ref } from 'vue'
import SearchHint from './hint.vue'
import SearchHistory from './history.vue'

import { useSearchStore } from '@/store/modules/search'

const searchStore = useSearchStore()
const { addHistory } = searchStore

const inputValue = ref('')

// 搜索的回调事件
const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) addHistory(val)
}
</script>

<template>
  <div class="w-full">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <!-- 搜索提示 -->
        <search-hint v-show="inputValue" :searchText="inputValue" @itemClick="onSearchHandler" />

        <!-- 最近搜索 -->
        <search-history v-show="!inputValue" @itemClick="onSearchHandler" />
      </template>
    </m-search>
  </div>
</template>

<style scoped lang="scss"></style>
