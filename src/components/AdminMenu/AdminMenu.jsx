import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { AddReadingForm, AddApartmentForm } from '../Forms';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import useModal from '../../hooks/useModal';


const AdminMenu = () => {
	const { isOpen, openModal, closeModal, selectedModal } = useModal();

	return (
		<div className="max-w-screen-2xl mx-auto px-6 pb-8 flex justify-center gap-6 -mt-8">
				{/* Link to apartments list page */}
				<Link to="/apartments" className="text-wom-primary hover:underline font-normal">
					<BuildingOfficeIcon className="h-5 w-5 inline-block align-top mr-2" />
					Apartments
				</Link>

				{/* Add Apartment modal form & trigger */}
				<button onClick={() => openModal('addApartment')} className="text-wom-primary hover:underline font-normal">
					<PlusCircleIcon className="h-5 w-5 inline-block align-top mr-2" />
					Add Apartment
				</button>			
				{ selectedModal === 'addApartment' && (
					<Modal content={<AddApartmentForm />} title="Add New Apartment" isOpen={isOpen} onClose={closeModal}/>
				)}

				{/* Add Reading modal form & trigger */}
				<button onClick={() => openModal('addReading')} className="text-wom-primary hover:underline font-normal">
					<PlusCircleIcon className="h-5 w-5 inline-block align-top mr-2" />
					Add Reading
				</button>
				{ selectedModal === 'addReading' && (
					<Modal content={<AddReadingForm />} title="Add New Reading" isOpen={isOpen} onClose={closeModal}/>
				)}
		</div>
	)
}

export default AdminMenu
