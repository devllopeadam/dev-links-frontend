"use client";
import React, { createContext, useContext, useState } from "react";

export type Link = {
  url: string;
  name: string;
};

export type User = {
  id?: string | null;
  image?: string | null;
  firstName?: string | null;
  lastName?: string;
  email?: string | null;
}

interface IUserData {
  user?: User;
  links?: Link[];
}

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
  const [userData, setUserData] = useState<IUserData | null>(null);
  const values = { userData, setUserData };

  return (
    <userDataContext.Provider value={values}>
      {children}
    </userDataContext.Provider>
  )
}

export { UserDataProvider, useUserData };