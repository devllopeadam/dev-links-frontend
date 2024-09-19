"use client"
import React from "react";
import Header from "../components/Header";
export const isActive = (label: string, pathname: string) => label === pathname.slice(1);

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="2xl:max-w-[1600px] mx-auto p-4 sm:p-6 bg-[#fafafa] w-full min-h-screen grid lg:grid-cols-[1.5fr_2fr] grid-cols-1 grid-rows-[80px_1fr]  lg:gap-6 gap-y-4 sm:gap-y-6">
      <Header />
      {children}
    </div>
  );
};

export default UserLayout;