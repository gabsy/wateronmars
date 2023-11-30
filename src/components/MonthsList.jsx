import { useState, useEffect } from 'react';
import MonthCard from './MonthCard';
import useGlobalContext from '../hooks/useGlobalContext';
import { motion } from 'framer-motion';
import MonthCardPlaceholder from './MonthCardPlaceholder';

const MonthsList = () => {
	const consumptions = useGlobalContext().apartment.consumptions;
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if(consumptions.length > 0) {
			// Simulate longer loading time for demo purposes.
			setTimeout(() => {
				setIsLoaded(true);
			}, 3000);
		}
	}, [consumptions]);

	const cardLoadingPlaceholder = [];

	for (let i = 0; i < 6; i++) {
		cardLoadingPlaceholder.push(i);
	}

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
					consumptions.map((consumption, index) => {
						// Get previous reading index for consumption calculation
						const prevReading = index + 1 < consumptions.length ? consumptions[index + 1]?.reading : 0;

						return (
							<motion.div key={index}
								variants={listItem}
							>
								<MonthCard
									month={consumption.month}
									year={consumption.year}
									prevReading={prevReading}
									reading={consumption.reading}
									readingDate={consumption.reading_date}
									paid={consumption.paid}
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
