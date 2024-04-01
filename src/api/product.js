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


//获取商品详情页信息
export const getProDetail = (goodsId)=> {
    return request.get('/goods/detail',{
        params:{
            goodsId
        }
    })
}

//获取商品评论
export const getProComment = (goodsId, limit) => {
    return request.get('/comment/listRows',{
        params: {
            goodsId,
            limit
        }
    })
}
