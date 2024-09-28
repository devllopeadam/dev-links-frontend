import CloseIcon from "@/public/images/icon-close.svg";
import { motion } from "framer-motion";
import { getIconForPlatform } from "../constants";
import { useUserData } from "../context/UserDataContext";
import DataNotFoundPlaceholder from "./DataNotFoundPlaceholder";
import PhoneLink from "./PhoneLink";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from "./ui/alert-dialog";
import { ScrollArea } from "./ui/scroll-area";

interface IProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const PreviewMaximized = ({ isOpen, setIsOpen }: IProps) => {
  const { userData } = useUserData();

  return (
    <AlertDialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <AlertDialogContent className="flex flex-col gap-5 w-[90%] h-auto max-h-[650px] lg:max-w-[450px] outline-none rounded-lg">
        <AlertDialogTitle></AlertDialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center bg-accent-purple/10 w-8 h-8 p-1 absolute top-5 right-5 rounded-md cursor-pointer transition-all duration-300 hover:bg-accent-purple/15 hover:shadow-sm">
          <CloseIcon className="text-accent-purple" />
        </motion.div>
        <div>
          {
            userData?.user?.image
              ? <div className="flex items-center justify-center p-1 bg-accent-purple rounded-full max-w-[110px] max-h-[110px] mx-auto">
                <motion.img initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} src={userData?.user?.image!} alt="User Data" width={105} height={105} className="rounded-full object-cover max-w-[100px] max-h-[100px]" />
              </div>
              : DataNotFoundPlaceholder("image")
          }
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center mt-4 justify-center gap-2 text-dark-gray font-bold text-[30px]">
            <p>{userData?.user?.firstName && userData?.user?.firstName[0].toUpperCase() + userData?.user?.firstName.slice(1).toLowerCase()}</p>
            <p>{userData?.user?.lastName && userData?.user?.lastName[0].toUpperCase() + userData?.user?.lastName.slice(1).toLowerCase()}</p>
          </motion.div>
          <p className="text-center text-[14px] text-accent-gray">{userData?.user?.email}</p>
        </div>
        <ScrollArea className={`${userData?.links?.length! > 7 && "h-[415px]"}`}>
          <div className="flex flex-col gap-4 items-center">
            {userData?.links.map((link, i) => (
              <div key={i} className="max-w-full md:max-w-[300px] w-full">
                <PhoneLink icon={getIconForPlatform(link.platform)} {...link} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PreviewMaximized
