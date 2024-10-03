"use client";
import CloseIcon from "@/public/images/icon-close.svg";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle
} from "./ui/alert-dialog";
import { QRCodeCanvas } from "qrcode.react"; // Change to QRCodeCanvas to access canvas methods
import { useUserData } from "../context/UserDataContext";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

interface IProps {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const QrCodeGenerator = ({ isOpen, setIsOpen }: IProps) => {
  const { userData } = useUserData();
  const [profileUrl, setProfileUrl] = useState("");
  const qrRef = useRef<HTMLCanvasElement>(null); // Reference to the QR code canvas

  useEffect(() => {
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/profiles/${userData?.user.id}`;
    setProfileUrl(url);
  }, [userData?.user.id]);

  const downloadQRCode = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `${userData?.user.firstName}-${userData?.user.lastName}-qrcode.png`;
    link.click();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <AlertDialogContent className="flex flex-col gap-5 w-[80%] h-auto max-h-[650px] lg:max-w-[350px] outline-none rounded-lg">
        <AlertDialogTitle></AlertDialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center bg-accent-purple/10 w-8 h-8 p-1 absolute top-5 right-5 rounded-md cursor-pointer transition-all duration-300 hover:bg-accent-purple/15 hover:shadow-sm"
        >
          <CloseIcon className="text-accent-purple" />
        </motion.div>
        <div className="flex flex-col gap-6">
          <Link href={profileUrl} target="_blank">
            <QRCodeCanvas
              ref={qrRef}
              size={230}
              fgColor="#111827"
              includeMargin={true}
              marginSize={2}
              className="rounded-md shadow-md mx-auto mt-5"
              bgColor="#fafafa"
              value={profileUrl}
            />
          </Link>
          <Button onClick={downloadQRCode}>
            Download QR Code
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QrCodeGenerator;
