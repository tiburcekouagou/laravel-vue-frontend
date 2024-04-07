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
