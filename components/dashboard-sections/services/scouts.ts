// fetch scouts details
import { apiRequest } from "@/lib/api"

const fetchTotalScouts = async () => {
    try {
      const data = await apiRequest('/admin/athletes-total', {
        method: 'GET',
      })
      console.log(data?.data)
    } catch (error: any) {
      console.log(error)
    }
}

const fetchScoutsPerfomances = async () => {
  try {
    const data = await apiRequest('/admin/scouts-perfomance', {
      method: 'GET',
    })
    console.log(data?.data)
  } catch (error: any) {
    console.log(error)
  }
}

const fetchYearlyRegisteredScouts = async () => {
  try {
    const data = await apiRequest('/admin/scouts-reg-per-month', {
      method: 'GET',
    })
    console.log(data?.data)
  } catch (error: any) {
    console.log(error)
  }
}

const fetchScoutsList = async () => {
  try {
    const data = await apiRequest('/admin/scouts?page=1&limit=20', {
      method: 'GET',
    })
    console.log(data?.data)
  } catch (error: any) {
    console.log(error)
  }
}

const fetchSingleScout = async (id: string) => {
  try {
    const data = await apiRequest(`/admin/scouts/${id}`, {
      method: 'GET',
    })
    console.log(data?.data)
  } catch (error: any) {
    console.log(error)
  }
}



export { fetchTotalScouts, fetchScoutsPerfomances, fetchYearlyRegisteredScouts, fetchScoutsList, fetchSingleScout }
