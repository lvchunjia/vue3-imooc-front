<script setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="fixed left-0 top-0 w-screen h-screen text-xl bg-slate-500 z-20">
    {{ id }}
  </div>
</template>

<style scoped lang="scss"></style>
