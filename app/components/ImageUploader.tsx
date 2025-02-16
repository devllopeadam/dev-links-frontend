import { useEffect, useState } from 'react';
import { useUserData } from '../context/UserDataContext';
import axiosInstance from '../config/axios.config';
import { useUserSession } from '../context/UserSessionContext';
import toast from 'react-hot-toast';
export default function ImageUploader() {
  const { userData, setUserData } = useUserData();
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userSession } = useUserSession();

  const profilePictureChanged = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setUserData(prev => ({
          ...prev,
          user: {
            ...prev!.user,
            image: reader.result as string,
            firstName: prev?.user?.firstName,
            lastName: prev?.user?.lastName,
            email: prev?.user?.email ?? prev?.user?.email,
            id: prev?.user?.id
          },
          links: prev!.links
        }));
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToServer = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('files', file);
    try {
      const { status, data: uploadResponse } = await axiosInstance.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userSession.jwt}`,
        },
      });

      if (status === 200) {
        const uploadedImage = uploadResponse[0];
        const imageUrl = uploadedImage.url;

        const updateResponse = await axiosInstance.put(`/users/${userSession.userId}`, {
          imageUrl: imageUrl,
        }, {
          headers: {
            Authorization: `Bearer ${userSession.jwt}`,
          },
        });

        if (updateResponse.status !== 200) {
          setError('Failed to update user profile with image URL');
        }
      }
    } catch (error) {
      toast.error('Failed to upload image to server', {
        position: "top-center",
        duration: 1500,
        style: {
          backgroundColor: "white",
          color: "black",
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-[#fafafa] p-5 md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center md:gap-x-6 lg:grid-cols-1 xl:grid-cols-[2fr_1fr_1fr]">
      <div>
        <label htmlFor="profile_picture" className='text-accent-gray'>Profile picture</label>
      </div>
      {!url ? (
        <label className="relative mt-4 grid h-48 w-48 cursor-pointer place-items-center rounded-xl bg-accent-purple/10 text-purple md:mt-0">
          <input
            type="file"
            accept=".png,.jpg"
            className="hidden"
            id="profile_picture"
            onChange={async (e) => {
              await uploadToServer(e.target.files![0]);
              profilePictureChanged(e.target.files![0]);
            }}
          />
          <div>
            {
              !isLoading
                ? (
                  <>
                    <svg className="mx-auto" width="40" height="40" fill="none" viewBox="0 0 40 40">
                      <path
                        fill="#633CFF"
                        d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
                      />
                    </svg>
                    <p className="mt-2 font-semibold text-accent-purple">{!userData?.user?.image ? "+ Upload Image" : "Change Image"}</p>
                  </>
                ) : (
                  <svg
                    className="animate-spin h-8 w-8 text-accent-purple"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )
            }
          </div>
        </label>
      ) : (
        <label className="relative mt-4 block h-48 w-48 overflow-hidden rounded-xl md:mt-0 lg:mt-4 xl:mt-0">
          <input
            type="file"
            accept=".png,.jpg"
            className="hidden"
            id="profile_picture"
            onChange={async (e) => {
              await uploadToServer(e.target.files![0]);
              profilePictureChanged(e.target.files![0]);
            }}
          />
          <img
            src={url}
            width="192"
            height="192"
            alt="Profile picture preview"
            className="h-full w-full object-cover"
          />
            <div className="absolute inset-0 grid cursor-pointer place-items-center bg-black/40 text-white opacity-0 hover:opacity-100 transition-all duration-300">
              <div>
                <svg className="mx-auto" width="40" height="40" fill="none" viewBox="0 0 40 40">
                  <path
                    fill="currentColor"
                    d="M33.75 6.25H6.25a2.5 2.5 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75a2.5 2.5 0 0 0-2.5-2.5Zm0 2.5v16.055l-4.073-4.072a2.5 2.5 0 0 0-3.536 0l-3.125 3.125-6.875-6.875a2.5 2.5 0 0 0-3.535 0L6.25 23.339V8.75h27.5ZM6.25 26.875l8.125-8.125 12.5 12.5H6.25v-4.375Zm27.5 4.375h-3.34l-5.624-5.625L27.91 22.5l5.839 5.84v2.91ZM22.5 15.625a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0Z"
                  />
                </svg>
                <p className="mt-2 font-semibold">Change Image</p>
              </div>
            </div>
        </label>
      )}
      <p className="mt-6 text-xs md:mt-0 lg:mt-6 xl:mt-0 text-accent-gray">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>  
      {error && (
        <p className="text-red-500 mt-1 text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
