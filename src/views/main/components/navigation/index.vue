<script setup>
import mobileNav from './mobile/index.vue'
import pcNav from './pc/index.vue'
import { isMobile } from '@/utils/flexible.js'
import { useCategorysStore } from '@/store/modules/category'

const categorysStore = useCategorysStore()
const { getCategoryData } = categorysStore

getCategoryData()
</script>

<template>
  <mobile-nav v-if="isMobile" />
  <pc-nav v-else />
</template>

<style scoped lang="scss"></style>
