import request from '@/utils/request'
// 登录请求接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户的基本信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function logout() {
  // return request({
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post'
  // })
}
