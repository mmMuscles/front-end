import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { signUpUser } from '../services/supabaseClient';

export default function SignUp() {
    const [userEmail, setEmail] = useState('');
    const { setUser } = useUser({id:'', email:''});
    const [password, setPassword] = useState('');
    const [isLoading, setLoading ] = useState(false);
    const history = useHistory();

    const handleSignup = async (e) => {
        e.preventDefault();
            try {
                setLoading(true);
                const auth = await signUpUser(userEmail, password);
                await setUser({id:auth.id, email: auth.email})
                setLoading(false);
                const redirecting = '/profile' ;
                history.replace(redirecting)
            } catch (error) {
              throw error;
            }
          };
    
    return (
        <>
        <form className='flex px-6 mx-6'>
            <fieldset>
                {/* <legend>Sign-up</legend> */}
          <label htmlFor='email'>email </label>
          <input
            className="text-black rounded-sm opacity-70 my-1 mr-6 pl-1"
            type="email"
            id='email'
            placeholder="Your email"
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>password </label>
           <input
            className="text-black rounded-sm opacity-70 my-1 pl-1"
            type="password"
            id='password'
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 mx-6 rounded'
          type='submit' onClick={handleSignup}>SignUp!</button>
          </fieldset>
        </form>
        {isLoading ? <h1>....Loading</h1> : null}
        </>
    )
}
