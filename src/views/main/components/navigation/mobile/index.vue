<script setup>
import { getCategory } from '@/api/category'

const getCategoryData = async () => {
  const res = await getCategory()
  console.log(res)
}
getCategoryData()
</script>

<template>
  <div class="mobile">
    <h2>mobile</h2>
  </div>
</template>

<style scoped lang="scss"></style>
