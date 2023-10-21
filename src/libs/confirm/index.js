import { h, render } from 'vue'
import confirmComponent from './index.vue'

/**
 * 通知组件方法
 * @param {*} title
 * @param {*} content
 * @param {*} cancelText
 * @param {*} confirmText
 * @returns
 */
export const confirm = (title, content, cancelText = '取消', confirmText = '确定') => {
  return new Promise((resolve, reject) => {
    // 允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }

    // 关闭弹层事件
    const close = () => {
      render(null, document.body)
    }

    // 取消按钮事件
    const cancelHandler = () => {
      reject(new Error('取消按钮点击'))
    }

    // 确定按钮事件
    const confirmHandler = () => {
      resolve()
    }

    // 1. vnode
    const VNode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      confirmHandler,
      cancelHandler,
      close
    })

    render(VNode, document.body)
  })
}
