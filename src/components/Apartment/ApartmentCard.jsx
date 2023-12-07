import { Link } from 'react-router-dom';
import Hexagon from '../Hexagon';
import {
	BuildingOfficeIcon,
	EnvelopeIcon,
	UserIcon,
} from '@heroicons/react/24/outline';

const ApartmentCard = ({ apartment }) => {
	return (
		<Link to={`/apartments/${apartment.apartmentNo}`}>
			<div className="flex flex-col sm:flex-row gap-0 md:gap-2 p-6 py-8 rounded-3xl bg-white hover:scale-105 hover:shadow-md hover:shadow-slate-200 duration-300">
				<Hexagon customClasses="mb-3">
					<BuildingOfficeIcon className="h-8 w-8 stroke-white fill-white stroke-1" />
				</Hexagon>
				<div className="flex-1 leading-8">
					<h2 className="text-2xl font-semibold mb-6">
						Apartment {apartment.apartmentNo}
					</h2>
					<UserIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
					<span className="font-semibold">{apartment.ownerName}</span>
					<br />
					<EnvelopeIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
					<span className="text-md">{apartment.ownerEmail}</span>
					<br />
				</div>
			</div>
		</Link>
	);
};

export default ApartmentCard;
