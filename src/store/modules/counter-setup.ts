import { defineStore } from 'pinia'

// 组合式 Setup Store
export const useCounterStore = defineStore('counter', () => {
  // ref变量 → state 属性
  const count = ref(0)
  // computed变量 → getter 属性
  const double = computed(() => count.value * 2)
  // 函数 → action 方法
  function increment() {
    count.value++
  }
  return { count, double, increment }
})
