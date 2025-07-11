"use client"
import React, { useState } from 'react'
import { apiRequest } from '../../lib/api'
import authStore from '../../store/authStore'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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

      console.log(data?.data)
      // Assume token is in data.token
      if (data?.data.token) {
        // After successful login:
        authStore.setAuth(data.data.token, data.data.user)
        setSuccess('Login successful! Redirecting...')
        router.push('/dashboard')
      } else {
        setError('No token received from server')
      }
    } catch (err: any) {
      setError(err.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex items-center gap-2 mb-8 justify-center">
        <Image src="/logo.png" alt="logo" width={50} height={50} className="rounded-sm" />
        <p className="text-4xl font-bold uppercase text-primary">Confluenxe</p>
      </div>

      {/* <h2 className="text-4xl font-bold mb-2 text-center">Admin Login</h2> */}
      <div className="mt-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mt-4">
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
        className="w-full bg-primary text-white py-2 mt-4 rounded hover:bg-primary/90 disabled:opacity-50"
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