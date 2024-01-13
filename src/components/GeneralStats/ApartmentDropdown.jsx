import { useNavigate } from 'react-router-dom';
import {
	ChevronDoubleDownIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/outline';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ApartmentDropdown = () => {
	const { apartments } = useGlobalContext().state;
	const navigate = useNavigate();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Toggle dropdown
	const handleDropdownShow = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// On apartment change, navigate to new apartment page and close dropdown
	const handleApartmentChange = (event) => {
		navigate(`/apartments/${event.target.value}`);
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

		// Add document event listener on mount
		document.addEventListener('mousedown', handleClickOutside);

		// Cleanup event listener on unmount
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Set motion animation variants to show from opacity 0 to 1 and from x -10 to 0
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
			zIndex: 10,
			pointerEvents: 'auto',
		},
	};

	return (
		<div className="relative ml-4" ref={dropdownRef}>
			<button
				className="bg-transparent block relative"
				onClick={handleDropdownShow}
			>
				<ChevronDoubleDownIcon
					className={`h-5 w-5 inline-block stroke-wom-primary transition-transform duration-300 ${
						isDropdownOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			<motion.div
				className="absolute top-full shadow-2xl bg-black right-0 w-auto flex rounded-md flex-col text-base"
				variants={dropdownVariants}
				initial="hidden"
				animate={isDropdownOpen ? 'visible' : 'hidden'}
			>
				{apartments.map((apartment) => {
					return (
						<button
							className="px-0 border-b last:border-b-0 border-gray-700 font-normal pl-4 pr-10 py-3 text-gray-300 hover:text-wom-primary focus:text-wom-primary outline-none"
							key={apartment._id}
							onClick={handleApartmentChange}
							value={apartment.apartmentNo}
						>
							<ChevronRightIcon className="h-3 w-3 inline-block mr-2 stroke-white" />
							Apartment {apartment.apartmentNo}
						</button>
					);
				})}
			</motion.div>
		</div>
	);
};

export default ApartmentDropdown;
