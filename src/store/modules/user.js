import { ref } from 'vue'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { loginUser, getProfile, registerUser } from '@/api/sys'
import { message } from '@/libs'

export const useUserStore = defineStore(
  'user',
  () => {
    // 登录之后的 token
    const token = ref('')
    /**
     * 登录
     */
    const login = async (payload) => {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      token.value = data.token

      // 获取用户信息
      profile()
    }

    // 用户信息
    const userInfo = ref({})
    /**
     * 获取用户信息
     */
    const profile = async () => {
      const data = await getProfile()
      userInfo.value = data
      // 欢迎
      message(
        'success',
        `欢迎您 ${
          data.vipLevel ? '尊贵的 VIP-' + data.vipLevel + ' 用户 ' + data.nickname : data.nickname
        } `,
        6000
      )
    }

    /**
     * 退出登录
     */
    const logout = () => {
      token.value = ''
      userInfo.value = {}
      // 退出登录之后，刷新下页面
      location.reload()
    }

    /**
     * 注册
     */
    const register = async (payload) => {
      const { password } = payload
      // 注册
      return await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
    }

    return { token, login, userInfo, logout, register }
  },
  {
    persist: true
  }
)
