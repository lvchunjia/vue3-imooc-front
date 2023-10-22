<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
import { useUserStore } from '@/store/modules/user'
import { useAppStore } from '@/store/modules/app'
import LoginHeader from '../components/header.vue'
import sliderCaptchaVue from './slider-captcha.vue'
import { validateUsername, validatePassword } from '../validate'
import { LOGIN_TYPE_USERNAME } from '@/constants'

const router = useRouter()
const { login } = useUserStore()
const appStore = useAppStore()
const { changeRouterType } = appStore

/**
 * 登录触发
 */
const onLoginHandler = () => {
  isSliderCaptchaVisible.value = true
}

// 控制 sliderCaptcha 展示
const isSliderCaptchaVisible = ref(false)

/**
 * 人类行为验证通过
 */
const onCaptchaSuccess = async () => {
  isSliderCaptchaVisible.value = false
  // 登录操作
  onLogin()
}

// 登录时的 loading
const loading = ref(false)
// 用户输入的用户名和密码
const loginForm = ref({
  username: '',
  password: ''
})

/**
 * 用户登录行为
 */
const onLogin = async () => {
  loading.value = true
  // 执行登录操作
  try {
    await login({
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}

/**
 * 去注册
 */
const onToReg = () => {
  changeRouterType('push')
  router.push('/register')
}
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
      <vee-form @submit="onLoginHandler">
        <vee-field
          v-model="loginForm.username"
          :rules="validateUsername"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <vee-error-message name="username" class="text-sm text-red-600 block mt-0.5 text-left" />

        <vee-field
          v-model="loginForm.password"
          :rules="validatePassword"
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
        />
        <vee-error-message name="password" class="text-sm text-red-600 block mt-0.5 text-left" />

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            @click="onToReg"
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
          >
            去注册
          </a>
        </div>

        <m-button
          :loading="loading"
          :isActiveAnim="false"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
        >
          登录
        </m-button>
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>

    <!-- 人类行为验证模块 -->
    <slider-captcha-vue
      v-if="isSliderCaptchaVisible"
      @close="isSliderCaptchaVisible = false"
      @success="onCaptchaSuccess"
    />
  </div>
</template>

<style scoped lang="scss"></style>
