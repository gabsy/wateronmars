import { Bars3BottomRightIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal';
import { AddReadingForm, AddApartmentForm } from '../Forms';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useModal from '../../hooks/useModal';

const MenuDropdown = ({ customClasses = '' }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { isOpen, openModal, closeModal, selectedModal } = useModal();

	// Toggle dropdown
	const handleDropdownShow = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Close dropdown when user clicks outside of it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Set motion animation variants to show from opacity 0 to 1 and from y -10 to 0
	const dropdownVariants = {
		hidden: {
			opacity: 0,
			x: 10,
			zIndex: -10,
			pointerEvents: 'none',
		},
		visible: {
			opacity: 1,
			x: 0,
			zIndex: 12,
			pointerEvents: 'auto',
		},
	};

	return (
		<div
			className={`relative lg:ml-0 lg:w-0 ${customClasses}`}
			ref={dropdownRef}
		>
			<button
				className="bg-transparent block relative"
				onClick={handleDropdownShow}
			>
				<Bars3BottomRightIcon className="h-7 w-7 inline-block align-middle lg:hidden stroke-wom-primary" />
			</button>
			<motion.div
				className="absolute top-full shadow-2xl bg-white right-0 w-auto z-10 flex rounded-md flex-col text-base"
				variants={dropdownVariants}
				initial="hidden"
				animate={isDropdownOpen ? 'visible' : 'hidden'}
			>
				{/* Link to apartments list page */}
				<Link
					to="/apartments"
					className="text-wom-primary hover:underline font-normal"
				>
					<BuildingOfficeIcon className="h-5 w-5 inline-block align-top mr-2" />
					Apartments
				</Link>

				{/* Add Apartment modal form & trigger */}
				<button
					onClick={() => {
						openModal('addApartment');
						setIsDropdownOpen(false);
					}}
					className="text-wom-primary hover:underline font-normal"
				>
					<PlusCircleIcon className="h-5 w-5 inline-block align-top mr-2" />
					Add Apartment
				</button>
				{selectedModal === 'addApartment' && (
					<Modal
						content={<AddApartmentForm onClose={closeModal} />}
						isOpen={isOpen}
						onClose={closeModal}
					/>
				)}

				{/* Add Reading modal form & trigger */}
				<button
					onClick={() => {
						openModal('addReading');
						setIsDropdownOpen(false);
					}}
					className="text-wom-primary hover:underline font-normal"
				>
					<PlusCircleIcon className="h-5 w-5 inline-block align-top mr-2" />
					Add Reading
				</button>
				{selectedModal === 'addReading' && (
					<Modal
						content={<AddReadingForm onClose={closeModal} />}
						isOpen={isOpen}
						onClose={closeModal}
					/>
				)}
			</motion.div>
		</div>
	);
};

export default MenuDropdown;
