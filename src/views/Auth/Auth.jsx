import { useState } from 'react';
import Login from '../../components/Login';
import SignUp from '../../components/SignUp';
import { useUser } from '../../context/UserContext';
import { logOutUser } from '../../services/supabaseClient';
import './Auth.css'


export default function Auth() {
  const { user, setUser } = useUser();
  const [ newUser, setNewUser ] = useState(true)

 const handleStatus = () => {
    setNewUser(!newUser)
 }
 const logout = async() => {
    await logOutUser();
    setUser('')
 }

const authForm = (
    newUser
        ? <div><Login className='form' /> <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleStatus}>Need to Sign Up?</button>
        </div>
        : <div><SignUp className='form' />  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleStatus}>Need to Login?</button>
        </div>
)

  return (
   <>
   
   <div className='flex-col'>
    {user.email ? <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>: authForm}
   </div>
   </>
  )
}
