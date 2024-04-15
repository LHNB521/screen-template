<template>
  <el-config-provider :locale="zhCN"></el-config-provider>
</template>

<script setup lang="ts">
import { useCounterStore } from './store'
const counterStore = useCounterStore()
</script>
