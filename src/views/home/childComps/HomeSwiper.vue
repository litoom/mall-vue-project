<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
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
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>
