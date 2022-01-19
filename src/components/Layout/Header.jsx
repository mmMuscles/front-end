import React from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'
import { logOutUser } from '../../services/supabaseClient';
import './Header.css'

export default function Header() {
    const { user, setUser } = useUser();
    const { email } = user;
    
    const handleLogOut = async () => {
        setUser({ email:'', id:''})
        await logOutUser();
    }

    return (
        <header className='bg-slate-600 w-screen '>
            <div ><Link className='bg-gray-300 rounded p-5 my-3' to='/'>Home</Link></div>
            <div><Link className='bg-gray-300 rounded p-5 my-3' to='/profile'>Profile</Link></div>
            <div><Link className='bg-gray-300 rounded p-5 my-15' to='/calendar'>Calendar</Link></div>
            
        <div>
         {email
          ? <main className='flex'>
              <h1 className='text-white'>Hello, {email}</h1>
                <button className='bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-22 border-4'
                onClick={handleLogOut} >Log out</button>
          </main>
          : <main>
              <h1>Hello, Friend</h1>
              
            </main>}
        </div>
        </header>
    )
}


