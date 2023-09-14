import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})


service.interceptors.request.use(
  config => {
    config.headers.icode = 'EC3379E6E8E2167C'
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
    ElMessage.error(error.message)
    return Promise.reject(new Error(error))
  })

export default service
