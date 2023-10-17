<script setup>
import { isMobile } from '@/utils/flexible.js'
import mobileNav from './mobile/index.vue'
import pcNav from './pc/index.vue'
</script>

<template>
  <div class="navigation">
    <mobile-nav v-if="isMobile" />
    <pc-nav v-else />
  </div>
</template>

<style scoped lang="scss"></style>
