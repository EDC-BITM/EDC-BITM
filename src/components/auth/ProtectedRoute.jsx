import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { pb } from "@/utils/pb";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!pb.authStore.isValid) {
      navigate("/admin/auth");
    }
  }, [navigate]);

  // If authenticated, render children
  if (pb.authStore.isValid) {
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
