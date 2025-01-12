import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useRecoilValue(userAtom);

  // Check if the user is authenticated and has the required role
  if (!user.userId) {
    // Redirect to the signin page if not logged in
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to a "Not Authorized" or another page if the user role is not allowed
    return <Navigate to="/" replace />;
  }

  // Render the children if access is granted
  return children;
};

export default ProtectedRoute;
