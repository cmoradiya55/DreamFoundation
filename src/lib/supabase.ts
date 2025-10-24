import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations with elevated permissions
// export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false
//   }
// })

// Database types
export interface EventUser {
  id?: number
  full_name: string
  date_of_birth: string
  mobile: string
  mobile_country_code: string
  email: string
  address: string
  aadhar_number: string
  registration_id: string
  created_at?: string
  updated_at?: string
}

export interface EventChild {
  id?: number
  event_user_id: number
  child_name: string
  father_name: string
  mother_name: string
  child_aadhar: string
  child_date_of_birth: string
  education_standard: string
  created_at?: string
  updated_at?: string
}

export interface AdmissionUser {
  id?: number
  full_name: string
  date_of_birth: string
  mobile: string
  mobile_country_code: string
  email: string
  address: string
  aadhar_number: string
  registration_id: string
  created_at?: string
  updated_at?: string
}

export interface AdmissionChild {
  id?: number
  admission_user_id: number
  child_name: string
  father_name: string
  mother_name: string
  child_aadhar: string
  child_date_of_birth: string
  education_standard: string
  created_at?: string
  updated_at?: string
}
