import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载
  // 判断用户是否看到图片：useIntersectionObserver
  // img标签渲染图片：img的src属性是网络地址时，会从网络中获取该图片。
  // 把该地址默认替换为非网络地址，当用户可见时，在替换成网络地址。
  mounted(el) {
    // 1. 当前 img 标签的 src
    const imgSrc = el.src
    // 2. 把 img 标签的 src 替换为本地地址，也可以替换为空或者一个透明的图片
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        stop()
      }
    })
  }
}
