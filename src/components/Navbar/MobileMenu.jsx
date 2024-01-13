import {
	Bars3BottomRightIcon,
	ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal';
import { AddReadingForm, AddApartmentForm } from '../Forms';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useModal from '../../hooks/useModal';
import { UserIcon } from '@heroicons/react/24/solid';

const MobileMenu = ({ user, userRole, signOut }) => {
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
			x: '100%',
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
		<div className="lg:ml-0 lg:w-0" ref={dropdownRef}>
			<button
				className="bg-transparent block relative z-20 lg:hidden"
				onClick={handleDropdownShow}
			>
				<Bars3BottomRightIcon className="h-7 w-7 inline-block align-middle lg:hidden " />
			</button>
			<motion.div
				className="fixed shadow-2xl bg-white w-auto z-10 pr-6 pl-10 pb-12 pt-16 md:pt-28 top-0 right-0 text-base lg:hidden"
				variants={dropdownVariants}
				initial="hidden"
				animate={isDropdownOpen ? 'visible' : 'hidden'}
				transition={{ ease: 'backInOut', duration: 0.3 }}
			>
				<ul className="flex flex-col flex-1 items-end gap-4">
					<li>
						<span>{user.fullName}</span>
						<UserIcon className="h-5 w-5 inline-block align-top ml-2 fill-wom-primary" />
					</li>
					<li>
						<span className="align-middle text-[10px] text-white bg-orange-500 rounded-sm uppercase ml-2 px-1 py-0.25">
							ap. 3
						</span>
						{userRole === 'admin' && (
							<span className="align-middle text-[10px] text-white bg-wom-primary rounded-sm uppercase ml-1 px-1 py-0.25">
								{userRole}
							</span>
						)}
					</li>
					<li>
						<button
							className="bg-transparent cursor-pointer hover:text-wom-primary"
							onClick={() => signOut()}
							title="Sign Out"
						>
							Sign Out
							<ArrowRightOnRectangleIcon className="h-5 w-5 inline-block ml-2 align-middle" />
						</button>
					</li>
					{userRole === 'admin' && (
						<>
							<li className="block">
								<div className="h-[1px] bg-gray-200 my-3"></div>
							</li>
							<li>
								<Link
									to="/apartments"
									className="text-wom-primary hover:underline font-normal"
									onClick={() => setIsDropdownOpen(false)}
								>
									Apartments
									<BuildingOfficeIcon className="h-5 w-5 inline-block align-top ml-2" />
								</Link>
							</li>
							<li>
								<button
									onClick={() => {
										openModal('addApartment');
										setIsDropdownOpen(false);
									}}
									className="text-wom-primary hover:underline font-normal"
								>
									Add Apartment
									<PlusCircleIcon className="h-5 w-5 inline-block align-top ml-2" />
								</button>
							</li>
							<li>
								<button
									onClick={() => {
										openModal('addReading');
										setIsDropdownOpen(false);
									}}
									className="text-wom-primary hover:underline font-normal"
								>
									Add Reading
									<PlusCircleIcon className="h-5 w-5 inline-block align-top ml-2" />
								</button>
							</li>
						</>
					)}
				</ul>
			</motion.div>

			{selectedModal === 'addApartment' && (
				<Modal
					content={<AddApartmentForm onClose={closeModal} />}
					isOpen={isOpen}
					onClose={closeModal}
				/>
			)}
			{selectedModal === 'addReading' && (
				<Modal
					content={<AddReadingForm onClose={closeModal} />}
					isOpen={isOpen}
					onClose={closeModal}
				/>
			)}
		</div>
	);
};

export default MobileMenu;
