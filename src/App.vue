<template>
  <el-button type="primary" @click="counterStore.increment">count++</el-button>
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import { useCounterStore } from './store'
const counterStore = useCounterStore()
</script>
