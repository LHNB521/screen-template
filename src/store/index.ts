import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export { store }
export * from './modules/app'
export * from './modules/user'
export * from './modules/permission'
