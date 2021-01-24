<template>
  <div class="back-top">
    <img src="../../../assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    //点击回到顶部写在这个组件里面不方便获取scroll对象,
    // 写到home组件里，监听BackTop组件的点击
  },
};
</script>

<style>
.back-top {
  z-index: 30;
  position: fixed;
  right: 0;
  bottom: 49px;
}
.back-top img {
  width: 50px;
  height: 50px;
}
</style>
