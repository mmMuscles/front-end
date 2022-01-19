import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
export const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signInUser(email, password) {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    return user;
  }

export async function signUpUser(email, password) {
    const { user, error} = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return user;
  }
  export function getUser() {
    return supabase.auth.user();
  }

  export async function logOutUser() {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
    return alert('You have logged out');

  }
