export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!baseUrl) throw new Error('API base URL is not set in .env')
  const res = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'API request failed')
  }
  return data
} 