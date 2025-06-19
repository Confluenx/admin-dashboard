import axios from 'axios'

export async function apiRequest(endpoint: string, options: any = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!baseUrl) throw new Error('API base URL is not set in .env')

  try {
    const res = await axios({
      url: `${baseUrl}${endpoint}`,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      data: options.body ? JSON.parse(options.body) : undefined,
      params: options.params,
    })
    return res.data
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message)
    }
    throw new Error(err.message || 'API request failed')
  }
} 