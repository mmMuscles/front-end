import React from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'
import { logOutUser } from '../../services/supabaseClient';
import './Header.css'

export default function Header() {
    const { user, setUser, profile } = useUser();
    const { email } = user;
    
    const handleLogOut = async () => {
        setUser({ email:'', id:''})
        await logOutUser();
    }

    return (
        <header className='text-slate-400 font-bold items-center justify-items-center'>
            <div hidden><Link to='/' className='' >Home</Link></div>
            <div><Link to='/profile' className=''>profile</Link></div>
            {profile.username 
            ? <div><Link to='/calendar' className=''>calendar</Link></div>
            : <div>calendar</div>
            }
            
        <div>
         {email
          ? <main className='flex items-center'>
              <h1 className='text-gray-600'>Hello, {profile.username}</h1>
                <button className='bg-gray-300 hover:bg-blue-700 text-white font-bold py-1 px-4 mx-6 rounded w-24'
                onClick={handleLogOut} >Log out</button>
          </main>
          : <main>
              <h1>Hello, Friend</h1>
            </main>}
        </div>
        </header>
    )
}


