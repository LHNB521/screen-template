<template>
  <div class="flexible">
    <h1>rem响应式方案</h1>
    <div class="box1">box1</div>
    <div class="box2">box2</div>
    <div class="box3">box3</div>
  </div>
</template>

<script setup lang="ts">
import { useFlexible } from '@/hooks/useFlexble'
// 响应式
useFlexible(window, document)
</script>
<style lang="scss" scoped>
.flexible {
  position: relative;
  width: 100%;
  background-color: red;

  .box1 {
    width: 100%;
    height: 300px;
    font-size: 50px;
    color: white;
    background-color: blue;
  }

  .box2 {
    width: 100%;
    height: 300px;
    font-size: 50px;
    color: white;
    background-color: rgb(59 59 150);
  }

  .box3 {
    width: 100%;
    height: 300px;
    font-size: 50px;
    color: white;
    background-color: rgb(255 0 132);
  }
}
</style>
