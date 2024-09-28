'use client'
import IconLinksHeader from "@/public/images/icon-links-header.svg";
import IconLogout from "@/public/images/icon-logout.svg";
import IconPreview from "@/public/images/icon-preview-header.svg";
import IconProfileDetails from "@/public/images/icon-profile-details-header.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useUserData } from "../context/UserDataContext";
import { logout } from "../cookies";
import useProfileReady from "../hooks/useProfileReady";
import { Button } from "./ui/button";
import { isActive } from "../(user)/layout";


const centerHeaderLinks = [
  { label: "Links", href: "/links", icon: IconLinksHeader },
  { label: "Profile Details", href: "/profile", icon: IconProfileDetails }
]

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm col-span-2 relative z-10">
      <Link href={"/links"}>
        <Image src="/images/logo-devlinks-large.svg" width={145} height={50} alt="Dev Links Logo" className="hidden sm:block md:w-[145px] w-[135px]" />
        <Image src="/images/logo-devlinks-small.svg" width={35} height={50} alt="Dev Links Logo" className="sm:hidden block" />
      </Link>
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
      <div className="flex gap-4 items-center">
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
      </div>
    </header >
  )
}

export default Header
