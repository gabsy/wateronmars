// import context api resources
import { createContext, useState, useEffect } from 'react';
import { useUser, useSession } from '@clerk/clerk-react';
import api from '../api/defaults';
import { checkUserRole } from '../utils/userUtils';

// Create context
export const GlobalContext = createContext();

// Provider component
export const GlobalContextProvider = ({ children }) => {
    const { user, isSignedIn } = useUser();
    const [ apartments , setApartments ] = useState([]);
    const [ apartment, setApartment ] = useState();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const { session } = useSession();
    const userRole = checkUserRole(session);

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
                    
                    setIsLoaded(true);
				} catch (error) {
					console.error('Error:', error);
				}
			}
			
			fetchApartments();
		}
	}, [isSignedIn, user, userRole]);

    return (
        <GlobalContext.Provider value={{
            user,
            apartment,
            setApartment,
            apartments,
            setApartments,
            userRole,
        }}>
            {isLoaded && children}
        </GlobalContext.Provider>
    );
}
