import ImageUploader from "./ImageUploader"
import ProfileForm from "./ProfileForm"

const ProfileDetailsForm = () => {
  return (
    <main className="flex flex-col gap-8 bg-white p-6 md:p-10 rounded-xl">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl text-dark-gray">Profile Details</h1>
        <p className="text-accent-gray">Add your details to create a personal touch to your profile.</p>
      </div>
      <ImageUploader />
      <ProfileForm />
    </main>
  )
}

export default ProfileDetailsForm
