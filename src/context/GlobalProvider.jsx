// import context api resources
import { createContext, useState, useEffect, useReducer } from 'react';
import { useUser, useSession } from '@clerk/clerk-react';
import api from '../api/defaults';
// import { checkUserRole } from '../utils/userUtils';
import LoaderAtoms from '../components/LoaderAtoms';

// Create context
export const GlobalContext = createContext();

// Initial state
const initialState = {
	apartment: {},
	apartments: [],
	readings: [],
	user: {},
	userRole: null,
};

// Reducer
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_APARTMENT':
			return {
				...state,
				apartment: action.payload,
			};
		case 'SET_APARTMENTS':
			return {
				...state,
				apartments: action.payload,
			};
		case 'SET_READINGS':
			return {
				...state,
				readings: action.payload,
			};
		case 'SET_USER':
			return {
				...state,
				user: action.payload,
			};
		case 'SET_USER_ROLE':
			return {
				...state,
				userRole: action.payload,
			};
		case 'SET_IS_LOADING':
			return {
				...state,
				isLoading: action.payload,
			};
		case 'UPDATE_APARTMENTS':
			return {
				...state,
				apartments: state.apartments.map((apartment) =>
					apartment._id === action.payload._id
						? action.payload
						: apartment,
				),
			};
		case 'UPDATE_READINGS':
			return {
				...state,
				readings: state.readings.map((reading) =>
					reading._id === action.payload._id
						? action.payload
						: reading,
				),
			};
		default:
			return state;
	}
};

// Provider component
export const GlobalContextProvider = ({ children }) => {
	const { user, isSignedIn } = useUser();
	const { session } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (isSignedIn) {
			// Set user.
			dispatch({ type: 'SET_USER', payload: user });

			// Set user role.
			const userRole = user.publicMetadata.userRole;
			// const userRole = checkUserRole(session);
			dispatch({ type: 'SET_USER_ROLE', payload: userRole });

			// Get signedin user email as ref for apartments filtering.
			const userEmail = user.emailAddresses[0].emailAddress;

			// Fetch data from API.
			const fetchData = async () => {
				try {
					// Get/Set apartments data from API.
					const apartmentsData = await api.get('/apartments');
					dispatch({
						type: 'SET_APARTMENTS',
						payload: apartmentsData.data,
					});

					// Get/Set current user apartment
					const userApartment = apartmentsData.data.filter(
						(apartment) => apartment.ownerEmail === userEmail,
					);
					dispatch({
						type: 'SET_APARTMENT',
						payload: userApartment[0],
					});

					// Get/Set readings data from API.
					const readingsData = await api.get('/readings');
					dispatch({
						type: 'SET_READINGS',
						payload: readingsData.data,
					});
				} catch (error) {
					console.error('Error:', error);
				} finally {
					setTimeout(() => {
						state.userRole !== null ? setIsLoading(false) : null;
					}, 800);
				}
			};

			fetchData();
		}
	}, [isSignedIn, user, session, state.userRole]);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{isSignedIn && isLoading ? <LoaderAtoms /> : children}
		</GlobalContext.Provider>
	);
};
