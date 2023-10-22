import router from '@/router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import { message } from '@/libs'

/**
 * 处理登录页面访问权限
 */
router.beforeEach((to, from) => {
  // 无需登录的页面访问
  if (!to.meta.user) {
    return true
  }

  // 已登录，可进入
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  if (token.value) {
    return true
  }

  // 未登录，警告然后返回首页
  message('warn', '登录失效，请重新登录!')
  return '/'
})
