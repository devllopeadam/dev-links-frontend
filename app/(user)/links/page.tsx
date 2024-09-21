'use client'
import AddLink from "@/app/components/AddLink";
import EmptyLinks from "@/app/components/EmptyLinks";
import LinksHandler from "@/app/components/LinksHandler";
import PhoneReview from "@/app/components/PhoneReview";
import { useUserData } from "@/app/context/UserDataContext";
import useFetchUserData from "@/app/hooks/useFetchUserData";

const Links = () => {
  const { isLoading } = useFetchUserData();
  const { userData } = useUserData();

  return (
    <>
      <div className="bg-white hidden rounded-xl shadow-sm lg:flex items-center justify-center py-14">
        {
          !isLoading && userData?.user ?
            <PhoneReview />
            : <div className="animate-pulse">
              <div className="w-[308px] h-[632px] bg-gray-200 rounded-[35px]"></div>
            </div>
        }
      </div>
      <div className="flex flex-col gap-8 bg-white p-6 md:p-8 rounded-xl">
        {
          !isLoading && userData?.user ?
            <>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl text-dark-gray">Customize your links</h1>
                <p className="text-accent-gray">Add/edit/remove links below and then share all your profiles with the world!</p>
              </div>
              <AddLink />
            </>
            :
            <div role="status" className="animate-pulse w-full">
              <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-5"></div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-7"></div>
              <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-2.5"></div>
            </div>
        }
        {
          !isLoading && userData?.user ?
            (
              userData?.links?.length
                ? <LinksHandler />
                : <EmptyLinks />
            )
            :
            <>
              <div className="animate-pulse">
                <div className="w-full h-[232px] bg-gray-200 rounded-xl"></div>
              </div>
              <div className="animate-pulse">
                <div className="w-full h-[232px] bg-gray-200 rounded-xl"></div>
              </div>
            </>
        }
      </div>
    </>
  )
};

export default Links;