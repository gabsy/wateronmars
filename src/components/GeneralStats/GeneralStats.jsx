import Chart from '../Chart';
import OverviewStats from './OverviewStats';
import { motion } from 'framer-motion';
import useGlobalContext from '../../hooks/useGlobalContext';
import { readingsFilterSorter } from '../../utils/readingsUtils';

const GeneralStats = () => {
	const { state } = useGlobalContext();
	const apartmentId = state.apartment._id;
	const readings = state.readings;
	const filteredSortedReadings = readingsFilterSorter(readings, apartmentId);

	// Get the latest 13 items of filteredSortedReadings and reverse the array
	filteredSortedReadings.splice(13);
	filteredSortedReadings.reverse();

	// Create chart data with last 12 months
	const chartData = [];
	// Loop through the last 12 months
	for (let i = 1; i < 13; i++) {
		const reading = filteredSortedReadings[i];
		const month = reading?.month;
		const consumption =
			reading?.reading - filteredSortedReadings[i - 1]?.reading;

		chartData.push({
			month,
			mc: consumption,
		});
	}

	return (
		<motion.div
			className="flex gap-6 px-7 py-8 lg:px-10 lg:py-12 mb-10 lg:mb-16 bg-white rounded-xl shadow-sm shadow-slate-200"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.5,
			}}
		>
			<OverviewStats />
			<Chart data={chartData} />
		</motion.div>
	);
};

export default GeneralStats;
