import { Navigate } from "react-router-dom";
import { auth } from "@/utils/api";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = auth.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/admin/auth" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
