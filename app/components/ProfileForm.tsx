import { profileSchema } from "@/app/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { PROFILE_FORM } from "../constants";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserData } from "../context/UserDataContext";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "../context/UserSessionContext";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormData {
  firstName: string,
  lastName: string,
  email: string,
}

const ProfileForm = () => {
  const { userData, setUserData } = useUserData();
  const { userSession } = useUserSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema), mode: "all", values: userData as any,
  })

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const { status, data: res } = await axiosInstance.put(`/users/${userSession.userId}`, data, {
        headers: {
          Authorization: `Bearer ${userSession?.jwt}`,
        },
      });
      if (status === 200) {
        setUserData(prev => ({
          ...prev,
          user: {
            ...prev?.user, // Keep the other properties in user object
            image: prev?.user?.image,
            firstName: data?.firstName,
            lastName: data?.lastName,
            email: data?.email
          },
          links: prev!.links
        }));
        toast.success("Details Changed successfully", {
          position: "top-center",
          duration: 1500,
          style: {
            padding: "15px 30px",
            backgroundColor: "white",
            color: "black",
            width: "fit-content",
          },
        });
        setTimeout(() => {
          router.push("/preview");
        }, 600);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`, {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 p-5 bg-[#fafafa] rounded-xl mb-10">
          {
            PROFILE_FORM.map((e, i) => {
              return (
                <Input
                  defaultValue={userData?.user![e.name] as string}
                  className="md:!flex-row !flex-col md:!items-center !items-start md:!justify-between [&>div]:w-full md:[&>div]:w-[80%]"
                  key={i}
                  id={e.name}
                  error={errors[e.name]?.message! as any}
                  {...e}
                  {...register(e.name)}
                />
              )
            })
          }
        </div>
        <Button isLoading={isSubmitting} className="self-end px-4 md:px-10">Save</Button>
      </form>
    </>
  )
}

export default ProfileForm
