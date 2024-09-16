'use client'
import PhoneReview from "@/app/components/PhoneReview";
import ProfileDetailsForm from "@/app/components/ProfileDetailsForm";
import { useUserData } from "@/app/context/UserDataContext";
import { useEffect } from "react";
import axiosInstance from "@/app/config/axios.config";
import { useUserSession } from "@/app/context/UserSessionContext";

const Profile = () => {
  const { setUserData } = useUserData();
  const { userSession } = useUserSession();

  useEffect(() => {
    userSession.userId && axiosInstance.get(`/users/${userSession.userId}?populate=*`).then((response) => {
      const { data, status } = response;
      if (status === 200) {
        setUserData(prev => ({
          ...prev,
          user: {
            ...prev!.user, // Access user directly since it's required
            image: data?.imageUrl ? `http://localhost:1337${data.imageUrl}` : prev!.user.image,
            firstName: data?.firstName ?? prev!.user.firstName,
            lastName: data?.lastName ?? prev!.user.lastName,
            email: data?.email ?? prev!.user.email,
            id: data?.id ?? prev!.user.id,
          },
          links: prev!.links
        }));
      }
    })
  }, [userSession.userId]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm lg:flex hidden items-center justify-center py-14">
        <PhoneReview />
      </div>
      <ProfileDetailsForm />
    </>
  )
};

export default Profile;