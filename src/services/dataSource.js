import {
  GOODS,
  GOODS_COLUMNS,
  ORDER_QUERY,
  USER_LIST,
  QUESTION_ALL
} from './api'
import {
  METHOD,
  request
} from '@/utils/request'

export async function goodsList(params) {
  return request(GOODS, METHOD.GET, params)
}

export async function goodsColumns() {
  return request(GOODS_COLUMNS, METHOD.GET)
}
export async function orderList(current) {
  return request(ORDER_QUERY, METHOD.GET, {
    current: current
  });
}
export async function orderForUser(current, userId) {
  console.log("进入orderForUser")
  console.log("typeof userId",typeof userId)
  return request(ORDER_QUERY, METHOD.GET, {
    userId: userId,current: current
  });
}
export async function normalList() {
  return request(USER_LIST, METHOD.GET, {
    role: 0
  });
}
export async function staffList() {
  return request(USER_LIST, METHOD.GET, {
    role: 1
  });
}
export async function adminList() {
  return request(USER_LIST, METHOD.GET, {
    role: 2
  });
}
export async function questionList() {
  return request(QUESTION_ALL, METHOD.GET);
}
export default {
  goodsList,
  goodsColumns,
  orderList,
  normalList,
  staffList,
  adminList
}