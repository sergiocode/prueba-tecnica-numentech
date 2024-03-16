'use client'
import { createContext, useState, useContext } from 'react';

interface User {
  id: string | null;
  username: string | null;
}

interface SessionContextType {
  session: User;
  setSession: (user: User) => void;
}

const initialUser: User = { id: null, username: null };
const SessionContext = createContext<SessionContextType>({
  session: initialUser,
  setSession: () => {},
});


export default function SessionProvider({ children }: { children: React.ReactNode }) {
  let [session, setSession] = useState(initialUser);
  
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionHook = (): SessionContextType => useContext(SessionContext);