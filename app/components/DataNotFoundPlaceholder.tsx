import { useUserData } from "../context/UserDataContext";
type TProps = "image" | "links" | "email" | "name";

const DataNotFoundPlaceholder = (type: TProps) => {
  const { userData } = useUserData();
  const { email } = userData?.user!;

  switch (type) {
    case "image":
      return <div className="flex items-center justify-center p-2 bg-gray-200 rounded-full w-[110px] max-w-[110px] h-[110px] max-h-[110px] mx-auto">
        <img src={`https://api.dicebear.com/9.x/bottts/svg?seed=${email || "default"}?scale=50`} alt="user profile" className="object-contain max-w-[70px] max-h-[70px]" />
      </div>
    case "links":
      return <>
        <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[300px] w-full mx-auto" />
        <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[300px] w-full mx-auto" />
        <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[300px] w-full mx-auto" />
      </>
    case "email":
      return <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[160px] mb-7 mx-auto" />
    case "name":
      return <div className="h-5 bg-gray-200 rounded-lg dark:bg-gray-700 w-32 mb-4" />
  }
}

export default DataNotFoundPlaceholder
