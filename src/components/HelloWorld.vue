<template>
  <h1>{{ counterStore.count }}</h1>
  <h1>{{ counterStore.double }}</h1>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/store'
const counterStore = useCounterStore()
</script>

<style scoped lang="scss">
.read-the-docs {
  color: $text-color;
}
</style>
