<template>
  <div>
    <h1>rem响应式方案</h1>
  </div>
</template>

<script setup lang="ts">
import { useFlexible } from '@/hooks/useFlexble'
// 响应式
useFlexible(window, document)
</script>
