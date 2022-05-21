//跨域代理前缀
const API_PROXY_PREFIX='/api'
const FY_URL='/fy'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const LOGIN_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  // LOGIN: `${LOGIN_URL}/login`,
  LOGIN: `${FY_URL}/admin/login`,
  ROUTES: `${LOGIN_URL}/routes`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
  ORDER_LIST: `${FY_URL}/order/all`,
  USER_LIST: `${FY_URL}/user/all`,
  USER_UPDATE: `${FY_URL}/user/update`,
  TECH_ALLOW: `${FY_URL}/staff/update`,
  TECH_ADD: `${FY_URL}/staff/add`,
}
