import {USER_UPDATE,TECH_ALLOW,TECH_ADD} from './api'
import {METHOD, request} from '@/utils/request'
import Qs from 'qs'

export async function userUrban(userId,isBan) {
  return request(USER_UPDATE, METHOD.POST, Qs.parse({
    user_id: userId.toString(),
    isBan: isBan.toString()
  }),{
    headers: {
        'Content-Type': 'application/json'
    }})
}

// export async function userInfoEdit(userId,username,qqNumber,phoneNumber,email,isVip,vipId,isBan) {
export async function userInfoEdit(userId,username,qqNumber,phoneNumber,email,isBan) {
  return request(USER_UPDATE, METHOD.POST, Qs.parse({
    user_id: userId.toString(),
    username: username,
    qqNumber: qqNumber,
    phoneNumber: phoneNumber,
    email: email,
    // isVip: isVip.toString(),
    // vipId: vipId.toString(),
    isBan: isBan.toString(),
  }),{
    headers: {
        'Content-Type': 'application/json'
    }})
}

export async function techAllow(userId,isAllow) {
  return request(TECH_ALLOW, METHOD.GET, {
    userId: userId,
    isAllow: isAllow
  })
}
export async function techAdd(userId) {
  return request(TECH_ADD, METHOD.GET, {
    userId: userId,
  })
}
export async function techUpdate(userId,receiveInterval,tips) {
  return request(TECH_ALLOW, METHOD.GET, {
    userId: userId,
    receiveInterval: receiveInterval,
    tips: tips
  })
}
export default {userUrban,userInfoEdit,techAllow,techAdd,techUpdate}