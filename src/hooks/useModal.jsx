import { useState, useCallback } from 'react';

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedModal, setSelectedModal] = useState(null);

	const openModal = useCallback((modalType) => {
		setIsOpen(true);
		setSelectedModal(modalType);
		document.body.classList.add('active-modal');
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setSelectedModal(null);
		document.body.classList.remove('active-modal');
	}, []);

	return {
		isOpen,
		openModal,
		closeModal,
		selectedModal,
	};
};

export default useModal;
