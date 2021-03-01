<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ""
    // },
    // show: {
    //   type:Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: true
    }
  },
  methods: {
    // 不能命名show， 否则会出现
    /*
    Uncaught (in promise) TypeError: _this.$toast.show is not a function
    at eval (Detail.vue?a2a1:82)
     */
    showToast(message, duration) {
      console.log("-0--")
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''

        // 无法这样设置样式
        document.querySelector(".toast").style.backgroundColor="#FF0000"

        // 获取属性
        console.log( document.querySelector(".toast").attributes[document.querySelector(".toast").getAttributeNames()[3]])
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    z-index: 999;

    transform: translate(-50%, -50%); /*中间*/

    color: #ffffff;
    background-color: rgba(0,0,0,.75);
  }
</style>
