import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "@/utils/api";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!auth.isAuthenticated()) {
      navigate("/admin/auth");
    }
  }, [navigate]);

  // If authenticated, render children
  if (auth.isAuthenticated()) {
    return children;
  }

  // Otherwise, show loading or nothing while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-yellow-500">Checking authentication...</div>
    </div>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
