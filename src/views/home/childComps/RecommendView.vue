<template>
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="item.index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  border-bottom: 8px solid #eee;
  padding-bottom: 20px;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 80%;
  margin: 10px auto;
  margin-bottom: 6px;
}
</style>
