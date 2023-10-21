import { h, render } from 'vue'
import MessageComponent from './index.vue'

export const message = (type, content, duration) => {
  /**
   * 动画结束时的回调
   */
  const onDestroy = () => {
    // 3. message 销毁
    render(null, document.body)
  }

  const VNode = h(MessageComponent, {
    type,
    content,
    duration,
    destroy: onDestroy
  })

  render(VNode, document.body)
}
