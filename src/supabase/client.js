import {createClient} from '@supabase/supabase-js';

const supabaseUrl= 'https://fseeshmepnlxljczdjem.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseJwt= import.meta.env.VITE_SUPABASE_JWT;
const supabase = createClient(supabaseUrl, supabaseKey, supabaseJwt)

export default supabase;