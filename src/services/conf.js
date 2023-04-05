import {
    CONF_YEAR,
    CONF_GETLIMIT,
    CONF_TURN,
    CONF_SETLIMIT,
    ADMIN_DASH_DATA
} from './api'
import {
    METHOD,
    request
} from '@/utils/request'


export async function getConfyear() {
    return request(CONF_YEAR, METHOD.GET)
}
export async function getConflimit() {
    return request(CONF_GETLIMIT, METHOD.GET)
}
export async function setConflimit(limit) {
    return request(CONF_SETLIMIT, METHOD.GET,{
        limit: limit,
    })
}
export async function setConfturn(turn) {
    return request(CONF_TURN, METHOD.GET,{
        turn: turn,
    })
}
export async function adminDashData(year) {
    return request(ADMIN_DASH_DATA, METHOD.GET, {
        year: year
    })
}