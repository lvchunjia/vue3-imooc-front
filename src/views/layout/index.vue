<script setup>
import HeaderPc from '@/views/layout/components/header/index.vue'
import MainPc from '@/views/layout/components/main.vue'
import FloatingPc from '@/views/layout/components/floating.vue'
</script>

<template>
  <div class="h-screen">
    <header-pc class="h-header"></header-pc>
    <main-pc class="h-main"></main-pc>
    <floating-pc class="h-floating"></floating-pc>
  </div>
</template>

<style scoped lang="scss"></style>
