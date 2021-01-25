<template>
  <!-- ref一般绑定给子组件,普通元素也可以绑定ref，获取的是元素-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script scope>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      //Number类型，default不需要携程函数返回值样式
      //dafault默认为数组或对象时,使用函数返回值
      dafault: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    //1.创建BScroll对象
    //document.querySelector('.wrapper')这样获取的不唯一的wrapper不方便使用
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //控制非button元素是否可以监听点击事件
      probeType: this.probeType, //3:实时监听,表示只要在滚动过程中一直监听
      pullUpLoad: this.pullUpLoad,
    });
    //2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);

      // 把position数据传到home组件上,用子传父自定义事件
      this.$emit("scroll", position);
    });

    //3.监听上拉事件
    this.scroll.on("pullingUp",()=>{
      // console.log("上拉加载");
      //自定义事件传递给home组件
      this.$emit('pullingUp');
    })

    //回到顶部,调用scrollTo函数(框架自带的)
    // this.scroll.scrollTo(0,0);
  },
  methods: {
    //封装一下，方便home组件backClick方法调用
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },

    //再他们的封装一个允许继续执行下拉加载更多的回调函数
    finishPullUp(){
      this.scroll.finishPullUp();
    }
  },
};
</script>

<style scoped>
</style>
