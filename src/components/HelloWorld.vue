<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <el-button type="primary" @click="count++">count is {{ count }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/store'
const counterStore = useCounterStore()
defineProps<{ msg: string }>()
const count = ref(0)
</script>

<style scoped lang="scss">
.read-the-docs {
  color: $text-color;
}
</style>
