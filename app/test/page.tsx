"use client"
import Image from "next/image";
import { useUserSession } from "../context/UserSessionContext";
import { useEffect, useMemo } from "react";
import { Session } from "inspector";
import { useSession } from "next-auth/react";

export default function Test() {
  const { data: session, status } = useSession();
  const { userSession, setUserSession } = useUserSession();

  useEffect(() => {
    if (status === "authenticated" && session) setUserSession(session);
  }, [session, status, setUserSession]);


  return (
    <>
      <Image src={userSession?.user?.image!} alt="image profile" width={50} height={50} />
      <h1 className="text-3xl">{userSession?.user?.name}</h1>
      <h1 className="text-3xl">{userSession?.user?.email}</h1>
    </>
  )
}