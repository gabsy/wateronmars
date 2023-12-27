import { cloneElement } from 'react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Modal } from '../Modal';
import useModal from '../../hooks/useModal';

const CardActionItem = ({ component, reference, actionType }) => {
	const { isOpen, openModal, closeModal, selectedModal } = useModal();

	// Combine component with onClose prop
	const combinedComponent = cloneElement(component, {
		onClose: closeModal,
	});

	return (
		<>
			{actionType === 'edit' && (
				<button
					onClick={() => openModal(reference)}
					className="hover:text-wom-primary hover:border-wom-primary transition-all duration-200 leading-none rounded-full border border-gray-300 p-1.5 text-gray-500"
					title="Edit reading"
				>
					<PencilIcon className="h-4 w-4 inline-block align-top" />
				</button>
			)}

			{actionType === 'delete' && (
				<button
					onClick={() => openModal(reference)}
					className=" hover:text-red-600 hover:border-red-600 transition-all duration-200 leading-none rounded-full border border-gray-300 p-1.5 text-gray-500"
					title="Delete reading"
				>
					<TrashIcon className="h-4 w-4 inline-block align-top" />
				</button>
			)}

			{selectedModal === reference && (
				<Modal
					content={combinedComponent}
					isOpen={isOpen}
					onClose={closeModal}
				/>
			)}
		</>
	);
};

export default CardActionItem;
