'use client'
import IconLinksHeader from "@/public/images/icon-links-header.svg";
import IconLogout from "@/public/images/icon-logout.svg";
import IconProfileDetails from "@/public/images/icon-profile-details-header.svg";
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserData } from "../context/UserDataContext";
import { isAuthenticated, logout } from "../cookies";
import useProfileReady from "../hooks/useProfileReady";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const HeaderPreview = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userData } = useUserData();
  const { ready } = useProfileReady();

  const hanldeSharingButton = useCallback(() => {
    if (ready) {
      const baseUrl = window.location.origin;
      const profileUrl = `${baseUrl}/profiles/${userData?.user.id}`;

      navigator.clipboard.writeText(profileUrl);
      toast.success('Link Copied to clip board', {
        position: "top-center",
        duration: 2000,
        icon: "📕",
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
          textAlign: "center",
        },
      });
    } else {
      toast.error('fill out your necessary info and at least one link', {
        position: "top-center",
        duration: 2000,
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
          textAlign: "center",
        },
      });
    }
  }, [ready])

  return (
    <header className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm col-span-2 relative z-10">
      {
        pathname.includes("profiles")
          ? <Link href={"/"}>
            <Image src="/images/logo-devlinks-large.svg" width={145} height={50} alt="Dev Links Logo" className="hidden sm:block md:w-[145px] w-[135px]" />
            <Image src="/images/logo-devlinks-small.svg" width={35} height={50} alt="Dev Links Logo" className="sm:hidden block" />
          </Link>
          : <Button onClick={() => router.back()} size={"lg"} variant={'outline'} className="px-4 max-sm:text-[14px] sm:px-6 h-11 rounded-lg">Back to Editor</Button>
      }
      <div className="flex gap-2 sm:gap-4 items-center">
        <Button onClick={hanldeSharingButton}
          size={"lg"}
          className="px-4 max-sm:text-[14px] sm:px-6 h-11 rounded-lg">Share Link</Button>
        <Button onClick={() => {
          logout();
          router.push("/login");
        }} size={"lg"} variant={'outline'} className="px-4 md:px-4 h-11 rounded-lg flex items-center gap-2">
          <IconLogout className=" w-[21px] h-[20px] fill-current" />
          <span className="sm:block hidden">Logout</span>
        </Button>
      </div>
    </header>
  )
}

export default HeaderPreview
