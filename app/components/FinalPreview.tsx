"use client";
import { motion } from "framer-motion";
import { getIconForPlatform } from "../constants";
import { useUserData } from "../context/UserDataContext";
import PhoneLink from "./PhoneLink";
import MaximizeIcon from "@/public/images/icon-maximize.svg";
import { useState } from "react";
import Hover from "./Hover";
import PreviewMaximized from "./PreviewMaximized";
import DataNotFoundPlaceholder from "./DataNotFoundPlaceholder";

interface IProps {
  isLoading: boolean;
}

const FinalPreview = ({ isLoading }: IProps) => {
  const { userData } = useUserData();
  const [open, setOpen] = useState<boolean>(false);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);

  return (
    <main className="pt-[50px] flex items-center justify-center mx-auto col-span-2">
      <div className="bg-white flex flex-col gap-7 pb-8 pt-10 px-5 rounded-xl relative z-50 w-[450px] shadow-lg">
        {
          userData?.links?.length && userData?.user?.email && userData?.user?.firstName && userData?.user?.lastName
            ? !isLoading &&
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onClick={() => {
                setTimeout(() => {
                  setOpenPopUp(true);
                }, 200);
              }}
              className="flex items-center justify-center bg-accent-purple/10 w-8 h-8 p-1 absolute top-5 right-5 rounded-md cursor-pointer transition-all duration-300 hover:bg-accent-purple/15 hover:shadow-sm">
              <MaximizeIcon className="text-accent-purple" />
              <Hover text="Maximize" isOpen={open} />
            </motion.div>
            : null
        }
        <div>
          {/* Image */}
          {
            isLoading
              ? <div className="animate-pulse">
                <div className="w-[115px] h-[115px] bg-gray-200 rounded-full mx-auto"></div>
              </div>
              : userData?.user.image
                ? (
                  <div className="flex items-center justify-center p-1 bg-accent-purple rounded-full max-w-[110px] max-h-[110px] mx-auto">
                    <motion.img initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} src={userData?.user?.image!} alt="User Data" width={105} height={105} className="rounded-full object-cover max-w-[100px] max-h-[100px]" />
                  </div>
                ) : DataNotFoundPlaceholder("image")
          }
          {/* The full name and the email */}
          {
            isLoading
              ? <div role="status" className="animate-pulse mt-5">
                <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-4 mx-auto" />
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[160px] mb-7 mx-auto" />
              </div>
              : (
                <>
                  <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center mt-5 justify-center gap-2 text-dark-gray font-bold text-[30px]">
                    {userData?.user.firstName ? <p>{userData?.user.firstName[0].toUpperCase() + userData?.user.firstName.slice(1).toLowerCase()}</p> : DataNotFoundPlaceholder("name")}
                    {userData?.user.lastName ? <p>{userData?.user.lastName[0].toUpperCase() + userData?.user.lastName.slice(1).toLowerCase()}</p> : DataNotFoundPlaceholder("name")}
                  </motion.div>
                  {userData?.user.email ? <p className="text-center text-[14px] text-accent-gray">{userData?.user.email}</p> : DataNotFoundPlaceholder("email")}
                </>
              )
          }
        </div>
        {/* Links */}
        {
          isLoading
            ? (
              <div role="status" className="animate-pulse w-full max-w-[300px] mx-auto">
                <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-3" />
                <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-3" />
                <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-3" />
                <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 w-full" />
              </div>
            )
            : userData?.links?.length
              ? (
                <div className="flex flex-col gap-4 items-center">
                  {userData.links.map((link) => (
                    <div key={link.id} className="max-w-[300px] w-full">
                      <PhoneLink icon={getIconForPlatform(link.platform)} {...link} />
                    </div>
                  ))}
                </div>
              )
              : DataNotFoundPlaceholder("links")
        }
      </div>
      <PreviewMaximized isOpen={openPopUp} setIsOpen={setOpenPopUp} />
    </main>
  );
}

export default FinalPreview
