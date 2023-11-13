import iconbuilding from '../assets/icons/icon-building.svg';

const OverviewStats = () => {
	const aptNumber = 5;
	const owner = 'Andrei Flutur';
	const overdue = true;
	const consumption = 9;
	const totalDue = 126;
	const lastIndex = 1254;

	return (
		<div className="flex flex-nowrap w-full justify-between mb-4 items-start">
			<div className="pb-8">
				<div className="flex items-start gap-5">
					<img
						src={iconbuilding}
						alt="icon building"
						className="bg-[#6AD3BA] p-3 rounded-full"
					/>
					<div>
						<h2 className="text-4xl font-bold">Apartment {aptNumber}</h2>
						<p className="text-gray-500 text-sm uppercase pt-3">{owner}</p>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-x-16">
				<div className="pl-10 border-l border-[#e8eff6]">
					<p className="text-xs text-gray-500 pb-3 leading-none uppercase">
						Last index reading
					</p>
					<h3 className="text-3xl font-semibold">{lastIndex}</h3>
				</div>
				<div className="pl-10 border-l border-gray-200">
					<p className="text-xs text-gray-500 pb-3 leading-none uppercase">
						Last consumption
					</p>
					<h3 className="text-3xl font-semibold">
						{consumption}
						<span className="text-base"> mc</span>
					</h3>
				</div>
				<div className="pl-10 border-l border-gray-200">
					<p className="text-xs text-gray-500 pb-3 leading-none uppercase">
						Total due amount
					</p>
					<h3
						className={`text-3xl font-semibold ${
							overdue ? 'text-red-600' : ''
						}`}
					>
						{totalDue}
						<span className="text-base font-normal">.00 RON</span>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default OverviewStats;
