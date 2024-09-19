'use client'
import { getGrayIconForPlatform, platform_bases } from "../constants"
import * as yup from "yup";
import { Button } from "./ui/button"
import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isValidURLWithUsername } from "../validation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useUserData } from "../context/UserDataContext";
import { Link, Platform } from "../interfaces";
import axiosInstance from "../config/axios.config";
import { useUserSession } from "../context/UserSessionContext";
import toast from "react-hot-toast";


interface IFormData {
  platform: string,
  link: string,
}

interface IProps { 
  updateOpen: boolean;
  setUpdateOpen: (updateOpen: boolean) => void;
  linkN: Link;
}

const UpdateLink = ({ updateOpen, setUpdateOpen, linkN }: IProps) => {
  const { id } = linkN;
  const { userData, setUserData } = useUserData();
  const { userSession } = useUserSession();

  const platformSchema = useMemo(() =>
    yup.object({
      platform: yup
        .string()
        .required("Can't be empty"),
      link: yup
        .string()
        .required("Can't be empty")
        .test('is-valid-url-with-username', "Invalid platform account", function (value) {
          const { platform } = this.parent;
          const baseURL = platform_bases[platform as keyof typeof platform_bases];
          return baseURL ? isValidURLWithUsername(value!, baseURL) : false;
        }),
    }).required()
    , [linkN.platform]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(platformSchema), mode: "all",
    defaultValues: {
      link: linkN?.link || '',
      platform: linkN?.platform || '',
    }
  })

  const onSubmit: SubmitHandler<IFormData> = async ({ link }) => {
    try {
      const { status, data: updatedLink } = await axiosInstance.put(`/links/${id}`, { data: { link, user: userSession.userId } }, {
        headers: {
          Authorization: `Bearer ${userSession?.jwt}`,
        },
      });
      if (status === 200) {
        setUserData(prev => ({
          ...prev!,
          links: prev!.links!.map(l =>
            l.id === id ? {
              id: l.id,
              platform: updatedLink.data.attributes.platform as Platform,
              link: updatedLink.data.attributes.link,
            }
              : l
          ),  
        }));
        console.log(userData);
        toast.success("Link updated successfully", {
          position: "top-center",
          duration: 1000,
          style: {
            padding: "15px 30px",
            backgroundColor: "white",
            color: "black",
            width: "fit-content",
          },
        });
      }
    } catch (error) {
      toast.error('Failed to update the link', {
        position: "top-center",
        duration: 1500,
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
        },
      });
    }
    setUpdateOpen(false);
  }

  const handleInputChange = (v: string) => {
    setValue('link', v);
    trigger('link');
  }

  return (
    <div className="flex flex-col gap-5">
      <AlertDialog open={updateOpen} onOpenChange={(updateOpen) => setUpdateOpen(updateOpen)}>
        <AlertDialogContent className="flex flex-col gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Update the link details</AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input disabled={false} label="Platform" className="[&>div>input]:bg-white focus-visible:ring-[#e2e8f0]" icon={getGrayIconForPlatform(linkN?.platform!)} value={linkN?.platform} />
            <Input placeholder="github.com/devllopeadam/" error={errors["link"]?.message!} {...register("link")} icon={'/images/icon-link.svg'} className="[&>div>input]:h-11" label="Update the link" onChange={(e) => handleInputChange(e.target.value)} />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button isLoading={isSubmitting}>Submit</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div >
  )
}

export default UpdateLink;
