<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <!-- 下面这个插槽用于接收活跃状态下的图片 -->
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <!-- 插槽会被直接覆盖掉,class属性会消失，多以用一个div接收 -->
    <!-- v-bind:class="{ active: isActive }" -->
    <div v-bind:style="activeStyle">
      <slot name="item-text"></slot>
    </div>

    <!-- 不写死，通过插槽在父组件里写 -->
    <!-- <img src="../../assets/img/tabbar/user.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 父组件向子组件传参数,当传的是静态属性时，父元素标签上可以不写:
  props: {
    path: String,
    activeColor: {
      type: String,
      dafault: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      //this.$route.path是当前活跃的路由的path
      //this.path是<div class="tab-bar-item" path="/home">的那个path
      console.log(this.$route.path, this.path);
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color:this.activeColor} : {}
    },
  },
  methods: {
    itemClick() {
      console.log("监听到点击了，监听写到组件里面");
      this.$router.push(this.path).catch((err) => err);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 26px;
  height: 26px;
  margin-top: 4px;
  /* 清除图片下的默认的3px */
  vertical-align: middle;
  margin-bottom: 2px;
}

/* js代码不能传到css里面 */
/* .active {
  color: red;
} */
</style>
