'use client'
import PhoneReview from "@/app/components/PhoneReview";
import ProfileDetailsForm from "@/app/components/ProfileDetailsForm";
import { useUserData } from "@/app/context/UserDataContext";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/config/axios.config";
import { useUserSession } from "@/app/context/UserSessionContext";
import { Link, Platform } from "@/app/interfaces";

const Profile = () => {
  const { setUserData } = useUserData();
  const { userSession } = useUserSession();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userSession.userId && axiosInstance.get(`/users/${userSession.userId}?populate=*`).then((response) => {
      const { status, data } = response;
      if (status === 200) {
        setIsLoading(false);
        const userLinks: Link[] = data.links.map((linkData: any) => ({
          id: linkData.id,
          platform: linkData.platform as Platform,
          link: linkData.link,
        }));
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
          links: userLinks
        }));
      }
    })
  }, [userSession.userId]);


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