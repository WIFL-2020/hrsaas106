// 权限拦截 导航守卫 路由守卫 router
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whileList = ['/login', '/404'] // 定义白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断是否有无token
  if (store.getters.token) {
    // 如果有,看看是不是去登录页
    if (to.path === 'login') {
      next('/') // 跳到主页
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next() // 放行
    }
  } else {
    // 如果没有token 就放行
    if (whileList.indexOf(to.path) > -1) {
      next()
    } else {
      // 否者跳转到主页
      next('/')
    }
  }
  NProgress.done() // 手动强制关闭一次
})
// 后置守卫
router.afterEach(() => {
  NProgress.done() // 关闭进度条
})
