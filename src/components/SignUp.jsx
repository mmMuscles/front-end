import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { signUpUser } from '../services/supabaseClient';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ history ] = useHistory()
    const [isLoading, setLoading ] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault();
            try {
                setLoading(true)
                await signUpUser(email, password);
                setLoading(false)
                const redirecting = '/calendar' ;
                history.replace(redirecting)
            } catch (error) {
              throw error;
            }
          };
    

    return (
        <>
        <form>
            <fieldset>
                <legend>Sign-up</legend>
          <label htmlFor='email'>Email:</label>
          <input
            className="inputField"
            type="email"
            id='email'
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password:</label>
           <input
            className="inputField"
            type="password"
            id='password'
            minLength={8}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type='submit' onClick={handleSignup}>SignUp!</button>
          </fieldset>
        </form>
        {isLoading ? <h1>....Loading</h1> : null}
        </>
    )
}
