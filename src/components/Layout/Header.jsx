import React from 'react'
import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext'
import { logOutUser } from '../../services/supabaseClient';
import './Header.css'

export default function Header() {
    const { user, setUser } = useUser();
    const { email } = user;
    const history  = useHistory();

    const handleLogIn = () => {
        const redirecting = '/auth' ;
        history.replace(redirecting)
    }
    const handleLogOut = async () => {
        setUser()
        await logOutUser();
    }

    return (
        <header>
        <div>
         {email
          ? <main>
              <h1>Hello {email}</h1>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleLogOut} >Log out</button>
          </main>
          : <main>
              <h1>`Hello Friend`</h1>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={handleLogIn} >Log in</button>
            </main>}
        </div>
        <div></div>
        <div></div>
        </header>
    )
}


