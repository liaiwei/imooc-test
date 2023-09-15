import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import {setTimeStamp} from '@/utils/auth'


export default {
  namespaced: true,
  state() {
    return {
      token: getItem(TOKEN) || '',
      userInfo: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求
     * @param context
     * @param userInfo
     * @returns {Promise<unknown>}
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            context.commit('setToken', data.token)
            //跳转
            router.push('/')
            setTimeStamp()
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },


    /**
     * 获取用户信息
     * @param context
     * @returns {Promise<AxiosResponse<any>>}
     */
    async getUserInfo(context) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res)
      return res
    },

    /**
     * 退出登录
     * @param context
     */
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeAllItem()
      //TODO:清理权限相关的配置

      router.push('/login')
    }
  }
}
