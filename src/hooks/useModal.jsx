import { useState, useCallback } from 'react';

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedModal, setSelectedModal] = useState(null);

	const openModal = useCallback((modalType) => {
		setIsOpen(true);
		setSelectedModal(modalType);
	}, []);

	const closeModal = useCallback((modalType) => {
		setIsOpen(false);
		setSelectedModal(modalType);
	}, []);

	return {
		isOpen,
		openModal,
		closeModal,
		selectedModal,
	};
};

export default useModal;
