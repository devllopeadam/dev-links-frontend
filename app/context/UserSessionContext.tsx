"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getCookies } from "../cookies";

interface IUserSession {
  jwt: string,
  userId: string,
}
interface IUserSessionContext {
  userSession: IUserSession,
  setUserSession: React.Dispatch<React.SetStateAction<IUserSession>>;
}

const userSessionContext = createContext<IUserSessionContext | undefined>(undefined);


const useUserSession = () => {
  const context = useContext(userSessionContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataContext");
  }
  return context;
}


const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userSession, setUserSession] = useState<IUserSession>({ jwt: "", userId: "" });
  const values = { userSession, setUserSession };

  useEffect(() => {
    getCookies().then((cookies) => {
      if (cookies && cookies.length >= 2) {
        setUserSession((prev) => ({
          ...prev,
          jwt: cookies[0]?.value || "",
          userId: cookies[1]?.value || "",
        }));
      }
    });
  }, []);

  return (
    <userSessionContext.Provider value={values}>
      {children}
    </userSessionContext.Provider>
  )
}

export { UserSessionProvider, useUserSession };