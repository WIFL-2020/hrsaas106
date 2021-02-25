import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化 如何实现 ？ Vuex和前端缓存相结合
const state = () => ({
  token: getToken() // 设置token初始化  token持久化=》 放到缓存中
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
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    const result = await login(data)
    // axios会默认为数据加一层data
    // if (result.data.success) {
    // actions 修改state 必须通过mutations
    context.commit('setToken', result.data.data)
    // }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
