"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/app/validation";
import { LOGIN_FORM } from "@/app/constants";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { IErrorResponse, Platform, Link as TLink } from "@/app/interfaces";
import axiosInstance from "@/app/config/axios.config";
import { fillCookies } from "@/app/cookies";
import { useUserSession } from "@/app/context/UserSessionContext";
import { useEffect } from "react";
import { useUserData } from "@/app/context/UserDataContext";

interface IFormData {
  email: string,
  password: string,
}

export default function Login() {
  const { userSession, setUserSession } = useUserSession();
  const { userData, setUserData } = useUserData();
  useEffect(() => {
    userSession.userId && axiosInstance.get(`/users/${userSession.userId}?populate=*`).then((response) => {
      const { status, data } = response;
      if (status === 200) {
        const userLinks: TLink[] = data.links.map((linkData: any) => ({
          id: linkData.id,
          platform: linkData.platform as Platform,
          link: linkData.link,
        }));
        setUserData(prev => ({
          ...prev,
          user: {
            ...prev!.user, // Access user directly since it's required
            image: data?.imageUrl ? `http://localhost:1337${data.imageUrl}` : prev!.user.image,
            firstName: data?.firstName ?? prev!.user.firstName,
            lastName: data?.lastName ?? prev!.user.lastName,
            email: data?.email ?? prev!.user.email,
            id: data?.id ?? prev!.user.id,
          },
          links: userLinks
        }));
      }
    })
  }, [userSession.userId]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema), mode: "onBlur"
  })
  
  const onSubmit: SubmitHandler<IFormData> = async ({ email, password }) => {
    try {
      const { status, data } = await axiosInstance.post("/auth/local/", {
        identifier: email,
        password: password,
      });
      if (status == 200) {
        toast.success("Registration successfully", {
          position: "top-center",
          duration: 1000,
          style: {
            padding: "15px 30px",
            backgroundColor: "white",
            color: "black",
            width: "fit-content",
          },
        });
        fillCookies(data.jwt, data.user.id);
        setUserSession({ jwt: data.jwt, userId: data.user.id });
        setTimeout(() => {
          router.push("/links");
        }, 1000);
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
    <div className="flex flex-col gap-4 sm:gap-7 bg-white rounded-xl shadow-sm p-6 sm:p-[38px] w-[92%] sm:w-[476px] mt-5">
      <header className='flex flex-col gap-2'>
        <h1 className='font-bold text-[24px] text-dark-gray'>Login</h1>
        <p className='text-accent-gray'>Add your details below to get back into the app</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          {LOGIN_FORM.map((e, i) => {
              return (
                <Input
                  key={i}
                  id={e.name}
                  error={errors[e.name]?.message!}
                  {...e}
                  {...register(e.name)}
                />
              )
            })}
          <Button isLoading={isSubmitting}>Log in</Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-1">
            <p className="text-accent-gray font-">Don't have an account?</p>
            <Link href={"/register"} className="text-accent-purple font-">Create an account</Link>
          </div>
        </div>
      </form>
    </div>
  )
} 