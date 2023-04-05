import {UPDATE_TIPS} from './api'
import {METHOD, request} from '@/utils/request'

export async function updateTips(title,tips,isPop) {
  return request(UPDATE_TIPS, METHOD.GET, {
    title: title,
    tips:tips,
    isPop:isPop
  })
}
