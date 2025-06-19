"use client"
import React, { useState } from 'react'
import { apiRequest } from '../../lib/api'
import authStore from '../../store/authStore'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const data = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      // Assume token is in data.token
      if (data.token) {
        authStore.setToken(data.token)
        authStore.setEmail(email)
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => router.push('/admin'), 1000)
      } else {
        setError('No token received from server')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="text-right mt-2">
        <a href="/auth/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
      </div>
    </form>
  )
} 