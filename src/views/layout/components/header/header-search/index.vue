<script setup>
import { ref } from 'vue'

const search = ref('')
</script>

<template>
  <div class="w-full">
    <m-search v-model="search">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<style scoped lang="scss"></style>
