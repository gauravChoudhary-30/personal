// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import useStore from "../store/store";

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);

  if (!user) {
    // User not logged in → send to login
    return <Navigate to="/login" replace />;
  }

  // User exists → render the page
  return children;
};

export default ProtectedRoute;
