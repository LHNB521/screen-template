import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { useCounterStore } from './modules/counter-setup'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store
export { useCounterStore }
