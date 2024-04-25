import { createClient } from '@supabase/supabase-js'

const URL = 'https://lnrgbfjzpxpilofnpqdg.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxucmdiZmp6cHhwaWxvZm5wcWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MDEyMDMsImV4cCI6MjAyOTM3NzIwM30.mLzGiZFseqLplC_c_e0-DdMx_gs89ThkVBOoQOKuxFw'

export const supabase = createClient(URL, API_KEY);