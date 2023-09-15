import router from '@/router'
import store from '@/store'
//白名单

const whiteList = ['/login']
/**
 * 路由前置守卫
 */

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    //用户已登录，则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      //判断用户资料是否存在，不存在则获取用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    //用户未登录，则只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }

  }
})


