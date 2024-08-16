import { profileSchema } from "@/app/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { PROFILE_FORM } from "../constants";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserData } from "../context/UserDataContext";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

interface IFormData {
  firstName: string,
  lastName: string,
  email: string,
}

const ProfileForm = () => {
  const { userData, setUserData } = useUserData();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema), mode: "onBlur", values: userData as any,
  })

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    console.log(userData?.user?.image);
    setUserData(prev => ({
      ...prev,
      user: {
        ...prev?.user, // Keep the other properties in user object
        image: prev?.user?.image,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email
      },
      links: prev?.links
    }));

    try {
      const { data: res, status } = await axiosInstance.put(`/users/${userData?.user?.id}`, data);
      if (status === 200) {
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-4 bg-[#fafafa] rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
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
        <Button isLoading={isSubmitting}>Submit</Button>
      </form>
    </div>
  )
}

export default ProfileForm
