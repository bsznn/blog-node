import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ roles }) => {
  const { user } = useAuth();
  console.log(`roles ${JSON.stringify(roles)}`)
  console.log(`user ${JSON.stringify(user)}`)
  const isAuthorized = user && roles.includes(user.role);

  if (!isAuthorized) {
    return <Navigate to={"/error-auth"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;