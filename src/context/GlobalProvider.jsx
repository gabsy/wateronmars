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
    const [ readings , setReadings ] = useState([]);
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
			const fetchData = async () => {
				try {
					const apartmentsData = await api.get('/apartments');
                    setApartments(apartmentsData.data);
					
                    const userApartment = apartmentsData.data.filter(apartment => apartment.ownerEmail === userEmail);
					setApartment(userApartment[0]);

                    const readingsData = await api.get('/readings');
                    setReadings(readingsData.data);

				} catch (error) {
					console.error('Error:', error);
				} finally {
                    setIsLoading(false);
                }
			}
			
            fetchData();
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
            readings,
        }}>
            {isSignedIn && isLoading ?
            <Loader />
            : children
            }
        </GlobalContext.Provider>
    );
}
