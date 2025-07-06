"use client"
import React, { useState } from 'react'
import { apiRequest } from '../../lib/api'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await apiRequest('/admin/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      setSuccess('Check your email for the OTP code.')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <h2 className="text-4xl font-bold mb-4">Forgot Password</h2>
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
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 mt-4 rounded hover:bg-primary/90 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send OTP'}
      </button>
      <div className="text-right mt-2">
        <a href="/auth/login" className="text-blue-600 hover:underline text-sm">Back to login</a>
      </div>
    </form>
  )
} 