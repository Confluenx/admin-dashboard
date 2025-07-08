import { apiRequest } from "@/lib/api"

const fetchNotifications = async () => {
    try {
      const data = await apiRequest('/admin/notifications?page=1&limit=5', {
        method: 'GET',
      })
      // console.log(data?.data)

      return data?.data.notifications
    } catch (error: any) {
      console.log(error)
    }
}

export { fetchNotifications }