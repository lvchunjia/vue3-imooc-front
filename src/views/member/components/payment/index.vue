<script setup>
import { isMobile } from '@/utils/flexible'
import PcPayment from './pc-payment/index.vue'
import MobilePayment from './mobile-payment/index.vue'
</script>

<template>
  <div>
    <!-- PC 端支付 -->
    <pc-payment v-if="!isMobile"></pc-payment>
    <!-- 移动端支付 -->
    <mobile-payment v-else></mobile-payment>
  </div>
</template>

<style scoped lang="scss"></style>
