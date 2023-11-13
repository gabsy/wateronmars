import {
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	AreaChart,
	Area,
	ResponsiveContainer,
} from 'recharts';

const Chart = ({ data }) => {
	return (
		<div className="text-xs">
			<ResponsiveContainer width="100%" height={340}>
				<AreaChart
					data={data}
					margin={{ top: 10, right: 0, left: -24, bottom: 0 }}
					responsive={true}
				>
					<defs>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#617AFF" stopOpacity={0.5} />
							<stop offset="95%" stopColor="#617AFF" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" stroke="#bbb" />
					<YAxis
						stroke="#bbb"
						label={{
							value: 'Consumption (mc)',
							angle: -90,
							position: 'center',
						}}
					/>
					<CartesianGrid strokeDasharray="4 4" stroke="#dedede" />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="mc"
						stroke="#617AFF"
						strokeWidth="2"
						fillOpacity={1}
						activeDot={{ r: 6 }}
						fill="url(#colorPv)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
