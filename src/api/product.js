import request from '@/utils/request'

//获取搜索列表页数据
export const getProList = (obj)=> {
    const { categoryId, goodsName, page } = obj
    return request.get('/goods/list',{
        params:{
            categoryId,
            goodsName,
            page
        }
    })
}