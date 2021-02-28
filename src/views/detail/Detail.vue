<template>
  <div id="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail} from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailNavBar
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then(result => {
      this.topImages = result.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>

</style>
