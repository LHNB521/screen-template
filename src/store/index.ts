import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { useCounterStore } from './modules/counter-setup'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
export { useCounterStore }
