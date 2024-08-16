"use client"
import React from "react";
import Header from "../components/Header";
import { UserDataProvider } from "../context/UserDataContext";
import { UserSessionProvider } from "../context/UserSessionContext";


export const isActive = (label: string, pathname: string) => label === pathname.slice(1);

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 sm:p-6 bg-[#fafafa] w-full min-h-screen grid lg:grid-cols-[1.5fr_2fr] grid-cols-1 grid-rows-[80px_1fr]  lg:gap-6 gap-y-4 sm:gap-y-6">
      <Header />
      <UserSessionProvider>
        <UserDataProvider>
          {children}
        </UserDataProvider>
      </UserSessionProvider>
    </div>
  );
};

export default UserLayout;