<script setup>
import LoginHeader from '../components/header.vue'
</script>

<template>
  <div class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200">
    <!-- 头部图标 -->
    <login-header />

    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3 class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block">
        账号登录
      </h3>

      <!-- 表单 -->
      <form>
        <input
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />

        <input
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
          >
            去注册
          </a>
        </div>

        <m-button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"> 登录 </m-button>
      </form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>