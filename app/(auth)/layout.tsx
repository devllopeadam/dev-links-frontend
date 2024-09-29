"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { isAuthenticated } from "../cookies";


export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await isAuthenticated();
  useEffect(() => {
    if (isAuth) {
      setTimeout(() => {
        window.location.href = "/links";
      }, 1000);
    }
  }, [isAuth]);
  return (
    <main className="bg-[#fafafa] flex items-center flex-col gap-10 w-full min-h-screen">
      <Link href={"/links"}>
        <Image src="/images/logo-devlinks-large.svg" width={185} height={50} alt="Dev Links Logo" className="mt-12" />
      </Link>
      {children}
    </main>
  );
}