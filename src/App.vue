<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const { routerType } = storeToRefs(appStore)
</script>

<template>
  <!-- 一级路由出口 -->
  <div class="h-screen fixed top-0 left-0 w-screen">
    <m-transition-router-view
      :routerType="routerType"
      mainComponentName="home"
    ></m-transition-router-view>
  </div>
</template>

<style scoped></style>
