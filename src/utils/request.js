import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = '821EEDAC4EA3EDC5'
  const userStore = useUserStore()
  const { token } = storeToRefs(userStore)
  if (token.value) {
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${token.value}`
  }
  // 必须返回 config
  return config
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // TODO：业务错误
    return Promise.reject(new Error(message))
  }
})

export default service
