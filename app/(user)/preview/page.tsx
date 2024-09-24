"use client"
import FinalPreview from "@/app/components/FinalPreview"
import { useUserSession } from "@/app/context/UserSessionContext"
import useFetchUserData from "@/app/hooks/useFetchUserData"

const page = () => {
  const { userSession } = useUserSession()
  const { isLoading } = useFetchUserData({ userId: Number(userSession?.userId) });
  return <FinalPreview isLoading={isLoading} />
}

export default page
