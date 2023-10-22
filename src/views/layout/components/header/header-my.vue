<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import { confirm } from '@/libs'

const userStore = useUserStore()
const { token, userInfo } = storeToRefs(userStore)
const { logout } = userStore
const appStore = useAppStore()
const { changeRouterType } = appStore

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

// 进入登录
const router = useRouter()
const onToLogin = () => {
  changeRouterType('push')
  router.push('/login')
}

/**
 * menu Item 点击事件
 */
const onItemClick = (path) => {
  // 有路径则进行路径跳转
  if (path) {
    changeRouterType('push')
    router.push(path)
    return
  }
  // 无路径则为退出登录
  confirm('您确定要退出登录吗？')
    .then(() => {
      // 退出登录不存在跳转路径
      logout()
    })
    .catch(() => {})
}
</script>

<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
      >
        <!-- 头像 -->
        <img :src="userInfo.avatar" class="w-3 h-3 rounded-sm" />

        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>

        <!-- vip 标记 -->
        <m-svg-icon
          v-if="userInfo.vipLevel"
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>

      <div v-else class="guide-my">
        <m-button class="guide-my" icon="profile" iconColor="#fff" @click="onToLogin"></m-button>
      </div>
    </template>

    <!-- 气泡菜单 -->
    <div v-if="token" class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-80"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item.path)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{ item.title }}</span>
      </div>
    </div>
  </m-popover>
</template>

<style scoped lang="scss"></style>
