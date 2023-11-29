import ApartmentCard from './ApartmentCard';
import useGlobalContext from '../hooks/useGlobalContext';

const ApartmentsList = () => {
	const apartments = useGlobalContext().apartments;

	return (
		<>
			<div className="grid grid-flow-row grid-cols-3 gap-11">
				{ apartments.length > 0 && (
					apartments.map((apartment, index) => {
						return (
							<ApartmentCard
								key={index}
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
