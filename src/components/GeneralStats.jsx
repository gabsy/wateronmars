import Chart from './Chart';
import OverviewStats from './OverviewStats';

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
		<div className="general-stats flex flex-col gap-10">
			<OverviewStats />
			<Chart data={chartData} />
		</div>
	);
};

export default GeneralStats;
