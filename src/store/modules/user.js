import { login } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'


export default {
  namespaced: true,
  state() {
    return {
      token: getItem(TOKEN) || ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            console.log('data===', data)
            context.commit('setToken', data.token)
            //跳转
            router.push('/')
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
