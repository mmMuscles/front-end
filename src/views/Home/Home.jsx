import { useState, useEffect } from 'react'
<<<<<<< HEAD
import Account from '../../Components/Account'
import { supabase } from '../../Services/supabaseClient'
=======
import { supabase } from '../../services/supabaseClient'
>>>>>>> b7e6647c6d8b98a0632baf806ddd9dc3c0766087
import Auth from '../Auth/Auth'
import Profile from '../Profile/Profile'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Profile key={session.user.id} session={session} />}
    </div>
  )
}
