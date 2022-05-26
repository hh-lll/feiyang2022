import {LOGIN, GETCODE,LOGINSTAFF} from '@/services/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'
import Qs from 'qs'
/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return request(LOGIN, METHOD.POST, Qs.stringify({
    "username": name,
    "password": password
  }))
}

export async function loginStaff(phoneNumber) {
  return request(LOGINSTAFF, METHOD.POST, Qs.parse({
    "phoneNumber": phoneNumber,
  }))
}

export async function getCode(phoneNumber) {
  return request(GETCODE, METHOD.GET, Qs.stringify({
    "phoneNumber": phoneNumber,
  }))
}

// export async function login(name, password) {
//   return request(LOGIN, METHOD.POST, {
//     name: name,
//     password: password
//   })
// }

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
}
