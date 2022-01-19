import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import Auth from "../Auth/Auth";
import Profile from "../Profile/Profile";

export default function Home() {
  return (
    <>
      <section>
        <h2>mmMuscles logo</h2>
        <p>The goal is to build an awesome and flexible fitness manager, </p>
        <p>along with a comprehensive and complete list of exercises.</p> 
        <p>Simple to view, simple to use, made by simple people for simple people.</p> 
        <p>Mmm, so great!</p>
        <span>weekly view</span><img alt='week_view' src='week_view.png' width='400' />
        <span>daily view</span><img alt='day_view' src='day_view.png' width='400'/>
        <div>login/sign up area</div>
      </section>
    </>
  );
}
