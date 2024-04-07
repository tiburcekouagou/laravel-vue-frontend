import { getAxiosInstance } from '@/axios'
import type { LoginPayload, RegisterPayload } from '@/types'
import { toValue } from 'vue'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const router = useRouter()
  // user
  // name -> string
  // email -> string
  // created_at -> Date
  // updated_at -> Date
  // login

  async function login(form: LoginPayload) {
    form = toValue(form)
    const axiosClient = await getAxiosInstance()
    await axiosClient.post('/login', form)
    router.replace({ name: 'me' })
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
    logout
  }
}
