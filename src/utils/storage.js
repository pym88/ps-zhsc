const INFO_KEY = 'zhsc_userInfo'
const HISTORY_KEY = 'zhsc_historyList'

//获取个人信息
export const getInfo = () => {
    const defaultObj = { token:'', userId:''}
    const result = localStorage.getItem(INFO_KEY)
    return result ? JSON.parse(result) : defaultObj
}

//设置个人信息
export const setInfo = (info) => {
    localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

//删除个人信息
export const removeInfo = () => {
    localStorage.removeItem(INFO_KEY)
}

//获取搜索记录
export const getHistoryList = () => {
    const result = localStorage.getItem(HISTORY_KEY)
    return result ? JSON.parse(result) : []
}

//设置搜索记录
export const setHistoryList = (arr) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}