// fetch total athletes
import { apiRequest } from "@/lib/api"

const fetchTotalAthletes = async () => {
    try {
      const data = await apiRequest('/admin/athletes-total', {
        method: 'GET',
      })
      console.log(data?.data)

      return data?.data.totalAthletes
    } catch (error: any) {
      console.log(error)
    }
}

const fetchAthletesPerformances = async () => {
  try {
    const data = await apiRequest('/admin/athlete-last-month-percentage', {
      method: 'GET',
    })
    console.log(data?.data)
    return data?.data
  } catch (error: any) {
    console.log(error)
  }
}

const fetchYearlyRegisteredAthletes = async () => {
  try {
    const data = await apiRequest('/admin/athlete-reg-per-month', {
      method: 'GET',
    })
    console.log(data?.data)
  } catch (error: any) {
    console.log(error)
  }
}

const fetchAthleteList = async () => {
  try {
    const data = await apiRequest('/admin/athletes?page=1&limit=20', {
      method: 'GET',
    })
    console.log(data?.data)
  } catch (error: any) {
    console.log(error)
  }
}

const fetchSingleAthlete = async (id: string) => {
  try {
    const data = await apiRequest(`/admin/athletes/${id}`, {
      method: 'GET',
    })
    console.log(data?.data)
  } catch (error: any) {
    console.log(error)
  }
}



export { fetchTotalAthletes, fetchAthletesPerformances, fetchYearlyRegisteredAthletes, fetchAthleteList, fetchSingleAthlete }
