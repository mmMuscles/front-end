import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children, mockUser }) => {
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState(
    mockUser ? { id: mockUser.id, email: mockUser.email } : {}
  );

  const value = useMemo(
    () => ({ user, setUser, profile, setProfile }),
    [user, profile]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
