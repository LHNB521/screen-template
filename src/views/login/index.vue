<template>
  <div>{{ name }}</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('')
onMounted(() => {
  name.value = '123'
})
</script>
