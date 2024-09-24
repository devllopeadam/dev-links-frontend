'use client'
import Image from "next/image";
import Link from "next/link";
import IconLinksHeader from "@/public/images/icon-links-header.svg";
import IconProfileDetails from "@/public/images/icon-profile-details-header.svg";
import IconPreview from "@/public/images/icon-preview-header.svg";
import IconLogout from "@/public/images/icon-logout.svg";
import { usePathname } from 'next/navigation'
import { Button } from "./ui/button";
import { isActive } from "../(user)/layout";
import { isAuthenticated, logout } from "../cookies";
import { useRouter } from "next/navigation";
import { useUserSession } from "../context/UserSessionContext";
import { useUserData } from "../context/UserDataContext";
import toast from "react-hot-toast";
import useProfileReady from "../hooks/useProfileReady";
import { useCallback, useEffect, useState } from "react";


const centerHeaderLinks = [
  { label: "Links", href: "/links", icon: IconLinksHeader },
  { label: "Profile Details", href: "/profile", icon: IconProfileDetails }
]


const Header = () => {
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
      router.push(`profiles/${userData?.user.id}`);
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
        pathname !== "/preview"
          ? <Link href={"/links"}>
            <Image src="/images/logo-devlinks-large.svg" width={145} height={50} alt="Dev Links Logo" className="hidden sm:block md:w-[145px] w-[135px]" />
            <Image src="/images/logo-devlinks-small.svg" width={35} height={50} alt="Dev Links Logo" className="sm:hidden block" />
          </Link>
          : <Button onClick={() => router.back()} size={"lg"} variant={'outline'} className="px-4 max-sm:text-[14px] sm:px-6 h-11 rounded-lg">Back to Editor</Button>
      }
      {
        pathname !== "/preview" && logged &&
        <div className="flex items-center">
          {
            centerHeaderLinks.map((link, i) => {
              return <Link key={i} href={link.href} className="font-semibold group">
                {
                  isActive(link.href.slice(1), pathname)
                    ? <Button size={"lg"} className="flex items-center gap-1 justify-center px-4 md:px-4 rounded-lg transition-all duration-300" variant={'secondary'}>
                      <link.icon className="fill-current" />
                      <span className="sm:block hidden">{link.label}</span>
                    </Button>
                    : <p className="flex items-center gap-1 justify-center text-accent-gray px-4 md:px-4 group-hover:text-accent-purple transition-all duration-300">
                      <link.icon className="fill-current" />
                      <span className="sm:block hidden">{link.label}</span>
                    </p>
                }
              </Link>
            })
          }
        </div>
      }
      <div className="flex gap-4 items-center">
        {
          pathname !== "/preview"
            ? logged
              ? <>
                <Link href={"/preview"}>
                  <Button size={"lg"} variant={'outline'} className="max-sm:px-3 px-4 md:px-4 h-11 rounded-lg">
                    <IconPreview className="sm:hidden block" />
                    <span className="sm:block hidden">Preview</span>
                  </Button>
                </Link>
                <Button onClick={() => {
                  logout();
                  router.push("/login");
                }} size={"lg"} className="max-sm:px-3 px-4 md:px-4 h-11 rounded-lg flex items-center gap-2">
                  <IconLogout className=" w-[21px] h-[20px] fill-current" />
                  <span className="sm:block hidden">Logout</span>
                </Button>
              </>
              : <>
                <Link href={"/login"}>
                  <Button size={"sm"} variant={'outline'} className="px-4 md:px-4 h-11 rounded-lg">
                    <span className="sm:block ">Login</span>
                  </Button>
                </Link>                
                <Link href={"/register"}>
                  <Button size={"sm"} className="px-4 md:px-4 h-11 rounded-lg flex items-center gap-2">
                    <span className="sm:block ">Register</span>
                  </Button>
                </Link>
              </>
            : <>
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
            </>
        }
      </div>
    </header >
  )
}

export default Header
