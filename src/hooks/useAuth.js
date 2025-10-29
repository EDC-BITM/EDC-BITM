import { useState, useEffect } from "react";
import { pb } from "@/utils/pb";

export const useAuth = () => {
  const [user, setUser] = useState(pb.authStore.model);
  const [token, setToken] = useState(pb.authStore.token);
  const [isValid, setIsValid] = useState(pb.authStore.isValid);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
      setIsValid(pb.authStore.isValid);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  };

  return {
    user,
    token,
    isValid,
    logout,
  };
};
