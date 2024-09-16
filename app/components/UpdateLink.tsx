'use client'
import { platform_bases, platforms } from "../constants"
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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "./ui/select";
import { useUserData } from "../context/UserDataContext";
import { IPlatform, Link, Platform } from "../interfaces";
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
  link: Link | null;
}

const UpdateLink = ({ updateOpen, setUpdateOpen, link }: IProps) => {
  const [platform, setPlatform] = useState<string | undefined>(link?.platform || '');
  const { userData, setUserData } = useUserData();
  const { userSession } = useUserSession();

  const [filtredPlatforms, setFiltredPlatforms] = useState<IPlatform[]>();

  useEffect(() => {
    const platformsLinks = userData?.links.map(link => link.platform);
    const fPlatforms = platforms.filter(platform => !platformsLinks?.includes(platform.name) || platform.name === link?.platform);
    setFiltredPlatforms(fPlatforms);
  }, [platform, userData, link]);

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
    , [platform]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(platformSchema), mode: "all",
    defaultValues: {
      platform: link?.platform || '',
      link: link?.link || '',
    }
  })

  useEffect(() => {
    if (platform) {
      const defaultValue = platforms.find(p => p.name === platform)?.defaultValue!;
      setValue("link", defaultValue);
    }
  }, [platform, setValue, trigger]);

  const onSubmit: SubmitHandler<IFormData> = async ({ link, platform }) => {
    try {
      const { status, data: updatedLink } = await axiosInstance.put(`/links/${link?.id}`, { data: { platform, link, user: userSession.userId } }, {
        headers: {
          Authorization: `Bearer ${userSession?.jwt}`,
        },
      });
      if (status === 200) {
        setUserData(prev => ({
          ...prev!,
          links: prev!.links!.map(l =>
            l.id === link?.id ? {
              id: updatedLink.id,
              platform: updatedLink.data.attributes.platform as Platform,
              link: updatedLink.data.attributes.link,
            } : l
          )
        }));
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

  const handleSelectChange = (v: string) => {
    setValue('platform', v);
    setPlatform(v);
    trigger("platform");
  }

  const handleInputChange = (v: string) => {
    setValue('link', v);
    trigger('link');
  }

  useEffect(() => {
    if (!updateOpen) {
      setValue("platform", link?.platform || '');
      setValue("link", link?.link || '');
    }
  }, [updateOpen, link])

  return (
    <div className="flex flex-col gap-5">
      <AlertDialog open={updateOpen} onOpenChange={(updateOpen) => setUpdateOpen(updateOpen)}>
        <AlertDialogContent className="flex flex-col gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Update the link details</AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Select {...register("platform")} value={link?.platform} onValueChange={(v) => handleSelectChange(v)}>
              <SelectTrigger className={`w-full py-4 relative ${errors.platform?.message && ' border-red-500 ring-red-500 focus-visible:ring-1 focus-visible:ring-red-500 focus:ring-transparent'}`}>
                <SelectValue placeholder="Select a platform" />
                <p className="text-red-500 absolute right-8 font-semibold">{errors["platform"]?.message}</p>
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-auto">
                {filtredPlatforms?.map((p, i) => {
                  return <SelectItem key={i} value={p.name}>
                    <div className="flex items-center gap-2">
                      {p.icon && <p.icon />}
                      <p className="text-accent-gray">{p.name}</p>
                    </div>
                  </SelectItem>
                })}
              </SelectContent>
            </Select>
            <Input disabled={!platform} placeholder="github.com/devllopeadam/" error={errors["link"]?.message!} {...register("link")} icon={'/images/icon-link.svg'} className="[&>div>input]:h-11" label="Enter the link" onChange={(e) => handleInputChange(e.target.value)} />
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
