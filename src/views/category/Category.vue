<template>
  <div class="wrapper">
    <ul class="content">
      <button @click="btnClick">点我</button>
      <li>滚起来11</li>
      <li>滚起来21</li>
      <li>滚起来31</li>
      <li>滚起来41</li>
      <li>滚起来51</li>
      <li>滚起来61</li>
      <li>滚起来71</li>
      <li>滚起来81</li>
      <li>滚起来91</li>
      <li>滚起来101</li>
      <li>滚起来111</li>
      <li>滚起来121</li>
      <li>滚起来131</li>
      <li>滚起来61</li>
      <li>滚起来71</li>
      <li>滚起来81</li>
      <li>滚起来91</li>
      <li>滚起来101</li>
      <li>滚起来111</li>
      <li>滚起来121</li>
      <li>滚起来131</li>
      <li>滚起来131</li>
      <li>滚起来61</li>
      <li>滚起来71</li>
      <li>滚起来81</li>
      <li>滚起来91</li>
      <li>滚起来101</li>
      <li>滚起来111</li>
      <li>滚起来121</li>
      <li>滚起来131</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  /**
   * created() 组件创建完成之后并没有挂载模板,
   * 所以获取不到元素,需要写到mounted里面
   */
  mounted() {
    // 传document.querySelector('.content'也可以
    // console.log(this.scroll);
    // console.log(document.querySelector('.wrapper'));
    this.scroll = new BScroll(".wrapper", {
      click: true, //允许.content里面的监听事件
      probeType: 3, //设置实时监听滚动位置
      pullUpLoad: true, //上拉加载更多
    });
    this.scroll.on("scroll", (position) => {
      // console.log(position);
    });
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");

      //继续执行下拉加载更多的回调函数
      this.scroll.finishPullUp();
    });
  },
  methods: {
    btnClick() {
      console.log("btnClick");
    },
  },
};
</script>

<style>
.wrapper {
  /* 原生滚动方法 */
  height: 250px;
  background-color: skyblue;
  overflow: hidden;
  /* overflow:scroll; */
}
</style>
