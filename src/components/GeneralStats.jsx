import Chart from './Chart';
import OverviewStats from './OverviewStats';
import { motion } from 'framer-motion';

const GeneralStats = () => {
	const chartData = [
		{
			name: 'Ian',
			mc: 11,
		},
		{
			name: 'Feb',
			mc: 9,
		},
		{
			name: 'Mar',
			mc: 9,
		},
		{
			name: 'Apr',
			mc: 10,
		},
		{
			name: 'May',
			mc: 9,
		},
		{
			name: 'Jun',
			mc: 11,
		},
		{
			name: 'Aug',
			mc: 7,
		},
		{
			name: 'Sep',
			mc: 9,
		},
		{
			name: 'Oct',
			mc: 0,
		},
		{
			name: 'Nov',
			mc: 0,
		},
		{
			name: 'Dec',
			mc: 0,
		},
	];
	return (
		<motion.div
			className="flex gap-6 px-7 py-8 lg:px-12 lg:py-14 mb-10 lg:mb-16 bg-white rounded-3xl shadow-sm shadow-slate-200"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.3,
			}}
		>
			<OverviewStats />
			<Chart data={chartData} />
		</motion.div>
	);
};

export default GeneralStats;
