import { useState, useEffect } from 'react';
import ReadingCard from './ReadingCard';
import useGlobalContext from '../../hooks/useGlobalContext';
import { motion } from 'framer-motion';
import ReadingCardPlaceholder from './ReadingCardPlaceholder';
import ReadingsListFilters from './ReadingsListFilters';
import { useMemo } from 'react';

const ReadingsList = ({ apartmentId }) => {
	const state = useGlobalContext().state;
	const { readings } = state;
	const { userRole } = state;
	const [isLoaded, setIsLoaded] = useState(false);

	// Sort readings by readingDate and filter by apartment id
	const filteredReadings = useMemo(() => {
		const sortedReadings = [...readings].sort(
			(a, b) => new Date(b.readingDate) - new Date(a.readingDate),
		);
		return sortedReadings.filter(
			(reading) => reading.apartmentId === apartmentId,
		);
	}, [readings, apartmentId]);

	// Set isLoaded to true when readings are fetched
	useEffect(() => {
		if (filteredReadings.length > 0) {
			// Simulate longer loading time for demo purposes.
			setTimeout(() => {
				setIsLoaded(true);
			}, 800);
		}
	}, [filteredReadings]);

	// Create placeholder array for loading animation
	const cardLoadingPlaceholder = [];
	for (let i = 0; i < 9; i++) {
		cardLoadingPlaceholder.push(i);
	}

	// Framer motion variants
	const listContainer = {
		hidden: { opacity: 1 },
		visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
	};

	const listItem = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return (
		<>
			<ReadingsListFilters />
			<motion.div
				className="grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
				variants={listContainer}
				initial="hidden"
				animate={isLoaded ? 'visible' : 'hidden'}
			>
				{isLoaded &&
					filteredReadings.map((reading, index) => {
						// Get previous reading index for consumption calculation
						const prevReading =
							index + 1 < filteredReadings.length
								? filteredReadings[index + 1]
								: 0;

						const consumption =
							reading.reading - prevReading.reading;

						return (
							<motion.div key={index} variants={listItem}>
								<ReadingCard
									readingId={reading._id}
									month={reading.month}
									year={reading.year}
									// prevReading={prevReading.reading}
									consumption={consumption}
									reading={reading.reading}
									readingDate={reading.readingDate}
									paid={reading.paid}
									userRole={userRole}
								/>
							</motion.div>
						);
					})}

				{!isLoaded &&
					cardLoadingPlaceholder.map((index) => {
						return <ReadingCardPlaceholder key={index} />;
					})}
			</motion.div>
		</>
	);
};

export default ReadingsList;
