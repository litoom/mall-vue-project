<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 在这又弄了一个tab-control -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    >
    </tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad">
      </home-swiper>
      <recommend-view :recommends="recommends"> </recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl2"
        :class="{ fixed: isTabFixed }"
      >
      </tab-control>

      <goods-list :goods="showGoods"> </goods-list>
    </scroll>

    <!-- 原生元素可以直接监听事件
    如 <button @click="btnClick"> 
    但是组件不能直接监听,使用native修饰符可以监听组件,新版不需要这个修饰符也可以监听
    -->
    <back-top @click.native="backClick" v-show="isShowBackTop"> </back-top>

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
import { debounce } from "../../common/utils";
import MainTabBar from "../../components/content/mainTabbar/MainTabBar";

// 引入的可以直接用,不用写this

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
    MainTabBar,
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  //路由跳转组件会销毁
  destroyed() {
    console.log("呀，路由跳转组件会销毁");
  },
  // 组件活跃时执行的函数，这两个函数配合keep-alive使用
  activated() {
    console.log("Home组件活跃时");
     //这里最好刷新一次高度
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  // 组件离开时执行的函数
  deactivated() {
    console.log("Home组件不活跃时,离开时");
    // this.saveY = this.$refs.scroll.scroll.y;
    this.saveY = this.$refs.scroll.getScrollY();
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

    // //3.在首页监听事件总线，当首页组件创建完成时就开始监听
    // //监听事件总线，当item中图片加载完成
    // //不要再created()里面监听，有可能获取不到
    // this.$bus.$on('itemImageLoad',()=>{
    //   // console.log('xxxxxxxxxxxxxxxxxxxxxxx');
    //   // 在这里刷新scroll的refresh
    //   //减少一个单词的refresh
    //   this.$refs.scroll.refresh();
    //   //箭头函数的this就是cerated里的this，created是组件对象的函数，因此created里的this就是这个组件对象
    // })

    //在created()里面获取不到组件对象
    // this.tabOffsetTop = this.$refs.TabControl =undefined
  },
  mounted() {
    // //3.在首页监听事件总线，当首页组件创建完成时就开始监听
    // //监听事件总线，当item中图片加载完成
    // //不要再created()里面监听，有可能获取不到
    // this.$bus.$on('itemImageLoad',()=>{
    //   // console.log('xxxxxxxxxxxxxxxxxxxxxxx');
    //   // 在这里刷新scroll的refresh函数封装在scroll.vue里面
    //   //减少一个单词的refresh
    //   this.$refs.scroll.refresh();
    //   //箭头函数的this就是cerated里的this，created是组件对象的函数，因此created里的this就是这个组件对象
    // 防抖写法：图片加载完成的时间监听
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      // refresh是个局部变量,但是执行结束并不会被销毁，因为它是一个闭包，refresh()引用着refresh
      refresh();
    });
    //获取tabControl的offsetTop,这里获取的是组件，不是dom元素,组件没有offsetTop属性
    //所有的组件都有一个属性$el:用于获取组件中的dom元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    // console.log(this.tabOffsetTop);
    //但是，放到mounted里面也不合适，因为图片加载需要时间，这样获取的offsetTop不准确，要等到轮播图加载出来之后再计算offsetTop
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

          //允许继续执行上拉加载更多的回调函数,放到loadMore里面更好啊
          // this.$refs.scroll.finishPullUp();
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //点击返回顶部
    backClick() {
      //scrollTo(x,y,时间ms)
      //这个scrollTo是封装再Scroll组件里面的方法，会方便一点
      //通过ref属性  this.$refs.scroll是Scroll这个组件
      //this.$refs.scroll.scrollTo(0,0,500);  调用Scroll组件的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //监听滚动
    contentScroll(position) {
      //子组件scroll把滚动的position传到父组件home上
      // console.log(position);
      //1.判断BackTop是否显示，true or false
      this.isShowBackTop = Math.abs(position.y) > 1000;
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('上拉，拉');
      // currentType是点击的那个栏目
      this.getHomeGoods(this.currentType);

      // 允许继续执行下拉加载更多的回调函数,写到getHomeGoods函数里面也可以
      this.$refs.scroll.scroll.finishPullUp();
    },
    //封装防抖函数
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
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
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
  z-index: 30;
}
.home-nav {
  /* 再使用浏览器原生滚动时，为了让导航栏不跟随一起滚动，用下面的css样式 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20; */
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
  /* top: 44px; */
  z-index: 20;
}
/* 这个content指的是这个组件设置的class，因为有scoped作用的的概念 */
.content {
  height: calc(100vh - 44px - 49px);
  /* background-color: skyblue; */
  overflow: hidden;

  /* height: 300px; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  z-index: 0;
  /* background-color: skyblue; */
  /* overflow: hidden; */
}
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  /* 问题： */
/* 1.tabControl脱标，下面的图片会闪一下到上面
        2.tabControl消失
          因为Better-Scroll原理是tranfrom的translate移动的，fixed的元素也会被平移
   */
</style>
