import { useState } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../api/defaults';
import { ModalSuccess } from '../Modal';

const DeleteApartment = ({ apartmentId, onClose }) => {
	const { state, dispatch } = useGlobalContext();
	const { apartments } = state;
	const [isDeleted, setIsDeleted] = useState(false);
	const [isStateUpdated, setIsStateUpdated] = useState(false);

	// Get apartment by id
	const apartment = apartments.find(
		(apartment) => apartment._id === apartmentId,
	);

	// Delete reading function
	const deleteApartment = async () => {
		try {
			await api.post('/deleteApartment', {
				id: apartmentId,
			});
			setIsDeleted(true);
			dispatch({ type: 'DELETE_APARTMENT', payload: apartmentId });
			setIsStateUpdated(true);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			{isDeleted && isStateUpdated ? (
				<ModalSuccess
					content="Apartment deleted successfully!"
					onClose={onClose}
				/>
			) : (
				<>
					<p className="text-xl leading-relaxed">
						Are you sure you want to delete
						<b className="text-red-600 mx-1">
							Apartment {`${apartment.apartmentNo}`}
						</b>
						?
					</p>
					<div className="flex justify-center gap-4 mt-8">
						<button
							className="btn btn-primary"
							onClick={deleteApartment}
						>
							Delete
						</button>
						<button className="btn btn-text" onClick={onClose}>
							Cancel
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default DeleteApartment;
