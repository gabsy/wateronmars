import { useState, useEffect } from 'react';
import ReadingCard from './ReadingCard';
import useGlobalContext from '../hooks/useGlobalContext';
import { motion } from 'framer-motion';
import ReadingCardPlaceholder from './ReadingCardPlaceholder';

const ReadingsList = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const readings = useGlobalContext().readings;
	const apartmentId = useGlobalContext().apartment._id;
	const { userRole } = useGlobalContext();

	// Filter readings by apartment id and sort by readingDate
	readings.sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));
	const filteredReadings = readings.filter(
		(reading) => reading.apartmentId === apartmentId,
	);

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
		visible: { opacity: 1, transition: { staggerChildren: 0.09 }, },
	};

	const listItem = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return (
		<>
			<div className="buttons flex justify-between items-center mb-8 px-2">
				<h2 className="text-xl md:text-2xl font-semibold">
					Consumptions by month
				</h2>
				<div className="flex gap-3 pointer-events-none opacity-30">
					Filter by year:
					<button className="btn btn-outline btn-smaller">
						All years
					</button>
					<button className="btn btn-outline btn-smaller">
						2023
					</button>
					<button className="btn btn-outline btn-smaller">
						2022
					</button>
					<button className="btn btn-outline btn-smaller">
						2021
					</button>
				</div>
			</div>
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

						return (
							<motion.div key={index} variants={listItem}>
								<ReadingCard
									readingId={reading._id}
									month={reading.month}
									year={reading.year}
									prevReading={prevReading.reading}
									reading={reading.reading}
									readingDate={reading.readingDate}
									paid={reading.paid}
									userRole={userRole}
								/>
							</motion.div>
						);
					})}

				{!isLoaded &&
					cardLoadingPlaceholder.map((card, index) => {
						return <ReadingCardPlaceholder key={index} />;
					})}
			</motion.div>
		</>
	);
};

export default ReadingsList;
