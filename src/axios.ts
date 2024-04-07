import axios, { type AxiosInstance } from 'axios'

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
