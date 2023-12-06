import { Link } from 'react-router-dom';
import Hexagon from '../Hexagon';
import { BuildingOfficeIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';

const ApartmentCard = ({ apartment }) => {
	return (
		<Link to={`/apartments/${apartment.apartmentNo}`}>
			<div className="flex gap-4 p-6 py-8 rounded-3xl bg-white hover:scale-105 hover:shadow-md hover:shadow-slate-200 duration-300">
				<Hexagon customClasses="scale-90">
					<BuildingOfficeIcon className="h-10 w-10 stroke-white fill-white stroke-1"/>
				</Hexagon>
				<div className="flex-1 leading-8">
					<h2 className="text-2xl font-semibold mb-4">Apartment {apartment.apartmentNo}</h2>
					<UserIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary"/>
					<span className="text-lg">{apartment.ownerName}</span><br/>
					<EnvelopeIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary"/>
					{apartment.ownerEmail}
					<br/>
				</div>
			</div>
		</Link>
	);
};

export default ApartmentCard;
