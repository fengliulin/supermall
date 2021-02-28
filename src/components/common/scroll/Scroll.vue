<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(Pullup)
BScroll.use(ObserveDOM)

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
      click: true // 让页面可以点击
    })

    // 监听滚动的位置
    this.scroll.on('scroll', position => {
      // console.log(position)
      this.$emit('scroll', position)
    })

    // 打印
    console.log(this.scroll)


    // 监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })


  },
  methods: {
    refresh(...args) {
      this.scroll.refresh()
      for (const arg of args) {
        // console.log(arg)
      }
    }
  }
}
</script>

<style scoped>
</style>
