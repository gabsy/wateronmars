import ApartmentCard from './ApartmentCard';
import useGlobalContext from '../../hooks/useGlobalContext';
import { motion } from 'framer-motion';

const ApartmentsList = () => {
	const apartments = useGlobalContext().apartments;

	// Sort apartments by apartmentNo
	apartments.sort((a, b) => a.apartmentNo - b.apartmentNo);

	return (
		<>
			<motion.div
				className="grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.3,
				}}
			>
				{apartments.length > 0 &&
					apartments.map((apartment) => {
						return (
							<ApartmentCard
								key={apartment.apartmentNo}
								apartment={apartment}
							/>
						);
					})}
			</motion.div>
		</>
	);
};

export default ApartmentsList;
