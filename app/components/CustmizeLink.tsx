import { Link } from "../interfaces";
import { useUserData } from "../context/UserDataContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { getGrayIconForPlatform } from "../constants";
import UpdateLink from "./UpdateLink";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import ReorderIcon from "./IconReorder";

interface IProps {
  item: Link;
  hashId: number;
}

const CustmizeLink = ({ item, hashId }: IProps) => {
  const { userData, setUserData } = useUserData();
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id, platform, link } = item;
  const handleRemoveLink = async () => {
    try {
      setIsLoading(true);
      const { status } = await axiosInstance.delete(`/links/${id}`);
      if (status === 200) {
        const updatedLinks = userData?.links.filter(link => link.id !== id);
        setUserData(prev => ({
          ...prev,
          user: {
            ...prev!.user
          },
          links: updatedLinks as Link[]
        }));
      }
      toast.success("Link Removed successfully", {
        position: "top-center",
        duration: 1000,
        style: {
          padding: "15px 30px",
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
        },
      });
      setOpen(false);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to remove the link', {
        position: "top-center",
        duration: 1500,
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
        },
      });
    }
  }

  return (
    <Reorder.Item
      value={item}
      id={item.id.toString()}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="p-5 bg-[#fafafa] rounded-lg flex flex-col gap-4 select-none">
      <div className="flex items-center gap-2">
        <ReorderIcon
          onPointerDown={(e) => dragControls.start(e)}
          className="w-5 h-5" />
        <p className="text-accent-gray font-semibold">Link <span className="font-bold">#{hashId}</span></p>
      </div>
      <div className="flex flex-col gap-4">
        <Input disabled={false} label="Platform" className="[&>div>input]:bg-white focus-visible:ring-[#e2e8f0]" icon={getGrayIconForPlatform(platform)} value={platform} />
        <Input disabled={false} label="Link" className="[&>div>input]:bg-white focus-visible:ring-[#e2e8f0]" icon={"/images/icon-link.svg"} value={link} />
      </div>
      <div className="flex items-center gap-2 self-end">
        <Button className="font-semibold" size={'sm'} onClick={() => setUpdateOpen(true)}>Update</Button>
        <Button variant={'destructive'} size={'sm'} className="font-semibold" onClick={() => setOpen(true)}>Remove</Button>
      </div>
      {/* Dialog for delete */}
      <AlertDialog open={open} onOpenChange={(open) => setOpen(open)}>
        <AlertDialogContent className="flex flex-col gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to remove this link?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant={'secondary'} size={'sm'} onClick={() => setOpen(false)}>No</Button>
            <Button variant={'destructive'} size={'sm'} onClick={handleRemoveLink} isLoading={isLoading}>Yes</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Dialog for update */}

      {
        updateOpen && <UpdateLink updateOpen={updateOpen} setUpdateOpen={setUpdateOpen} linkN={{ platform, link, id }} />
      }
    </Reorder.Item>
  )
}

export default CustmizeLink
