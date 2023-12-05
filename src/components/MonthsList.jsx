import { useState, useEffect } from 'react';
import MonthCard from './MonthCard';
import useGlobalContext from '../hooks/useGlobalContext';
import { motion } from 'framer-motion';
import MonthCardPlaceholder from './MonthCardPlaceholder';

const MonthsList = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const readings = useGlobalContext().readings;
	const apartment = useGlobalContext().apartment;
	const apartmentId = apartment._id;

	// Filter readings by apartment id and sort by readingDate
	const filteredReadings = readings.filter(reading => reading.apartmentId === apartmentId);
	readings.sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));

	// Set isLoaded to true when readings are fetched
	useEffect(() => {
		if(filteredReadings.length > 0) {
			// Simulate longer loading time for demo purposes.
			setTimeout(() => {
				setIsLoaded(true);
			}, 1500);
		}
	}, [filteredReadings]);

	// Create placeholder array for loading animation
	const cardLoadingPlaceholder = [];
	for (let i = 0; i < 6; i++) {
		cardLoadingPlaceholder.push(i);
	}
	
	// Framer motion variants
	const listContainer = {
		hidden: { opacity: 1 },
		visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
	};

	const listItem = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 }
	};

	return (
		<>
		<h2 className="mt-16 mb-10 text-xl md:text-2xl font-semibold">Consumptions by month</h2>
			<div className="buttons flex justify-between items-center mb-6">
				<div className="flex gap-2">
					<button className="btn btn-outline btn-smaller">All years</button>
					<button className="btn btn-outline btn-smaller">2023</button>
					<button className="btn btn-outline btn-smaller">2022</button>
					<button className="btn btn-outline btn-smaller">2021</button>
				</div>
				<div className="flex gap-3">
					<button className="btn btn-outline btn-smaller">Grid</button>
					<button className="btn btn-outline btn-smaller">List</button>
				</div>
			</div>
			<motion.div
				className="grid grid-flow-row grid-cols-3 gap-11"
				variants={listContainer}
				initial="hidden"
				animate={isLoaded ? 'visible' : 'hidden'}
			>
				{ isLoaded && (
					filteredReadings.map((reading, index) => {
						// Get previous reading index for consumption calculation
						const prevReading = index + 1 < filteredReadings.length ? filteredReadings[index + 1] : 0;

						return (
							<motion.div key={index}
								variants={listItem}
							>
								<MonthCard
									month={reading.month}
									year={reading.year}
									prevReading={prevReading.reading}
									reading={reading.reading}
									readingDate={reading.readingDate}
									paid={reading.paid}
									// paid = {true}
								/>
							</motion.div>
						)
					})
				)}

				{ !isLoaded && (
					cardLoadingPlaceholder.map((card, index) => {
						return (
							<MonthCardPlaceholder key={index} />
						)
					})
				)}

			</motion.div>
		</>
	);
};

export default MonthsList;
