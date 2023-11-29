// import context api resources
import { createContext, useState, useEffect } from 'react';
import { useUser, useSession, useAuth } from '@clerk/clerk-react';
import api from '../api/defaults';
import { checkUserRole } from '../utils/userUtils';
import Loader from '../components/Loader';

// Create context
export const GlobalContext = createContext();

// Provider component
export const GlobalContextProvider = ({ children }) => {
    const { user, isSignedIn } = useUser();
    const [ apartments , setApartments ] = useState([]);
    const [ apartment, setApartment ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);
    const { session } = useSession();
    const userRole = checkUserRole(session);
    const { getToken } = useAuth();

    useEffect(() => {
		if(isSignedIn) {
            // Get signedin user email and role as ref for apartments filtering.
            const userEmail = user.emailAddresses[0].emailAddress;

			// Fetch apartments from API.
			const fetchApartments = async () => {
				try {
					const response = await api.get('/apartments');
                    setApartments(response.data);
					
                    const userApartment = response.data.filter(apartment => apartment.user_email === userEmail);
					setApartment(userApartment[0]);

				} catch (error) {
					console.error('Error:', error);
				} finally {
                    setIsLoading(false);
                }
			}
			
			fetchApartments();
		}
	}, [isSignedIn, user, getToken]);

    return (
        <GlobalContext.Provider value={{
            user,
            apartment,
            setApartment,
            apartments,
            setApartments,
            userRole,
        }}>
            {isSignedIn && isLoading ?
            <Loader />
            : children
            }
        </GlobalContext.Provider>
    );
}
