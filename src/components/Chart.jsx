import {
	XAxis,
	YAxis,
	Tooltip,
	AreaChart,
	Area,
	ResponsiveContainer,
} from 'recharts';

import iconDrop from '../assets/icons/icon-drop.svg';

const Chart = ({ data }) => {
	return (
		<div className="font-light text-sm w-3/5">
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart
					data={data}
					margin={{ top: 10, right: 0, left: -24, bottom: 0 }}
					responsive={true}
				>
					<defs>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#516AFF" stopOpacity={0.1}/>
							<stop offset="95%" stopColor="#516AFF" stopOpacity={0}/>
						</linearGradient>
					</defs>
					<XAxis dataKey="name" stroke="#999" strokeWidth="0"/>
					<YAxis
						stroke="#999"
						strokeWidth="0"
						padding={{ bottom: 20 }}
						margin={{ left: 20 }}
					/>
					<Tooltip content={<CustomTooltip active={false} payload={[]} label={""} />} />
					<Area
						type="monotone"
						dataKey="mc"
						stroke="#617AFF"
						strokeWidth="2"
						fillOpacity={1}
						activeDot={{ r: 4 }}
						fill="url(#colorPv)"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

// Custom tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="px-4 py-2 shadow bg-white">
        <span className="font-semibold text-sm">{label}</span>
        {payload.map((ele, index) => (
          <>
            <div key={index} className="mt-1 flex text-sm text-wom-primary">
               <img src={iconDrop} className="baseline mr-1"/> {ele.value} {ele.name}
            </div>
          </>
        ))}
      </div>
    );
  }
  return null;
};

export default Chart;
