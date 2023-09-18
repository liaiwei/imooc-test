import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})


service.interceptors.request.use(
  config => {
    config.headers.icode = 'EC3379E6E8E2167C'
    if (store.getters.token) {
      if (isCheckTimeout()) {//true表示超时
        //执行退出操作
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效了'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }

  }, error => {
    if (error.response && error.response.data && error.response.data.code === '401') {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  })

export default service
