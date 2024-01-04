// import { Link } from 'react-router-dom';
import Hexagon from '../Hexagon';
import {
	BuildingOfficeIcon,
	EnvelopeIcon,
	UserIcon,
	PhoneIcon,
} from '@heroicons/react/24/outline';
import CardActions from '../CardActions';
import useGlobalContext from '../../hooks/useGlobalContext';
import { EditApartmentForm, DeleteApartment } from '../Forms';

const ApartmentCard = ({ apartment }) => {
	const { userRole } = useGlobalContext().state;
	const apartmentId = apartment._id;

	return (
		<>
			{/* <Link to={`/apartments/${apartment.apartmentNo}`}> */}
			<div className="relative flex flex-col sm:flex-row gap-0 md:gap-2 p-6 py-8 rounded-3xl bg-white hover:shadow-md hover:shadow-slate-200 duration-300">
				{userRole === 'admin' && (
					<div className="flex justify-end items-center absolute top-8 right-7 gap-3">
						<CardActions
							editComponent={
								<EditApartmentForm apartmentId={apartmentId} />
							}
							deleteComponent={
								<DeleteApartment apartmentId={apartmentId} />
							}
						/>
					</div>
				)}
				<Hexagon customClasses="mb-3">
					<BuildingOfficeIcon className="h-7 w-7 stroke-white fill-white stroke-1" />
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
			{/* </Link> */}
		</>
	);
};

export default ApartmentCard;
