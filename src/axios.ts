import axios, { AxiosError, type AxiosInstance } from 'axios'
import { useAuth } from './composables/useAuth'
import { useRouter } from 'vue-router'

let initializedAxiosInstance: AxiosInstance | null = null

async function initAxios(): Promise<AxiosInstance> {
  const url = import.meta.env.VITE_API_URL
  const axiosClient = axios.create({})

  axiosClient.defaults.baseURL = `${url}/api`
  axiosClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axiosClient.defaults.headers.common['Content-Type'] = 'application/json'
  axiosClient.defaults.headers.common['Accept'] = 'application/json'
  axiosClient.defaults.withCredentials = true
  axiosClient.defaults.withXSRFToken = true

  // intercept all 401 or 419 response codes
  // that can be returned by sanctum when session expires

  axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if ([401, 419].includes(error.response?.status as number)) {
        const { logout } = useAuth(useRouter())
        logout()
      } else {
        return Promise.reject(error)
      }
    }
  )

  await axiosClient.get('/sanctum/csrf-cookie', {
    baseURL: url
  })
  return axiosClient
}

async function getAxiosInstance(): Promise<AxiosInstance> {
  if (!initializedAxiosInstance) {
    initializedAxiosInstance = await initAxios()
  }
  return initializedAxiosInstance
}
export { getAxiosInstance }
