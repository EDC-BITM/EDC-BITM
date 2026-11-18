import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import { checkAdminAuth } from "./adminApi.js";

export default function RecruitmentAdminRoute({ children }) {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    async function verifyAuth() {
      try {
        const result = await checkAdminAuth();
        if (isMounted) {
          setAuthState({
            isLoading: false,
            isAuthenticated: result.authenticated,
            user: result.user,
          });
        }
      } catch {
        if (isMounted) {
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
        }
      }
    }

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center text-white px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <img
              src={EDCLogo?.src || EDCLogo}
              alt="EDC BIT Mesra"
              className="w-14 h-14 object-contain animate-pulse-slow drop-shadow-lg"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Loader2 className="w-4 h-4 animate-spin text-[#FED853]" />
            <span>Verifying coordinator session...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/recruitment/admin/login" replace state={{ from: location }} />;
  }

  return typeof children === "function" ? children(authState.user) : children;
}

RecruitmentAdminRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
