<template>
    <div class="home">
    <!-- 顶部导航 -->   
    <van-nav-bar title="智慧商城" fixed>
    </van-nav-bar>

    <!-- 搜索框 -->   
    <van-search
    readonly 
    shape="round"
    background="#f1f1f2"
    placeholder="请输入你要搜索的商品"
    @click="$router.push('/search')">
    </van-search>

     <!-- 轮播图 -->       
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" loop>
        <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
            <img :src=" item.imgUrl " alt="">
        </van-swipe-item>
    </van-swipe>

     <!-- 导航 -->
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
        v-for="item in navList" :key="item.imgUrl"
        :icon="item.imgUrl"
        text="新品首发"
        @click="$router.push('/category')"
      />
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem :item="item" v-for="item in goodsList" :key="item.goods_id"></GoodsItem>
      </div>
    </div>
    </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem'
import { getHomeData } from '@/api/home'
export default {
   name:'Home',
   components:{
    GoodsItem
   },
   data(){
    return {
      bannerList:[],
      navList:[],
      goodsList:[]
    }
   },
   async created(){
   const { data : { pageData }} = await getHomeData()
   console.log(pageData)
   this.bannerList = pageData.items[1].data
   this.navList = pageData.items[3].data
   this.goodsList = pageData.items[6].data
   }
}
</script>

<style scoped lang="less">
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}
.van-search{
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

.main img {
  display: block;
  width: 100%;
}

.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.goods-list {
  background-color: #f6f6f6;
}

</style>
