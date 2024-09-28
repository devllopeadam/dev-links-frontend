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

const HeaderProfiles = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userData } = useUserData();
  const { ready } = useProfileReady()
  const [logged, setLogged] = useState(false);


  useEffect(() => {
    isAuthenticated().then(x => setLogged(x));
  }, [])

  const hanldeSharingButton = useCallback(() => {
    if (ready) {
      window.open(`profiles/${userData?.user.id}`, "_blank");
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
          ? <Link href={"/links"}>
            <Image src="/images/logo-devlinks-large.svg" width={145} height={50} alt="Dev Links Logo" className="hidden sm:block md:w-[145px] w-[135px]" />
            <Image src="/images/logo-devlinks-small.svg" width={35} height={50} alt="Dev Links Logo" className="sm:hidden block" />
          </Link>
          : <Button onClick={() => router.back()} size={"lg"} variant={'outline'} className="px-4 max-sm:text-[14px] sm:px-6 h-11 rounded-lg">Back to Editor</Button>
      }
      <div className="flex gap-2 sm:gap-4 items-center">
        {logged
          ? <Button onClick={() => {
            logout();
            router.push("/login");
          }} size={"lg"} variant={'outline'} className="px-4 md:px-4 h-11 rounded-lg flex items-center gap-2">
            <IconLogout className=" w-[21px] h-[20px] fill-current" />
            <span className="sm:block hidden">Logout</span>
          </Button>
          : <>
            <Link href={"/login"}>
              <Button size={"lg"} variant={'outline'} className="px-4 h-11 rounded-lg hidden sm:block">
                <span className="sm:block ">Login</span>
              </Button>
              <Button size={"sm"} variant={'outline'} className="px-4 h-11 rounded-lg sm:hidden block">
                <span className="sm:block ">Login</span>
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button size={"lg"} className="px-4 h-11 rounded-lg items-center gap-2 hidden sm:flex">
                <span className="sm:block ">Register</span>
              </Button>
              <Button size={"sm"} className="px-4 h-11 rounded-lg sm:hidden block">
                <span className="sm:block ">Register</span>
              </Button>
            </Link>
          </>}
      </div>
    </header>
  )
}

export default HeaderProfiles
