<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- 商品名称 价格 等信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import { getDetail, Goods, Shop } from "../../network/detail";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [], //轮播图数据
      goods: {}, //注意初始化的data的数据最好是{}、[]、''这样，不要轻易写null
      shop: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
  created() {
    //获取iid
    // this.iid= this.$route.params.iid

    //请求数据
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据,封装detail.js
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 详情页数据结构的设计：
      //1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.获取并创建店铺信息
      this.shop = new Shop(data.shopInfo);
    });
  },
};
</script>

<style scoped>
#detail {
  /* 为了盖住TabBar栏 */
  position: relative;
  z-index: 80;
  background-color: #fff;
  /* height: 100vh; */
}
/* 滚动的外层盒子必须有固定高度 */
.content{
  /* 方法一：calc计算 */
  /* 方法二：定位 */
  height:calc(100vh - 44px);
}
.detail-nav{
  position: relative;
  z-index: 100;
  background-color: #fff;
}
</style>
