import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export default function useFetchClerk() {
	const { getToken } = useAuth();
	console.log(getToken);

	const authenticatedFetch = async (endpoint, id, ...args) => {
		const url = `${endpoint}/${id}`;

		// return fetch(url, {
		//   headers: { Authorization: `Bearer ${await getToken()}` },
		//   ...args
		// }).then(res => res.json());

		return await axios
			.get(url, {
				headers: { Authorization: `Bearer ${await getToken()}` },
				...args,
			})
			.then((res) => res.json());
	};

	return authenticatedFetch;
}
