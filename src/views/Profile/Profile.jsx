import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { supabase } from "../../services/supabaseClient";
import "./Profile.css";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [goal_1, setGoal1] = useState(null);
  const [goal_2, setGoal2] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weight_goal, setWeightGoal] = useState(null);
  const { user, setProfile } = useUser();

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, goal_1, goal_2, weight, weight_goal`)
          .eq("email", user.email)
          .single();

        if (error && status === 406) {
          const newProfile = await supabase.from("profiles").insert({
            email: user.email,
            user_id: user.id,
          });
          data = newProfile.data;
        } else if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setProfile({ username: data.username });
          setUsername(data.username);
          setGoal1(data.goal_1);
          setGoal2(data.goal_2);
          setWeight(data.weight);
          setWeightGoal(data.weight_goal);
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, [user.email, user.id, setProfile]);

  async function updateProfile(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        username,
        goal_1,
        goal_2,
        weight,
        weight_goal,
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
    setProfile({ username: username });
  }

  return (
    <main className="profile-back h-screen flex flex-col">
      <form
        className="flex flex-col w-1/2 ml-96 mt-14 space-y-2 text-slate-500"
        onSubmit={(e) => updateProfile(e)}
      >
        <section>
          <label htmlFor="username">Name </label>
          <input
            required
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
          <label htmlFor="weight">Weight </label>
          <input
            id="weight"
            type="weight"
            value={weight || ""}
            onChange={(e) => setWeight(e.target.value)}
          />
        </section>

        <section>
          <label htmlFor="weight_goal">Weight goal </label>
          <input
            id="weight_goal"
            type="weight_goal"
            value={weight_goal || ""}
            onChange={(e) => setWeightGoal(e.target.value)}
          />
        </section>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mx-6 rounded w-24"
          disabled={loading}
        >
          {loading ? "updating" : "Update"}
        </button>
      </form>
    </main>
  );
}
