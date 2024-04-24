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

export interface Link {
  id: number;
  short_link: string
  full_link: string
  views: number
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface ErrorResponse {
  message: string
  errors: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string | null
  from: number
  last_page: number
  last_page_url: string | null
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
