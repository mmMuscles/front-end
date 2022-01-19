import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { signInUser } from '../services/supabaseClient';

export default function Login() {
    const [userEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history  = useHistory();
    const [isLoading, setLoading ] = useState(false);
    const { setUser } = useUser({id:'', email:''});

    const handleSignIn = async (e) => {
        e.preventDefault();
            try {
                setLoading(true);
                const auth = await signInUser(userEmail, password);
                await setUser({id:auth.id, email: auth.email})
                setLoading(false);
                const redirecting = '/calendar' ;
                history.replace(redirecting)
            } catch (error) {
              throw error;
            }
          };
    

    return (
        <>
          {isLoading ? <h1>....Loading</h1> : null}
        <form className='flex px-6 mx-6'>
            <fieldset>
                <legend>Sign-in</legend>
          <label htmlFor='email'>Email:</label>
          <input
            className="text-black"
            type="email"
            id='email'
            placeholder="Your email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password:</label>
           <input
            className="text-black"
            type="password"
            id='password'
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-6 rounded'
          type='submit' 
          onClick={handleSignIn}>SignIn!</button>
          </fieldset>
        </form>
        </>
    )
}
