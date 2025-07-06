import { apiRequest } from "@/lib/api"

export interface TrialStats {
  lastMonthCount: number;
  prevMonthCount: number;
  percentageChange: number;
  trend: string;
}

export async function fetchTrialStats(): Promise<TrialStats | null> {
  try {
    const response = await apiRequest('/admin/trial/application/last-month-percentage-applied', {
      method: 'GET',
    });
    // Return only the data property
    return response?.data ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const fetchTrialCount = async () => {
    try {
      const data = await apiRequest('/admin/trial-total', {
        method: 'GET',
      })
      console.log(data?.data)
      return data?.data.totalTrial
    } catch (error: any) {
      console.log(error)
    }
}

const fetchTrials = async () => {
    try {
      const data = await apiRequest('/admin/trials?page=1&limit=5', {
        method: 'GET',
      })
      console.log(data?.data)
    } catch (error: any) {
      console.log(error)
    }
}

const fetchTrialDetails = async (id: string) => {
    try {
      const data = await apiRequest(`/admin/trials/${id}`, {
        method: 'GET',
      })
      console.log(data?.data)
    } catch (error: any) {
      console.log(error)
    }
}

const fetchTodayApplications = async () => {
    try {
      const data = await apiRequest('/admin/trial/application/total-application-today', {
        method: 'GET',
      })
      console.log(data?.data)
      return data?.data.totalApplication
    } catch (error: any) {
      console.log(error)
    }
}

const fetchLastMonthApplicationsPercentage = async () => {
    try {
      const data = await apiRequest('/admin/trial/application/last-month-percentage-applied', {
        method: 'GET',
      })
      console.log(data?.data)
      return data?.data.totalApplication
    } catch (error: any) {
      console.log(error)
    }
}

export { fetchTrialCount, fetchTrials, fetchTrialDetails, fetchTodayApplications, fetchLastMonthApplicationsPercentage }