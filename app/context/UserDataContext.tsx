"use client";
import React, { createContext, useContext, useState } from "react";
import { IUserData } from "../interfaces";

interface IUserDataContext {
  userData: IUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<IUserData | null>>;
}

const userDataContext = createContext<IUserDataContext | undefined>(undefined);

const useUserData = () => {
  const context = useContext(userDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataContext");
  }
  return context;
}

const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<IUserData | null>({
    user: {
      id: "",
      image: "",
      firstName: "",
      lastName: "",
      email: ""
    }, links: []
  });
  const values = { userData, setUserData };

  return (
    <userDataContext.Provider value={values}>
      {children}
    </userDataContext.Provider>
  )
}

export { UserDataProvider, useUserData };