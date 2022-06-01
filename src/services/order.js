import {ORDER_CANCEL} from './api'
import {METHOD, request} from '@/utils/request'

export async function cancelOrder(orderId) {
    return request(ORDER_CANCEL, METHOD.POST, {
        orderId: orderId.toString(),
        cancelReason:"管理员中止"
    })
  }