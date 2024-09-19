"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/app/validation";
import { REGISTER_FORM } from "@/app/constants";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/config/axios.config";
import { AxiosError } from "axios";
import { IErrorResponse } from "@/app/interfaces";


interface IFormData {
  email: string,
  username: string,
  password: string,
}

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema), mode: "onBlur"
  })

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status == 200) {
        toast.success("Registration successfully", {
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
          router.push("/login");
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
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-7 bg-white rounded-xl shadow-sm p-6 sm:p-[38px] w-[92%] sm:w-[476px]">
      <header className='flex flex-col gap-2'>
        <h1 className='font-bold text-[24px] text-dark-gray'>Register</h1>
        <p className='text-accent-gray'>Add your details below to create a new account</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          {REGISTER_FORM.map((e, i) => {
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
          <Button isLoading={isSubmitting}>Register</Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-1">
            <p className="text-accent-gray font-">You have an account?</p>
            <Link href={"/login"} className="text-accent-purple font-">Login</Link>
          </div>
        </div>
      </form>
    </div>
  )
}