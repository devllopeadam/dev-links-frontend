'use client'
import AddLink from "@/app/components/AddLink";
import LinksHandler from "@/app/components/LinksHandler";
import PhoneReview from "@/app/components/PhoneReview";
import axiosInstance from "@/app/config/axios.config";
import { useUserData } from "@/app/context/UserDataContext";
import { useUserSession } from "@/app/context/UserSessionContext";
import { Link, Platform } from "@/app/interfaces";
import { useEffect, useState } from "react";

const Links = () => {
  const { userData, setUserData } = useUserData();
  const { userSession } = useUserSession();
  const [isLoading, setIsLoading] = useState(false);

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

  return !isLoading ? (
    <>
      <div className="bg-white hidden rounded-xl shadow-sm lg:flex items-center justify-center py-14">
        <PhoneReview />
      </div>
      <div className="flex flex-col gap-8 bg-white p-6 md:p-10 rounded-xl">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl text-dark-gray">Customize your links</h1>
          <p className="text-accent-gray">Add/edit/remove links below and then share all your profiles with the world!</p>
        </div>
        <AddLink />
        <LinksHandler />
      </div>
    </>
  ) : "Loading";
};

export default Links;