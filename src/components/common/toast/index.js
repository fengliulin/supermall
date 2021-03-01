import Toast from "@/components/common/toast/Toast";

const obj = {}
// 默认会传递一个参数Vue(function Vue (options) {})
obj.install = function (vue) {
  // Vue.extend(Toast)
  // console.log(Toast.$el) // 不能这么封装，插件加载，元素还没有挂载入到$el里
  // document.body.appendChild(Toast.$el)

  // 创建组件构造器
  const toastContrustor = vue.extend(Toast)

  // new 的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  // 将组件对象，手动挂载到某一个元素上, 渲染组件
  toast.$mount() // 可以空

  document.body.appendChild(toast.$el)

  vue.prototype.$toast = toast
}
export default obj


// 都可以封装
/*const obj = {
  install() {
    console.log("执行了")
  }
}

export default {obj}

export default {
  install() {
    console.log("执行了")
  }
}*/
