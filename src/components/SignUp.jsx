import React, { useState } from 'react'
import { useUser } from '../context/UserContext';
import { signUpUser } from '../services/supabaseClient';

export default function SignUp() {
    const [userEmail, setEmail] = useState('');
    const { setUser } = useUser({id:'', email:''});
    const [password, setPassword] = useState('');
    const [isLoading, setLoading ] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault();
            try {
                setLoading(true);
                const auth = await signUpUser(userEmail, password);
                await setUser({id:auth.id, email: auth.email})
                setLoading(false);
                alert('please check your email to verify your account')
            } catch (error) {
              throw error;
            }
          };
    
    return (
        <>
        <form className='flex px-6 mx-6'>
            <fieldset>
                <legend>Sign-up</legend>
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
          <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-6 rounded'
          type='submit' onClick={handleSignup}>SignUp!</button>
          </fieldset>
        </form>
        {isLoading ? <h1>....Loading</h1> : null}
        </>
    )
}
