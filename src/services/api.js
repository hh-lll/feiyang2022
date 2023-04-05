//跨域代理前缀
const API_PROXY_PREFIX='/api'
const FY_URL='/fy'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const LOGIN_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  // LOGIN: `${LOGIN_URL}/login`,
  LOGIN: `${FY_URL}/admin/login`,
  GETUSERINFO: `${FY_URL}/user/getUserInfo`,
  LOGINSTAFF: `${FY_URL}/user/login`,
  GETCODE: `${FY_URL}/user/sendCode`,
  ROUTES: `${LOGIN_URL}/routes`, //可注释
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
  ORDER_QUERY: `${FY_URL}/order/query`,
  USER_LIST: `${FY_URL}/user/all`,
  USER_UPDATE: `${FY_URL}/user/update`,
  STAFF_UPDATE: `${FY_URL}/staff/update`,
  STAFF_ADD: `${FY_URL}/staff/add`,
  QUESTION_ALL: `${FY_URL}/question/queryByKey`,
  ADMIN_DASH_DATA: `${FY_URL}/admin/global`,
  QANDP_LIST: `${FY_URL}/question/search`,
  EXAMINE_LIST: `${FY_URL}/post/getNoExamine`,
  PASS_POST: `${FY_URL}/post/update`,
  NOPASS_POST: `${FY_URL}/post/delete`,
  UPLOAD_FILE: `${FY_URL}/order/uploadFile`,
  POST_ADD: `${FY_URL}/post/add`,
  STAFF_YEAR: `${FY_URL}/staff/year`,
  ADMIN_ADD: `${FY_URL}/admin/reg`,
  ADMIN_ORDER_LIST: `${FY_URL}/admin/queryOrder`,
  POST_ALL: `${FY_URL}/post/all`,
  POST_INFO: `${FY_URL}/post/get`,
  ORDER_CANCEL: `${FY_URL}/order/cancel`,
  CONF_YEAR: `${FY_URL}/conf/year`,
  CONF_GETLIMIT: `${FY_URL}/conf/getLimit`,
  CONF_TURN: `${FY_URL}/conf/turn`,
  CONF_SETLIMIT: `${FY_URL}/conf/setLimit`,
  UPDATE_TIPS: `${FY_URL}/conf/updateGlobalTips`,
  GET_TIPS: `${FY_URL}/conf/selectTips`,
  GET_STAFFYEAR: `${FY_URL}/staff/yearInfo`,
  
}
