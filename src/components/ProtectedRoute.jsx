import useGlobalContext from "../hooks/useGlobalContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { userRole } = useGlobalContext();
  
	return (
		allowedRoles.includes(userRole) ? children : <Navigate to="/" />
	);
};

export default ProtectedRoute
