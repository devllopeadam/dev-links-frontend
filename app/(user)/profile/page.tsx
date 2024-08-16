'use client'
import PhoneReview from "@/app/components/PhoneReview";
import ProfileDetailsForm from "@/app/components/ProfileDetailsForm";
import { useUserData } from "@/app/context/UserDataContext";
import { useEffect } from "react";
import axiosInstance from "@/app/config/axios.config";
import { useUserSession } from "@/app/context/UserSessionContext";

const Profile = () => {
  const { userData, setUserData } = useUserData();
  const { userSession } = useUserSession();

  useEffect(() => {
    axiosInstance.get(`/users/${userSession.userId}?populate=*`).then((response) => {
      const { data, status } = response;
      if (status === 200) {
        setUserData(prev => ({
          ...prev,
          user: {
            ...prev?.user, // Keep the other properties in user object
            image: "http://localhost:1337" + data?.imageUrl ?? prev?.user?.image,
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email ?? prev?.user?.email,
            id: data?.id,
          },
          links: prev?.links
        }));
      }
    })
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm lg:flex hidden items-center justify-center py-14">
        <PhoneReview />
      </div>
      <div className="bg-white p-6 md:p-10 rounded-xl">
        <ProfileDetailsForm />
      </div>
    </>
  )
};

export default Profile;