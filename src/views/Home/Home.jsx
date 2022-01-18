import { useState, useEffect } from 'react'
import { supabase } from '../../services/supabaseClient'
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
