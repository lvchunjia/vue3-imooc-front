export const SUCCESS = 'success'
export const WARN = 'warn'
export const ERROR = 'error'
export const typeEnum = [SUCCESS, WARN, ERROR]

// 样式表数据
export const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass: 'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass: 'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass: 'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}
