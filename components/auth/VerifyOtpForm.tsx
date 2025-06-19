import React, { useState } from 'react'
import { apiRequest } from '../../lib/api'

export default function VerifyOtpForm() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await apiRequest('/admin/verify-password-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      })
      setSuccess('OTP verified! You may now reset your password.')
      // TODO: redirect to reset password page if needed
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
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
        <label className="block mb-1">OTP</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {success && (
        <div className="text-green-600">
          {success}
          <div className="mt-2">
            <a href="/auth/reset-password" className="text-blue-600 hover:underline text-sm">Reset Password</a>
          </div>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      <div className="text-right mt-2">
        <a href="/auth/login" className="text-blue-600 hover:underline text-sm">Back to login</a>
      </div>
    </form>
  )
} 