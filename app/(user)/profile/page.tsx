'use client'
import PhoneReview from "@/app/components/PhoneReview";
import ProfileDetailsForm from "@/app/components/ProfileDetailsForm";
import useFetchUserData from "@/app/hooks/useFetchUserData";

const Profile = () => {
  const { isLoading } = useFetchUserData();

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm lg:flex hidden items-center justify-center py-14">
        {
          !isLoading ?
            <PhoneReview />
            : <div className="animate-pulse">
              <div className="w-[308px] h-[632px] bg-gray-200 rounded-[35px]"></div>
            </div>
        }
      </div>
      <ProfileDetailsForm isLoading={isLoading} />
    </>
  )
};

export default Profile;