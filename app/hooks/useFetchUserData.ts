import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import { useUserData } from "../context/UserDataContext";
import { Link, Platform } from "../interfaces";
import { useUserSession } from "../context/UserSessionContext";

interface IProps {
  userId?: number;
}

const useFetchUserData = ({ userId }: IProps) => {
  const { setUserData } = useUserData();
  const { userSession } = useUserSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userId &&
      axiosInstance
        .get(`/users/${userId}?populate=*`, {
          headers: { Authorization: `Bearer ${userSession?.jwt}` },
        })
        .then((response) => {
          const { status, data } = response;
          if (status === 200) {
            console.log(data);
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
                image: data?.imageUrl ?? undefined,
                firstName: data?.firstName ?? "",
                lastName: data?.lastName ?? "",
                email: data?.email ?? "",
                id: data?.id ?? prev!.user.id,
              },
              links: userLinks,
            }));
          }
        });
  }, [userId]);

  return { isLoading };
};

export default useFetchUserData;
