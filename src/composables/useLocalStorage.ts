import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const state = ref(initialValue) as Ref<T>

  if (typeof window !== 'undefined') {
    const rawValue = window.localStorage.getItem(key)

    if (rawValue) {
      try {
        state.value = JSON.parse(rawValue) as T
      } catch {
        state.value = initialValue
      }
    }
  }

  watch(
    state,
    (value) => {
      if (typeof window === 'undefined') {
        return
      }

      window.localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true },
  )

  return state
}
