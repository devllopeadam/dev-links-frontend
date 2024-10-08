"use client"
import React from "react";
import Header from "../components/Header";
import { usePathname } from 'next/navigation';
import HeaderPreview from "../components/HeaderPreview";
import HeaderProfiles from "../components/HeaderProfiles";
const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className={`relative 2xl:max-w-[1600px] mx-auto p-4 sm:p-6 ${pathname !== "/preview" && "bg-[#fafafa] lg:grid-cols-[1.5fr_2fr]"} w-full min-h-screen grid grid-rows-[80px_1fr] grid-cols-1 lg:gap-6 gap-y-4 sm:gap-y-6`}>
      {(pathname === "/preview" || pathname.includes("profiles")) && (
        <div className="absolute top-0 left-0 bg-accent-purple w-full h-[330px] rounded-b-[35px]" />
      )}
      {
        (pathname !== "/preview" && !pathname.includes("profiles")) ? <Header /> : !pathname.includes("profiles") ? <HeaderPreview /> : <HeaderProfiles />
      } 
      {children}
    </div>
  );
};

export default UserLayout;