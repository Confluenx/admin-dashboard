import { makeAutoObservable } from 'mobx'

class AuthStore {
  token: string | null = null
  user: any = null

  constructor() {
    makeAutoObservable(this)
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      this.user = user ? JSON.parse(user) : null
    }
  }

  setAuth(token: string, user: any) {
    this.token = token
    this.user = user
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  logout() {
    this.token = null
    this.user = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
}

const authStore = new AuthStore()
export default authStore 