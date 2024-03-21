export default{
    namespaced: true,
    store(){
        return {
            //存储个人信息认证
            userInfo:{
                token:'',
                userId:''
            }
        }
    },
    mutations: {
        setUserInfo(store, obj){
            store.userInfo = obj
        }
    },
    actions: {}
}