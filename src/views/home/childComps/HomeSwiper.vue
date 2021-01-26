<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// import Swiper from '../../../components/common/swiper/Swiper';
// import SwiperItem from '../../../components/common/swiper/SwiperItem'
//引入轮播图组件
import { Swiper, SwiperItem } from "../../../components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    imageLoad() {
      console.log("轮播图图片全都加载完成拉");
      //这个事件只需要发送一次就可以了, .once修饰符也可以
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
</style>
