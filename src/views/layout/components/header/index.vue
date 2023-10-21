<script setup>
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './header-theme.vue'
import HeaderMy from './header-my.vue'
import { useRouter } from 'vue-router'

const router = useRouter
const onToHome = () => {
  router.push('/')
}
</script>

<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center">
      <img
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
        class="guide-home h-4 cursor-pointer mr-2"
      />
      <header-search class="mr-1" />
      <header-theme class="mr-1" />
      <header-my></header-my>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
