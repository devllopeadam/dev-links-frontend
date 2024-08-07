"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/app/validation";
import { LOGIN_FORM } from "@/app/constants";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { signIn } from "next-auth/react"
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthSignupButton from "@/app/components/AuthSignupButton";


interface IFormData {
  email: string,
  password: string,
}

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema), mode: "onBlur"
  })
  
  const onSubmit: SubmitHandler<IFormData> = async ({email, password}) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    },);

    if (result?.error) {
      toast.error("Invalid email or password", {
        position: "top-center",
        duration: 1500,
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
        },
      });
    } else {
      toast.success("Login successfully", {
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
        router.push("/");
      }, 300);
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-7 bg-white rounded-xl shadow-sm p-6 sm:p-[38px] w-[92%] sm:w-[476px]">
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
                  error={errors[e.name]?.message!}
                  {...e}
                  {...register(e.name)}
                />
              )
            })}
          <Button isLoading={isSubmitting}>Log in</Button>
        </div>
        <div className="flex gap-3 items-center">
          <div className="bg-accent-gray/30 h-[1px] w-full"></div>
          <p className="text-dark-gray">Or</p>
          <div className="bg-accent-gray/30 h-[1px] w-full"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <AuthSignupButton provider="github" icon="/images/icon-github-black.svg"/>
            <AuthSignupButton provider="google" icon="/images/icon-google.svg"/>
          </div>
          <div className="flex items-center justify-center gap-1">
            <p className="text-accent-gray font-">Don't have an account?</p>
            <Link href={"/register"} className="text-accent-purple font-">Create Account</Link>
          </div>
        </div>
      </form>
    </div>
  )
} 