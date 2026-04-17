import { ref, computed } from 'vue'

export const token = ref(localStorage.getItem('token'))
export const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

export const isLoggedIn = computed(() => !!token.value)

export function setAuth(newUser, newToken) {
  localStorage.setItem('token', newToken)
  localStorage.setItem('user', JSON.stringify(newUser))

  token.value = newToken
  user.value = newUser
}

export function clearAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  token.value = null
  user.value = null
}

export function syncAuth() {
  token.value = localStorage.getItem('token')
  user.value = JSON.parse(localStorage.getItem('user') || 'null')
}
