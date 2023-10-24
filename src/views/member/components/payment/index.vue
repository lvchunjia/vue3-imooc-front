<script setup>
import { isMobile } from '@/utils/flexible'
import PcPayment from './pc-payment/index.vue'
import MobilePayment from './mobile-payment/index.vue'

defineProps({
  payData: {
    required: true,
    type: Object
  }
})
</script>

<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment v-if="!isMobile" :pay-data="payData"></pc-payment>
    <!-- 移动端支付 -->
    <mobile-payment v-else :pay-data="payData"></mobile-payment>
  </div>
</template>

<style scoped lang="scss"></style>
