import {
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	// AreaChart,
	// Area,
	BarChart,
	Bar,
	Legend,
	Rectangle,
	ResponsiveContainer,
} from 'recharts';

const Chart = ({ data }) => {
	return (
		<div className="text-xs color-red w-3/5">
			{/* <ResponsiveContainer width="100%" height={280}>
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
			</ResponsiveContainer> */}
			<ResponsiveContainer width="100%" height={320}>
				<BarChart
				data={data}
				width="100%"
				margin={{ top: 16, right: 0, left: -24, bottom: 0 }}
				>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" stroke="#bbb"/>
				<YAxis
						stroke="#bbb"
						label={{
							value: 'Consumption (mc)',
							angle: -90,
							position: 'center',
						}}
					/>
				<Tooltip cursor={{fill: 'transparent'}}/>
				<Legend />
				<Bar dataKey="mc" fill="#617AFF" barSize={20} radius={[20, 20, 0, 0]} activeBar={<Rectangle fill="#617AFF"/>} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
