import { useState, useEffect } from "react";
import { useUserData } from "../context/UserDataContext";

const useProfileReady = () => {
  const { userData } = useUserData();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isProfileIncomplete =
      !userData || // Ensure userData exists
      (userData.links?.length || 0) < 1 || // Ensure links is an array and has at least one item
      !userData.user.firstName ||
      !userData.user.lastName ||
      !userData.user.email;

    setReady(!isProfileIncomplete);
  }, [userData]); // Dependency array ensures this effect runs when userData changes

  return { ready };
};

export default useProfileReady;
