import React, { useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Button } from './ui/button';
import axiosInstance from '../config/axios.config';
import { useUserData } from '../context/UserDataContext';
import { Link } from '../interfaces';
import toast from 'react-hot-toast';

interface IProps {
  open: boolean;
  setOpen(value: boolean): void;
  id: number;
}

const DeleteLink = ({ id, open, setOpen }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData, setUserData } = useUserData();

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
    } finally {
      setIsLoading(false);
    }
  }
  return (
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
  );
}

export default DeleteLink
