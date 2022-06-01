import {
  ORDER_QUERY,
  USER_LIST,
  ADMIN_DASH_DATA,
  QANDP_LIST,
  QUESTION_ALL,
  EXAMINE_LIST,
  ADMIN_ORDER_LIST,
  POST_ALL,
  POST_INFO
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

export async function orderList(current,repairType,status,staffName,userName) {
  return request(ADMIN_ORDER_LIST, METHOD.GET, {
    repairType:repairType,
    status:status,
    staffName:staffName,
    userName:userName,
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

export async function questionList(key) {
  return request(QUESTION_ALL, METHOD.GET,{
    key:key
  });
}

export async function questionandpostList(pageNum,content,postUsername,questionUsername,visitCount,status) {
  return request(QANDP_LIST, METHOD.GET, {
    pageNum: pageNum,
    pageSize:8,
    content:content,
    postUsername:postUsername,
    questionUsername:questionUsername,
    visitCount:visitCount,
    status:status,
  });
}
export async function examineList(pageNum) {
  return request(EXAMINE_LIST, METHOD.GET, {
    pageNum: pageNum,
    pageSize:8
  });
}
export async function postList(userId) {
  return request(POST_ALL, METHOD.GET, {
    userId: userId,
  });
}
export async function getpostInfo(postId) {
  return request(POST_INFO, METHOD.GET, {
    post_id: postId,
  });
}
export default {
  orderList,
  normalList,
  staffList,
  adminList,
  questionandpostList
}