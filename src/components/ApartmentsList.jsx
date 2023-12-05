import ApartmentCard from './ApartmentCard';
import useGlobalContext from '../hooks/useGlobalContext';

const ApartmentsList = () => {
	const apartments = useGlobalContext().apartments;

	// Sort apartments by apartmentNo
	apartments.sort((a, b) => a.apartmentNo - b.apartmentNo);

	return (
		<>
			<div className="grid grid-flow-row grid-cols-3 gap-11">
				{ apartments.length > 0 && (
					apartments.map((apartment) => {
						return (
							<ApartmentCard
								key={apartment.apartmentNo}
								apartment={apartment}
							/>
						)
					})
				)}
			</div>
		</>
	);
};

export default ApartmentsList;
