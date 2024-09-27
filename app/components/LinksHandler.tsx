"use client";
import { AxiosResponse } from "axios";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";
import { useUserData } from "../context/UserDataContext";
import { useUserSession } from "../context/UserSessionContext";
import { Link } from "../interfaces";
import CustmizeLink from "./CustmizeLink";
import { ScrollArea } from "./ui/scroll-area";

const LinksHandler = () => {
  const { userData, setUserData } = useUserData();
  const { userSession } = useUserSession();
  const [links, setLinks] = useState<Link[]>();

  useEffect(() => {
    setLinks(userData?.links || []);
  }, [userData]);

  const updateLinksInBackend = async () => {
    try {
      const requests: Promise<AxiosResponse<any>>[] = links?.map(link =>
        axiosInstance.put(`/links/${link.id}`, {
          data: {
            order: link.order,
            user: userSession.userId,
          },
        }, {
          headers: {
            Authorization: `Bearer ${userSession?.jwt}`,
          },
        })
      );

      const responses = await Promise.all(requests);
      if (responses.every(res => res.status === 200)) {
        setUserData(prev => ({
          ...prev!,
          links: links!, // Update the local state with reordered links
        }));
      }
    } catch (error) {
      toast.error('Failed to update links after reordering', {
        position: "top-center",
        duration: 1500,
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
        },
      });
    }
  };

  const handleReorder = (reorderedLinks: Link[]) => {
    const updatedLinks = reorderedLinks.map((link, index) => ({
      ...link,
      order: index + 1,
    }));

    setLinks(updatedLinks); // Update state with reordered links
  };

  useEffect(() => {
    if (links?.length) {
      const updateLinks = async () => {
        await updateLinksInBackend();
      };

      const timeoutId = setTimeout(updateLinks, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [links]);


  return links && (
    <ScrollArea className='h-[600px]'>
      <Reorder.Group axis="y" onReorder={handleReorder} values={links} className="flex flex-col gap-5">
        {links.map((x, i) => (
          <CustmizeLink
            key={x.id}
            item={x}
            hashId={i + 1}
          />
        ))}
      </Reorder.Group>
    </ScrollArea>
  );
};

export default LinksHandler;
