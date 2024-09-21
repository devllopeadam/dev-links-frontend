"use client"
import FinalPreview from "@/app/components/FinalPreview"
import useFetchUserData from "@/app/hooks/useFetchUserData"

const page = () => {
  const { isLoading } = useFetchUserData();
  return (
    <div className="">
      <FinalPreview isLoading={isLoading} />
    </div>
  )
}

export default page
