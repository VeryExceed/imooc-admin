import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置首位
 */
router.beforeEach((to, from, next) => {
  // 存在 token , 进入主页
  // if (store.state.user.token)
  // 快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action
        store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token的情况下,可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
