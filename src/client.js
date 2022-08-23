import { createClient } from '@supabase/supabase-js'
const supabaseUrl =  "https://nslqarzweopecmdjcmlr.supabase.co"
const supabaseAnonKey =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zbHFhcnp3ZW9wZWNtZGpjbWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA1NTA4NTYsImV4cCI6MTk3NjEyNjg1Nn0.qYjm7I2YJvrn55HlcmjdjmMYpe_txl7bTKV9duHfZcs"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)