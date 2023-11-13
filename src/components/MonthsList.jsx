import MonthCard from './MonthCard';
import useGlobalContext from '../hooks/useGlobalContext';

const MonthsList = () => {
	const consumptions = useGlobalContext().apartment.consumptions;

	return (
		<>
		<h2 className="mt-20 mb-12 text-2xl font-semibold">Consumptions by month</h2>
			<div className="buttons flex justify-between items-center mb-10">
				<div className="flex gap-3">
					<button className="btn btn-primary">All years</button>
					<button className="btn btn-secondary">2023</button>
					<button className="btn btn-secondary">2022</button>
					<button className="btn btn-secondary">2021</button>
				</div>
				<div className="flex gap-3">
					<button className="btn btn-tertiary">Grid</button>
					<button className="btn btn-tertiary">List</button>
				</div>
			</div>
			<div className="grid grid-flow-row grid-cols-3 gap-11">
				{ consumptions.length > 0 && (
					consumptions.map((consumption, index) => {
						// Get previous reading index for consumption calculation
						const prevReading = index + 1 < consumptions.length ? consumptions[index + 1]?.reading : 0;

						return (
							<MonthCard
								key={index}
								month={consumption.month}
								year={consumption.year}
								prevReading={prevReading}
								reading={consumption.reading}
								readingDate={consumption.reading_date}
								paid={consumption.paid}
							/>
						)
					})
				)}
			</div>
		</>
	);
};

export default MonthsList;
