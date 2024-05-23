import { createApp } from 'vue'
import './styles/reset.scss'
import App from './App.vue'

import { store } from './store'
import router from './router'

import { setupPermission } from './plugins/permission'

import './mock'

const app = createApp(App)

setupPermission()

app.use(store)
app.use(router)

app.mount('#app')
