export const Local = {
  set<T>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  get(key: string) {
    const value = window.localStorage.getItem(key)
    return (value && JSON.parse(value)) || null
  },
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  },
}

export const Session = {
  set<T>(sKey: string, val: T) {
    window.sessionStorage.setItem(sKey, JSON.stringify(val))
  },
  get(sKey: string) {
    const value = window.sessionStorage.getItem(sKey)
    return (value && JSON.parse(value)) || null
  },
  remove(sKey: string) {
    window.sessionStorage.removeItem(sKey)
  },
  clear() {
    window.sessionStorage.clear()
  },
}
