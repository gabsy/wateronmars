import { useState, useEffect } from 'react';
import MonthCard from './MonthCard';
import useGlobalContext from '../hooks/useGlobalContext';

const MonthsList = () => {
	const consumptions = useGlobalContext().apartment.consumptions;
	const [isLoaded, setIsLoaded] = useState(false);
	let delay = 0.2;

	useEffect(() => {
		if(consumptions.length > 0) {
			// Simulate longer loading time for demo purposes.
			setTimeout(() => {
				setIsLoaded(true);
			}, 1000);
		}
	}, [consumptions]);

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
			<div className="grid grid-flow-row grid-cols-3 gap-11">
				{ consumptions.length > 0 && (
					consumptions.map((consumption, index) => {
						// Get previous reading index for consumption calculation
						const prevReading = index + 1 < consumptions.length ? consumptions[index + 1]?.reading : 0;
						delay += 0.2;

						return (
							<MonthCard
								key={index}
								month={consumption.month}
								year={consumption.year}
								prevReading={prevReading}
								reading={consumption.reading}
								readingDate={consumption.reading_date}
								paid={consumption.paid}
								isLoaded={isLoaded}
								delay={delay}
							/>
						)
					})
				)}
			</div>
		</>
	);
};

export default MonthsList;
