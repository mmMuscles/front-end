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

  export async function addWorkout({ theme, user_id, date, workout_id  }) {
    const request = await supabase.from('day').insert([{ theme, user_id, date, workout_id  }]);
    return request;
  }




  export const getWorkoutArray = async (currentDate, id) => {
      const request = await supabase.from('day').select('workouts').eq('date', currentDate)
      console.log(currentDate)

      console.log(request)
      return request;

  }
  // export async function addWorkouts({ workout_name, workout_description, workout_category, workout_id  }) {
  //   const request = await supabase.from('workouts').insert([{ workout_name, workout_description, workout_category, workout_id  }]);
  //   return request;
  // }
