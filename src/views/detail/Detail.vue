<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav">
    </detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages"> </detail-swiper>
      <!-- 商品名称 价格 等信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad">
      </detail-goods-info>
      <!-- 商品参数 -->
      <detail-param-info
        :param-info="paramInfo"
        ref="params"
      ></detail-param-info>
      <!-- 商品评论 -->
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <!-- 推荐商品 -->
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"> </detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
import DetailBottomBar from "./childComponents/DetailBottomBar";
// import BackTop from '../../components/content/backTop/BackTop'  混入
import { backTopMixin } from "../../common/mixin";

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
      recommends: [], //保存推荐数据
      themeTopYs: [], //商品 参数 评论 推荐的offsetTop值
      currentIndex: 0,
      // isShowBackTop:false,  //回到顶部  混入
    };
  },
  mixins: [backTopMixin],
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
    DetailBottomBar,
    // BackTop,  混入
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
      }

      //$nextTick将回调延迟到下次 DOM 更新循环之后执行。
      //但是在这里dom是渲染结束，但是很多图片还没有加载完全，多以高度会有问题。也就是根据最新的数据，对应的dom已经被渲染完全，但是图片依然是没有加载完。
      //offsetTop值不对的情况，一般情况都是图片加载的问题
      this.$nextTick(() => {
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      });
    });
    //3.请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },
  //只要有数据更新，updated(){}就会执行
  updated() {
    console.log("xxxxxxxxxxxxxxxxxxxx");
    this.$refs.scroll.refresh();

    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();

      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    //监听Scroll组件发过来的scroll事件的执行函数
    contentScroll(position) {
      // console.log(position);
      // 1.获取Y值
      const positionY = -position.y;
      // 2.positionY和主题中的值进行对比,根据positionY和position对比，改变index值
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        // console.log(i);
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY > this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 或者给themeTopYs数组最后加一个无穷大
      /**
       * this.currentIndex !==i  防止赋值的过程过于频繁
       */

      //详情页的回到顶部
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
    //  backTop() {
    //   //scrollTo(x,y,时间ms)
    //   //这个scrollTo是封装再Scroll组件里面的方法，会方便一点
    //   //通过ref属性  this.$refs.scroll是Scroll这个组件
    //   //this.$refs.scroll.scrollTo(0,0,500);  调用Scroll组件的scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },     混入

    //DetailBottomBar发送过来的点击加入购物车的函数
    addToCart() {
      // console.log('-----------------');
      //1.获取购物车需要展示的商品信息
      //这里的product写在了addToCart里面，如果写到data里面，往对象里面添加属性则不是响应式的
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // product.count = 0;
      //2.将商品添加到购物车里,添加到vuex的state里，修改state要通过mutations修改
      this.$store.dispatch("addCart", product);
    },
  },
  mounted() {
    //在这里获取NavBar的各个组件的offsetTop的值，可以吗？
    //通过ref的$el属性获取挂载的dom元素
    //不行, mounted里请求的数据不一定能响应回来,在DetailParamInfo组件里面第一行有个判断，在没有数据的情况下跟组件不会渲染,应该写到updated(){}
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$ref.params.$el.offsetTop);
    // this.themeTopYs.push(this.$ref.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$ref.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
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
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
.detail-nav {
  position: relative; /**相对定位不脱离标准流 */
  z-index: 100;
  background-color: #fff;
}
</style>
