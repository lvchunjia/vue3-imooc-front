<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { putProfile } from '@/api/sys'
import { message } from '@/libs'
import { isMobile } from '@/utils/flexible'
import { getOSSClient } from '@/utils/sts'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { setUserInfo } = userStore
defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['close'])

// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}
// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}

/**
 * 图片裁剪处理
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
  /**
   * 接收两个参数：
   * 1. 需要裁剪的图片 DOM
   * 2. options 配置对象
   */
  cropper = new Cropper(imageTarget.value, isMobile.value ? mobileOptions : pcOptions)
})

/**
 * 确定按钮点击事件
 */
const loading = ref(false)
const onConfirmClick = () => {
  // 开启 loading
  loading.value = true
  // 获取裁剪后的图片
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的 blob 地址
    putObjectToOSS(blob)
  })
}

/**
 * 进行 OSS 上传
 */
let ossClient = null
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    // 因为当前凭证只具备 images 文件夹下的访问权限，所以图片需要上传到 images/xxx.xx 。否则你将得到一个 《AccessDeniedError: You have no right to access this object because of bucket acl.》 的错误
    const fileTypeArr = file.type.split('/')
    const fileName = `${userInfo.value.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    // 文件存放路径，文件
    const res = await ossClient.put(`images/${fileName}`, file)
    // 通知服务器
    onChangeProfile(res.url)
  } catch (e) {
    message('error', e)
  }
}

/**
 * 上传新头像到服务器
 */
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  setUserInfo({
    ...userInfo.value,
    avatar
  })
  // 更新服务器数据
  await putProfile(userInfo.value)
  // 通知用户
  message('success', '用户头像修改成功')
  // 关闭 loading
  loading.value = false
  // 关闭 dialog
  close()
}

/**
 * 关闭事件
 */
const close = () => {
  emits('close')
}
</script>

<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobile"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img class="" ref="imageTarget" :src="blob" />

    <m-button
      :loading="loading"
      :isActiveAnim="false"
      class="mt-4 w-[80%] xl:w-1/2"
      @click="onConfirmClick"
    >
      确定
    </m-button>
  </div>
</template>

<style scoped lang="scss"></style>
