import { getAxiosInstance } from '@/axios'
import type { AppUser, LoginPayload, RegisterPayload } from '@/types'
import type { AxiosError } from 'axios'
import { ref, toValue } from 'vue'
import { useRouter } from 'vue-router'

const user = ref<AppUser | null>(null)
const router = useRouter()

export const useAuth = () => {

  async function getUser(): Promise<AppUser | null> {
    if (user.value) return user.value
    try {
      const axiosClient = await getAxiosInstance()
      const res = await axiosClient.get('/user')
      const user = res.data

      return {
        ...user
      }
    } catch (err: any) {
      return null
    }
  }

  async function initUser() {
    user.value = await getUser()
    console.log("from db", user.value)
  }

  async function login(form: LoginPayload) {
    form = toValue(form)
    const axiosClient = await getAxiosInstance()
    await axiosClient.post('/login', form)
    router.push({ name: 'me' })
  }
  // logout
  async function logout() {
    const axiosClient = await getAxiosInstance()
    await axiosClient.post('/logout')
    router.replace({ name: 'login' })
  }
  // register

  async function register(payload: RegisterPayload) {
    payload = toValue(payload)
    const axiosClient = await getAxiosInstance()
    const res = await axiosClient.post('/register', payload)
    console.log(res)
    await axiosClient.post('/login', {
      email: payload.email,
      passowrd: payload.password
    })
    router.replace({ name: 'me' })
  }
  return {
    login,
    register,
    logout,
    initUser,
    user
  }
}
