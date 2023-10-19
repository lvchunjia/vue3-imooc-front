// type 可选项：表示按钮风格
export const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 ',
  main: 'text-white bg-main hover:bg-hover-main active:bg-main ',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 '
}

// size 可选项：表示按钮大小。区分文字按钮和icon按钮
export const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}

export const EMITS_CLICK = 'click'
