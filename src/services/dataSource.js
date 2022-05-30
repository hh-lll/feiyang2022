import {
  ORDER_QUERY,
  USER_LIST,
  ADMIN_DASH_DATA,
  QANDP_LIST,
  QUESTION_ALL,
  EXAMINE_LIST
} from './api'
import {
  METHOD,
  request
} from '@/utils/request'

export async function adminDashData(year) {
  return request(ADMIN_DASH_DATA, METHOD.GET, {
    year: year
  })
}

export async function orderList(current) {
  return request(ORDER_QUERY, METHOD.GET, {
    current: current
  });
}
export async function orderForUser(current, userId) {
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

export async function questionList(pageNum) {
  return request(QUESTION_ALL, METHOD.GET,{
    pageNum:pageNum,
    pageSize:8
  });
}

export async function questionandpostList(pageNum) {
  return request(QANDP_LIST, METHOD.GET, {
    pageNum: pageNum,
    pageSize:8
  });
}
export async function examineList(pageNum) {
  return request(EXAMINE_LIST, METHOD.GET, {
    pageNum: pageNum,
    pageSize:8
  });
}
export default {
  orderList,
  normalList,
  staffList,
  adminList,
  questionandpostList
}