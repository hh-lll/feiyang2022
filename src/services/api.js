//跨域代理前缀
const API_PROXY_PREFIX='/api'
const FY_URL='/fy'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const LOGIN_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  // LOGIN: `${LOGIN_URL}/login`,
  LOGIN: `${FY_URL}/admin/login`,
  LOGINSTAFF: `${FY_URL}/user/login`,
  GETCODE: `${FY_URL}/user/sendCode`,
  ROUTES: `${LOGIN_URL}/routes`, //可注释
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
  ORDER_QUERY: `${FY_URL}/order/query`,
  USER_LIST: `${FY_URL}/user/all`,
  USER_UPDATE: `${FY_URL}/user/update`,
  STAFF_ALLOW: `${FY_URL}/staff/update`,
  STAFF_ADD: `${FY_URL}/staff/add`,
  QUESTION_ALL: `${FY_URL}/question/all`,
}
