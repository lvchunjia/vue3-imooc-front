import { defineAsyncComponent } from 'vue'
export { confirm } from './confirm/index.js'

export default {
  install(app) {
    // 获取当前路径任意文件夹下的 index.vue 文件
    const components = import.meta.glob('./*/index.vue')
    // 遍历获取到的组件模块
    for (const [fullPath, fn] of Object.entries(components)) {
      // 拼接组件注册的 name
      const componentName = 'm-' + fullPath.replace('./', '').split('/')[0]
      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
