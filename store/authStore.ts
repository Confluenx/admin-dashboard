import { makeAutoObservable } from 'mobx'

class AuthStore {
  token: string | null = null
  email: string | null = null

  constructor() {
    makeAutoObservable(this)
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
      this.email = localStorage.getItem('email')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  setEmail(email: string) {
    this.email = email
    if (typeof window !== 'undefined') {
      localStorage.setItem('email', email)
    }
  }

  logout() {
    this.token = null
    this.email = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    }
  }
}

const authStore = new AuthStore()
export default authStore 