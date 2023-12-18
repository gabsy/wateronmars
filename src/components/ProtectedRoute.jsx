import useGlobalContext from '../hooks/useGlobalContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { userRole } = useGlobalContext().state;

	if (userRole !== null) {
		return allowedRoles.includes(userRole) ? children : <Navigate to="/" />;
	}
};

export default ProtectedRoute;
