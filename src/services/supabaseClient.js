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
  export async function getUser() {
    return supabase.auth.user();
  }

  export async function logOutUser() {
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
    return alert('You have logged out');
  }

  export async function addWorkout({  user_id, date, workouts  }) {
    const request = await supabase.from('day').insert([{ user_id, date, workouts  }]);
    console.log(request.data)
    return request.data;
  }

  export const getWorkoutArray = async (currentDate, id) => {
      try { const request = await supabase
      .from('day')
      .select('workouts')
      .match({
              date: currentDate, 
              user_id: id,
            })
      console.log(request.data)
      return request.data}
      catch {
        return []
        }
  }
