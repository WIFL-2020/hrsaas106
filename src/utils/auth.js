import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设定一个独一无二的key
const timeKey = 'hrsaas-timestamp-key' // 设置唯一的key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间
export function setTimeStamp() {
  return Cookies.set(timeKey, Date.now())
}
