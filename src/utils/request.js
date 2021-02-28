import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 设置有效时间
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址（开发环境）
  timeout: 2000 //  5秒超时时间
})
// 请求拦截器
service.interceptors.request.use(config => {
  // 判断有没有token
  if (store.getters.token) {
    // 如果token存在就注入token
    // 有token才会去检查
    if (IscheckTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置 (重点返回必须些下面)
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error.response && error.response.data && error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)// 提示错误信息
  }

  return Promise.reject(error)// 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

function IscheckTimeOut() {
  var currentTime = Date.now() // 当前时间
  var timeStamp = getTimeStamp() // 缓存时间
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
