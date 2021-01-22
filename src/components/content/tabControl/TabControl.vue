<template>
  <div class="tab-control">
    <!-- 因为只是文字不一样，样式都是相同的，没必要用插槽 -->
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }" 
      @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      //currentIndex记录当前选中的item
      currentIndex: 0,
    };
  },
  computed: {},
  methods: {
    itemClick(index){
      this.currentIndex = index;
      // 子组件向父组件传递数据，用自定义事件方式传递
      //传递点击的是流行、新款、精选，传到主页用于切换数据
      this.$emit("tabClick",index)
    }
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
  /* background-color: skyblue; */
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: red;
}
.active span {
  border-bottom: 3px solid red;
}
</style>
