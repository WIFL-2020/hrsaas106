import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化 如何实现 ？ Vuex和前端缓存相结合
const state = () => ({
  token: getToken(), // 设置token初始化  token持久化=》 放到缓存中
  userInfo: {}
})
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token只是修改token的数据
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex中的token
    removeToken() // 先清除vuex再清除vuex和缓存数据的同步
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
    state.userInfo = { ...userInfo }
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const result = await login(data)
    // axios会默认为数据加一层data
    // if (result.data.success) {
    // actions 修改state 必须通过mutations
    context.commit('setToken', result)
    // }
  },
  // 获取用户资料action
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口
    const obj = { ...result, ...baseInfo }
    context.commit('setUserInfo', obj)
    return result
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
