<template>
  <div>
    <h1 v-on:click="addToCart">加入购物车</h1>
  </div>
</template>

<script>
export default {
  name: "AddShoppingCart",
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>

</style>
