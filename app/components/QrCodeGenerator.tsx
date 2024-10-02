"use client"
import CloseIcon from "@/public/images/icon-close.svg";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from "./ui/alert-dialog";
import { QRCodeSVG } from "qrcode.react";
import { useUserData } from "../context/UserDataContext";
import { useEffect, useState } from "react";
import Link from "next/link";


interface IProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const QrCodeGenerator = ({ isOpen, setIsOpen }: IProps) => {
  const { userData } = useUserData();
  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/profiles/${userData?.user.id}`;
    setProfileUrl(url);
  }, [userData?.user.id]);
  return (
    <AlertDialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <AlertDialogContent className="flex flex-col gap-5 w-[80%] h-auto max-h-[650px] lg:max-w-[350px] outline-none rounded-lg">
        <AlertDialogTitle></AlertDialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center bg-accent-purple/10 w-8 h-8 p-1 absolute top-5 right-5 rounded-md cursor-pointer transition-all duration-300 hover:bg-accent-purple/15 hover:shadow-sm">
          <CloseIcon className="text-accent-purple" />
        </motion.div>
        <Link href={profileUrl} target="_blank">
          <QRCodeSVG size={230} fgColor="#111827" includeMargin={true} marginSize={2} className="rounded-md shadow-md mx-auto mt-10" bgColor="#fafafa" value={profileUrl} />
        </Link>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default QrCodeGenerator
