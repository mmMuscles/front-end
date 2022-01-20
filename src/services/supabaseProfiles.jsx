import { supabase } from "../../services/supabaseClient";

export async function getProfile(setLoading, setUsername, setGoal1, setGoal2, setGoal3, setWeight) {

    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, goal_1, goal_2, goal_3, weight`)
        .eq("email", user.email)
        .single();

      if (error && status === 406) {
        let newProfile = await supabase.from("profiles").insert({
          email: user.email,
          user_id: user.id,
        });
        data = newProfile.data;
      } else if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setGoal1(data.goal_1);
        setGoal2(data.goal_2);
        setGoal3(data.goal_3);
        setWeight(data.weight);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  export async function updateProfile({ setLoading, username, goal_1, goal_2, goal_3, weight }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        username,
        goal_1,
        goal_2,
        goal_3,
        weight,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .update(updates, {
          returning: "minimal", // Don't return the value after inserting
        })
        .match({
          email: user.email,
          user_id: user.id,
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }