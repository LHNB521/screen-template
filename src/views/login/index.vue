<template>
  <div>
    <el-form :model="form">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" disabled />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const name = ref('')
const form = reactive({
  name: 'admin',
  password: 'admin123456',
})
// 登录
const login = () => {
  userStore.login(form).then((res: any) => {
    if (!res) {
      router.push({ path: '/' })
    }
  })
}
onMounted(() => {
  name.value = '登录'
})
</script>
