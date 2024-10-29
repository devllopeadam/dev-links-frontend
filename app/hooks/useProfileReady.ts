import { useState, useEffect } from "react";
import { useUserData } from "../context/UserDataContext";

const useProfileReady = () => {
  const { userData } = useUserData();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isProfileIncomplete =
      !userData ||
      (userData.links?.length || 0) < 1 ||
      !userData.user.firstName ||
      !userData.user.lastName ||
      !userData.user.email;

    setReady(!isProfileIncomplete);
  }, [userData]);

  return { ready };
};

export default useProfileReady;
