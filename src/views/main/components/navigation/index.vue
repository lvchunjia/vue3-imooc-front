<script setup>
import { ref } from 'vue'
import { isMobile } from '@/utils/flexible.js'
import mobileNav from './mobile/index.vue'
import pcNav from './pc/index.vue'

import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categoryData = ref([])
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = categorys
  categoryData.value.unshift(ALL_CATEGORY_ITEM)
}
getCategoryData()
</script>

<template>
  <div class="navigation">
    <mobile-nav v-if="isMobile" :data="categoryData" />
    <pc-nav v-else />
  </div>
</template>

<style scoped lang="scss"></style>
