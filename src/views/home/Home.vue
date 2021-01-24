<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"> </recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      >
      </tab-control>

      <goods-list :goods="showGoods"> </goods-list>
    </scroll>

    <!-- 原生元素可以直接监听事件
    如 <button @click="btnClick"> 
    但是组件不能直接监听,使用native修饰符可以监听组件,新版不需要这个修饰符也可以监听
    -->
    <back-top @click.native="backClick"></back-top>

    <!-- 轮播图抽取为组件 -->
    <!-- <swiper>
      <swiper-item v-for="(item,index) in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper> -->

    <!-- 小机灵鬼 -->
    <!-- <ul>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
      <li>xxxxx</li>
    </ul> -->
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import { getHomeMultidata, getHomeGoods } from "../../network/home";

// //引入轮播图组件
// import { Swiper, SwiperItem } from "../../components/common/swiper/index.js";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView";

import TabControl from "../../components/content/tabControl/TabControl";

import GoodsList from "../../components/content/goods/GoodsList";
// import GoodsListItem from '../../components/content/goods/GoodsListItem';

// import BScroll from 'better-scroll';滚动框架better-scroll
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

export default {
  name: "Home",
  components: {
    NavBar,
    // Swiper,
    // SwiperItem,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  //在组件创建出来时执行
  created() {
    //this 这里的this是指向组件对象，因为created是组件调用的，所以这里的this指向组件对象
    //1.请求多个数据
    //这是一个异步操作,这里用this时是调用methods里面的方法，不用this会直接调用request.js里面export的函数
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    //1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //这里的this也是当前组件对象，因为箭头函数this是往上一层级寻找的
        console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求商品数据
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      // console.log("111111111111111111111", page);
      getHomeGoods(type, page)
        .then((res) => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
        })
        .catch((err) => err);
    },
    /**
     * 事件监听相关的方法
     */
    //接收TabControl组件传来的数据
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    //点击返回顶部
    backClick() {
      //scrollTo(x,y,时间ms)
      //这个scrollTo是封装再Scroll组件里面的方法，会方便一点
      //通过ref属性  this.$refs.scroll是Scroll这个组件
      //this.$refs.scroll.scrollTo(0,0,500);  调用Scroll组件的scrollTo方法
      this.$refs.scroll.scrollTo(0,0,500);
    },
  },
  //存储请求回来的数据
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],

      //goods:保存商品的数据结构设计
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      //默认<goods-list :goods="goods['pop'].list"> </goods-list>
      currentType: "pop",
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* 解决导航栏盖住轮播图的问题,或者使用粘性定位 */
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: pink;
  color: white;
  font-size: 18px;
}
.tab-control {
  /* 吸顶效果 
  *   为什么要写到Home.vue里面
  *    因为如果写到TabControl.vue里，则所有使用TabControl.vue的组件都会有吸顶效果，有的项目不需要这个效果
  */
  position: sticky;
  top: 44px;
  z-index: 20;
}
/* 这个content指的是这个组件设置的class，因为有scoped作用的的概念 */
.content {
  /* height: calc(100vh - 44px - 49px);
  background-color: skyblue;
  overflow: hidden; */

  /* height: 300px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  background-color: skyblue;
  overflow: hidden;
}
</style>
