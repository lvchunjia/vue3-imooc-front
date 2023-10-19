<script setup>
import { storeToRefs } from 'pinia'
import mobileNav from './mobile/index.vue'
import pcNav from './pc/index.vue'
import { isMobile } from '@/utils/flexible.js'
import { useCategorysStore } from '@/stores/modules/category'

const categorysStore = useCategorysStore()
const { categorys } = storeToRefs(categorysStore)
const { getCategoryData } = categorysStore

getCategoryData()
</script>

<template>
  <div class="navigation">
    <mobile-nav v-if="isMobile" :data="categorys" />
    <pc-nav v-else />
  </div>
</template>

<style scoped lang="scss"></style>
