import { useState } from 'react';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../api/defaults';
import { ModalSuccess } from '../Modal';

const DeleteReading = ({ readingId, onClose }) => {
	const { state, dispatch } = useGlobalContext();
	const { readings } = state;
	const [isDeleted, setIsDeleted] = useState(false);
	const [isStateUpdated, setIsStateUpdated] = useState(false);

	// Get reading by id
	const reading = readings.find((reading) => reading._id === readingId);

	// Delete reading function
	const deleteReading = async () => {
		try {
			await api.post('/deleteReading', {
				id: readingId,
			});
			setIsDeleted(true);
			// Update readings in global state
			dispatch({ type: 'DELETE_READING', payload: readingId });
			setIsStateUpdated(true);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			{isDeleted && isStateUpdated ? (
				<ModalSuccess
					content="Reading deleted successfully!"
					onClose={onClose}
				/>
			) : (
				<>
					<p className="text-xl leading-relaxed">
						Are you sure you want to delete this reading from{''}
						<b className="text-red-600 mx-1">{`${reading.month} ${reading.year}`}</b>
						{''}?
					</p>
					<div className="flex justify-center gap-4 mt-8">
						<button
							className="btn btn-primary"
							onClick={deleteReading}
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

export default DeleteReading;
