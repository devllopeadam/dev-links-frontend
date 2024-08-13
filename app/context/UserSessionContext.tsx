"use client"
import { Session } from "next-auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserSessionContextType {
  userSession: Session | null;
  setUserSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const userSessionContext = createContext<UserSessionContextType | undefined>(undefined);

const useUserSession = () => {
  const context = useContext(userSessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
};

const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userSession, setUserSession] = useState<Session | null>(null);

  const values = { userSession, setUserSession };

  return (
    <userSessionContext.Provider value={values}>
      {children}
    </userSessionContext.Provider>
  )
}



export { UserSessionProvider, useUserSession };