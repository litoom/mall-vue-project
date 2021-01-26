<template>
  <div class="detail-swipers">
    <swiper class="swipers">
      <swiper-item
        v-for="(item, index) in topImages"
        :key="index"
        class="swipers-item"
      >
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper/index.js";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
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
};
</script>

<style scoped>
/* .swipers-item {
  height: 250px;
  overflow: hidden;
} */
.swipers {
  /* 裁取轮播图图片的大小 */
  height: 250px;
  overflow: hidden;
}
</style>
