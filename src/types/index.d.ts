export interface AppUser {
  id: number
  name: string
  email: string
  email_verified_at: null
  created_at: Date
  updated_at: Date
  two_factor_secret: null | string
  two_factor_recovery_codes: null | string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}
