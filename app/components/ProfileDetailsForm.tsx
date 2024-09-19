import ImageUploader from "./ImageUploader"
import ProfileForm from "./ProfileForm"

const ProfileDetailsForm = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <main className="flex flex-col gap-8 bg-white p-6 md:p-10 rounded-xl">
      {
        !isLoading ?
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl text-dark-gray">Profile Details</h1>
            <p className="text-accent-gray">Add your details to create a personal touch to your profile.</p>
          </div>
          : <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-48 mb-5"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
      }
      {
        !isLoading ?
          <ImageUploader />
          : <div className="animate-pulse">
            <div className="w-full h-[230px] bg-gray-200 rounded-xl"></div>
          </div>
      }
      {
        !isLoading ?
          <ProfileForm />
          : <div className="animate-pulse">
            <div className="w-full h-[230px] bg-gray-200 rounded-xl"></div>
          </div>
      }
    </main>
  )
}

export default ProfileDetailsForm
