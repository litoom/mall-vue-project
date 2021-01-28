<template>
  <!-- 购物车列表显示 -->
   <div class="cart-list">
  <scroll class="content">
      <li v-for="(item, index) in cartList" :key="index">
        {{ item }}
      </li>   
  </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "../../../components/common/scroll/Scroll";

export default {
  name: "CartList",
  computed: {
    // 把vuex的index.js里的getters转换为计算属性，可以直接使用
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
  },
};
Scroll;
</script>

<style scoped>
.cart-list {
  height: 100vh;
}
.content {
  /* %高度是相对于父元素 */
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>
