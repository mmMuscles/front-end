import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import './Profile.css'

export default function Profile({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [goal_1, setGoal1] = useState(null);
  const [goal_2, setGoal2] = useState(null);
  const [goal_3, setGoal3] = useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
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

  async function updateProfile({ username, goal_1, goal_2, goal_3, weight }) {
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

  return (
    <main className='profile-back h-screen flex flex-col'>
    <div className='flex flex-col w-1/2 ml-96 mt-14 space-y-2 text-slate-500'>

      <section>
        <label htmlFor="username">Name </label>
        <input 
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </section>

      <section>
        <label htmlFor="goal_1">Primary Goal </label>
        <input
          id="goal_1"
          type="goal_1"
          value={goal_1 || ""}
          onChange={(e) => setGoal1(e.target.value)}
        />
      </section>

      <section>
        <label htmlFor="goal_2">Secondary Goal </label>
        <input
          id="goal_2"
          type="goal_2"
          value={goal_2 || ""}
          onChange={(e) => setGoal2(e.target.value)}
        />
      </section>

      <section>
        <label htmlFor="goal_3">Other Goals </label>
        <input
          id="goal_3"
          type="goal_3"
          value={goal_3 || ""}
          onChange={(e) => setGoal3(e.target.value)}
        />
      </section>

      <section>
        <label htmlFor="weight">Weight </label>
        <input
          id="weight"
          type="weight"
          value={weight || ""}
          onChange={(e) => setWeight(e.target.value)}
        />
      </section>

        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mx-6 rounded w-24'
          onClick={() => updateProfile({ username, goal_1, goal_2, goal_3, weight })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>

      {/* <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div> */}
    </div>
    </main>
  );
}
