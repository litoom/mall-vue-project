<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav"
    @titleClick="titleClick"> </detail-nav-bar>

    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"> </detail-swiper>
      <!-- 商品名称 价格 等信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad">
      </detail-goods-info>
      <detail-param-info :param-info="paramInfo"
      ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"
      ref="comment"      
      ></detail-comment-info>
      <goods-list :goods="recommends"
      ref="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import { getDetail, Goods, Shop, GoodsParam ,getRecommend} from "../../network/detail";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import GoodsList from '../../components/content/goods/GoodsList'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [], //轮播图数据
      goods: {}, //注意初始化的data的数据最好是{}、[]、''这样，不要轻易写null
      shop: {},
      detailInfo: {}, //商品的详细信息
      paramInfo: {}, //商品详细参数
      commentInfo: {}, //评论信息
      recommends:[],    //保存推荐数据
      themeTopYs:[],     //商品 参数 评论 推荐的offsetTop值
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
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
      //4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      //5.获取商品详细参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      };
    });
    //3.请求推荐数据
      getRecommend().then(res=>{
        console.log(res);
        this.recommends = res.data.list
      })
  },
  updated() {
    console.log("xxxxxxxxxxxxxxxxxxxx");
    this.$refs.scroll.refresh();
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300);
    }
  },
  mounted() {
    //在这里获取NavBar的各个组件的offsetTop的值，可以吗？
    //不行,通过ref属性获取
  this.themeTopYs.push(0);
  this.themeTopYs.push(this.$ref.params.$el.offsetTop);
  this.themeTopYs.push(this.$ref.comment.$el.offsetTop);
  this.themeTopYs.push(this.$ref.recommend.$el.offsetTop);
  console.log(this.themeTopYs);
  },
};
</script>

<style scoped>
#detail {
  /* 为了盖住TabBar栏，TabBar栏是固定定位 */
  position: relative;
  z-index: 80;
  background-color: #fff;
  /* height: 100vh; */
}
/* 滚动的外层盒子必须有固定高度 */
/* 用Better-Scroll可以进行局部滚动，所以顶部的navbar不需要脱离标准流 */
.content {
  /* 方法一：calc计算 */
  /* 方法二：定位 */
  height: calc(100vh - 44px);
  overflow: hidden;
}
.detail-nav {
  position: relative; /**相对定位不脱离标准流 */
  z-index: 100;
  background-color: #fff;
}
</style>
