import { createContext, useContext, useMemo, useState } from 'react';
import { supabase } from '../services/supabaseClient';
const UserContext = createContext();

const UserProvider = ({ children }) => {

  // const [session, setSession] = useState(null)
  // const currentUser = getUser();
  const session = supabase.auth.session()

  const [user, setUser] = useState(
    session ? { id: session.user.id, email: session.user.email } : {}
  );
  console.log(session)


  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUser };
