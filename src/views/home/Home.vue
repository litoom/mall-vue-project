<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    
    <recommend-view :recommends="recommends"> </recommend-view>
    <!-- 轮播图抽取为组件 -->
    <!-- <swiper>
      <swiper-item v-for="(item,index) in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </swiper-item>
    </swiper> -->
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import { getHomeMultidata } from "../../network/home";

// //引入轮播图组件
// import { Swiper, SwiperItem } from "../../components/common/swiper/index.js";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    // Swiper,
    // SwiperItem,
    HomeSwiper,
    RecommendView,
  },
  //在组件创建出来时执行
  created() {
    //this 这里的this是指向组件对象，因为created是组件调用的，所以这里的this指向组件对象
    //1.请求多个数据
    //这是一个异步操作
    getHomeMultidata().then((res) => {
      //这里的this也是当前组件对象，因为箭头函数this是往上一层级寻找的
      console.log(res);
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
  //存储请求回来的数据
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
    };
  },
};
</script>

<style>
.home-nav {
  background-color: pink;
  color: white;
  font-size: 18px;
}
</style>
