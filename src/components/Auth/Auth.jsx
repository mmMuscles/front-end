import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { logOutUser } from '../../services/supabaseClient';
import Login from '../Login';
import SignUp from '../SignUp';
import './Auth.css'


export default function Auth() {
  const { user, setUser } = useUser();
  const [ newUser, setNewUser ] = useState(true)

 const handleStatus = () => {
    setNewUser(!newUser)
 }
 

 const handleLogOut = async () => {
    setUser({ email:'', id:''})
    await logOutUser();
}
const authForm = (
    newUser
        ? <div><Login className='form' /> <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-15' onClick={handleStatus}>Need to Sign Up?</button>
        </div>
        : <div><SignUp className='form' />  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded m-15' onClick={handleStatus}>Need to Login?</button>
        </div>
)

  return (
   <>
   <div className='footie'>
    {user.email ? <main>
              <h1>Hello, {user.email}</h1>
                <button className='bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-22 border-4'
                onClick={handleLogOut} >Log out</button>
          </main>: authForm}
   </div>
   </>
  )
}
