import { getInfo, setInfo } from '@/utils/storage'
export default{
    namespaced: true,
    store(){
        return {
            //存储个人信息认证
            userInfo: getInfo()
        }
    },
    mutations: {
        setUserInfo(store, obj){
            store.userInfo = obj
            setInfo(obj)
        }
    },
    actions: {}
}