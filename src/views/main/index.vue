<script setup>
import navigationBar from './components/navigation/index.vue'
import MainList from './components/list/index.vue'
</script>

<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation-bar />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <main-list />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
