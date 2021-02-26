<template>
  <div class="tab-control">
    <!--      当前项的索引  index 等于 0, 就使用.active  -->
    <div @click="itemClick(index)" class="tab-control-item" v-for="(item, index) in titles"
      :class="{active: index === currentIndex}">
      <span>{{item}}</span>
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
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    // 传递变量过来
    itemClick(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #f6f6f6;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
