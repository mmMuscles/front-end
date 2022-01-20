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

  export async function addWorkout({ theme, user_id, date, workouts  }) {
    const request = await supabase.from('day').insert([{ theme, user_id, date, workouts  }]);
    console.log(request.data)
    return request.data;
  }

  export const deleteWorkout = async (id) => {
    const request = await supabase.from('day')
    .delete()
    .match({ workouts: id })
    .execute();

    return request.data;
  }

  export async function addAdditionalWorkout({  user_id, date, workouts, workout_id })
  {
    const request = await supabase.from('day').update([...workouts, workout_id], {
      returning: "minimal",})
      .match({
      date: date,
      user_id: user_id,
    })
    console.log(request.data)
    return request.data;
  }
  
  export const getWorkoutArray = async (currentDate, id) => {
      const request = await supabase
      .from('day')
      .select('workouts')
      .match({
              date: currentDate,
              user_id: id,
            })
      console.log(request.data)
      return request.data;

  }
  // export async function addWorkouts({ workout_name, workout_description, workout_category, workout_id  }) {
  //   const request = await supabase.from('workouts').insert([{ workout_name, workout_description, workout_category, workout_id  }]);
  //   return request;
  // }
