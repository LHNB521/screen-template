<template>
  <div class="flexible">
    <h1>rem响应式方案</h1>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
  </div>
</template>

<script setup lang="ts">
import { useFlexible } from '@/hooks/useFlexble'
// 响应式
useFlexible(window, document)
</script>
<style lang="scss" scoped>
.flexible {
  width: 100%;
  height: 100%;
}
</style>
