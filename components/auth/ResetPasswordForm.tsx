"use client"
import React, { useState } from 'react'
import { apiRequest } from '@/lib/api'
import authStore from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';

interface ResetPasswordFormProps {
  email?: string;
}

export default function ResetPasswordForm({ email: initialEmail = '' }: ResetPasswordFormProps) {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!email) {
      setError('Email is required')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await apiRequest('/admin/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      setSuccess('Password reset successful! You may now log in.')
      router.push('/auth/login')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
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
        <label className="block mb-1">New Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mt-4">
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
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
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
      <div className="text-right mt-2">
        <a href="/auth/login" className="text-blue-600 hover:underline text-sm">Back to login</a>
      </div>
    </form>
  )
} 