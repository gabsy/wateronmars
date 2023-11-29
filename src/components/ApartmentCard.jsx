
const ApartmentCard = ({ apartment }) => {
	return (
		<div className="flex flex-col gap-6 p-6 rounded-xl shadow-lg hover:scale-105 duration-300">
			<h2 className="text-lg font-semibold">Apartment {apartment.apartment_no}</h2>
			{apartment.user_id}
		</div>
	);
};

export default ApartmentCard;
