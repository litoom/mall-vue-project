<template>
  <!-- 购物车列表显示 -->
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div>
        <cart-list-item
          v-for="(item, index) in cartList"
          :key="index"
          :item-info="item">
          </cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "../../../components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  computed: {
    // 把vuex的index.js里的getters转换为计算属性，可以直接使用
    ...mapGetters(["cartList"]),
  },
  //在这个组件活跃时调用的函数
  activated() {
    //刷新scrollHeight的高度，当进入购物车组件时，刷新购物车列表的scroll滚动高度，避免不能滚动的情况
    // console.log('xxxxxxxxxxxxxxxxxxxxxxx');
    this.$refs.scroll.refresh();
  },
  components: {
    Scroll,
    CartListItem,
  },
};
Scroll;
</script>

<style scoped>
.cart-list {
  height: calc(100% - 49px);
}
.content {
  /* %高度是相对于父元素 */
  height: calc(100% - 44px - 49px);
  /* position: relative; */
  overflow: hidden;
}
</style>
