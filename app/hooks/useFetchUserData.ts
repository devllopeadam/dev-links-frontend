import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import { useUserData } from "../context/UserDataContext";
import { useUserSession } from "../context/UserSessionContext";
import { Link, Platform } from "../interfaces";

const useFetchUserData = () => {
  const { setUserData } = useUserData();
  const { userSession } = useUserSession();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userSession.userId &&
      axiosInstance
        .get(`/users/${userSession.userId}?populate=*`)
        .then((response) => {
          const { status, data } = response;
          if (status === 200) {
            setIsLoading(false);
            const userLinks: Link[] = data.links.map((linkData: any) => ({
              id: linkData.id,
              platform: linkData.platform as Platform,
              link: linkData.link,
              order: linkData.order,
            }));
            userLinks.sort((a, b) => a.order - b.order);
            setUserData((prev) => ({
              ...prev,
              user: {
                ...prev!.user,
                image: data?.imageUrl
                  ? `http://localhost:1337${data.imageUrl}`
                  : prev!.user.image,
                firstName: data?.firstName ?? prev!.user.firstName,
                lastName: data?.lastName ?? prev!.user.lastName,
                email: data?.email ?? prev!.user.email,
                id: data?.id ?? prev!.user.id,
              },
              links: userLinks,
            }));
          }
        });
  }, [userSession.userId]);

  return { isLoading };
};

export default useFetchUserData;
