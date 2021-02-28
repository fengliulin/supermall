<template>
  <Swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" v-on:load="imageLoad">
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if (!this.isLoad){
        this.$emit('SwiperImageLoad')
        this.isLoad = true
      }

    }
  }
}
</script>

<style scoped>

</style>
