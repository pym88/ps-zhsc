const INFO_KEY = 'zhsc_userInfo'

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