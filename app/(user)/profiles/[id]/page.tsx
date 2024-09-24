"use client"
import FinalPreview from "@/app/components/FinalPreview";
import useFetchUserData from "@/app/hooks/useFetchUserData";
import useProfileReady from "@/app/hooks/useProfileReady";

const ProfilePage = ({ params }: { params: { id: number } }) => {
  const { ready } = useProfileReady();

  const { isLoading } = useFetchUserData({ userId: params.id });
  return ready
    ? <FinalPreview isLoading={isLoading} />
    : "This Profile is not ready for sharing"
}

export default ProfilePage
