import { Link } from 'react-router-dom';
import Hexagon from '../Hexagon';
import {
	BuildingOfficeIcon,
	EnvelopeIcon,
	UserIcon,
	PhoneIcon,
} from '@heroicons/react/24/outline';

import Modal from '../Modal';
import { EditApartmentForm } from '../Forms';
import useModal from '../../hooks/useModal';

const ApartmentCard = ({ apartment }) => {
	const { isOpen, openModal, closeModal, selectedModal } = useModal();

	return (
		<>
			<Link to={`/apartments/${apartment.apartmentNo}`}>
				<div className="flex flex-col sm:flex-row gap-0 md:gap-2 p-6 py-8 rounded-3xl bg-white hover:scale-105 hover:shadow-md hover:shadow-slate-200 duration-300">
					<Hexagon customClasses="mb-3">
						<BuildingOfficeIcon className="h-8 w-8 stroke-white fill-white stroke-1" />
					</Hexagon>
					<div className="flex-1 leading-8">
						<h2 className="text-2xl font-semibold mb-6">
							Apartment {apartment.apartmentNo}
						</h2>
						<div className="space-y-1">
							<div>
								<UserIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
								{apartment.ownerName}
							</div>
							<div>
								<EnvelopeIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
								{apartment.ownerEmail}
							</div>
							<div>
								<PhoneIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
								{apartment.ownerPhoneNo}
							</div>
						</div>
					</div>
				</div>
			</Link>
			<button
				onClick={() => openModal('editApartment')}
				className="text-wom-primary hover:underline font-normal"
			>
				Edit Apartment
			</button>
			{selectedModal === 'editApartment' && (
				<Modal
					content={<EditApartmentForm apartmentId={apartment._id} />}
					isOpen={isOpen}
					onClose={closeModal}
				/>
			)}
		</>
	);
};

export default ApartmentCard;
