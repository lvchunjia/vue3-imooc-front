<script setup>
import { onActivated, ref } from 'vue'
import { useScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'

import { isMobile } from '@/utils/flexible'
import navigationBar from './components/navigation/index.vue'
import MainList from './components/list/index.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const { token } = storeToRefs(userStore)
const appStore = useAppStore()
const { changeRouterType } = appStore
const router = useRouter()
defineOptions({
  name: 'home'
})

const onVipClick = () => {
  changeRouterType('push')
  router.push('/member')
}

const onMyClick = () => {
  changeRouterType('push')
  router.push('/profile')
}

/**
 * 记录页面滚动位置
 */
const containerTarget = ref(null)
const { y: containerTargetScrollY } = useScroll(containerTarget)
// 被缓存的组件再次可见，会回调 onActivated 方法
onActivated(() => {
  if (!containerTarget.value) {
    return
  }
  containerTarget.value.scrollTop = containerTargetScrollY.value
})
</script>

<template>
  <div
    ref="containerTarget"
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <navigation-bar />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <main-list />
    </div>

    <!-- 移动端的 tabbar -->
    <m-trigger-menu v-if="isMobile" class="fixed bottom-2 m-auto left-0 right-0 w-[220px]">
      <m-trigger-menu-item icon="home" iconClass="fill-zinc-900 dark:fill-zinc-200">
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </div>
</template>

<style scoped lang="scss"></style>
