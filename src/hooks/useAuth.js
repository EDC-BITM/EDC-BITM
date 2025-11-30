import { useState, useEffect } from "react";
import { auth } from "@/utils/api";

export const useAuth = () => {
  const [user, setUser] = useState(auth.getUser());
  const [token, setToken] = useState(auth.getToken());
  const [isValid, setIsValid] = useState(auth.isAuthenticated());

  useEffect(() => {
    // simple sync with localStorage in case other parts update it
    const onStorage = () => {
      setToken(auth.getToken());
      setUser(auth.getUser());
      setIsValid(auth.isAuthenticated());
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const logout = async () => {
    await auth.logout();
  };

  return {
    user,
    token,
    isValid,
    logout,
  };
};
