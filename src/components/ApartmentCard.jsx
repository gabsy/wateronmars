import { Link } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
	return (
		<Link to={`/apartments/${apartment.apartmentNo}`}>
			<div className="flex flex-col gap-6 p-6 rounded-xl shadow-lg hover:scale-105 duration-300">
				
				<h2 className="text-lg font-semibold">Apartment {apartment.apartmentNo}</h2>
				{apartment.ownerName}
			</div>
		</Link>
	);
};

export default ApartmentCard;
