"use client";
import { useEffect, useState } from "react";
import { useUserData } from "../context/UserDataContext";
import CustmizeLink from "./CustmizeLink";
import { ScrollArea } from "./ui/scroll-area";
import { Reorder } from "framer-motion";
import { Link } from "../interfaces";

const LinksHandler = () => {
  const { userData, setUserData } = useUserData();
  const [links, setLinks] = useState<Link[]>();

  useEffect(() => {
    setLinks(userData?.links);
  }, [])

  useEffect(() => {
    if (links) {
      setTimeout(() => {
        setUserData(prev => ({
          ...prev!,
          user: {
            ...prev!.user,
          },
          links: links!
        }));
        // update the links in the backend as well
      }, 1000);
    }
  }, [links]);



  return links && (
    <ScrollArea className='h-[600px]'>
      <Reorder.Group axis="y" onReorder={setLinks} values={links} className="flex flex-col gap-5">
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
