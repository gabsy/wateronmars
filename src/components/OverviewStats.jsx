import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import useGlobalContext from '../hooks/useGlobalContext';
import { readingsFilterSorter } from '../utils/readingsUtils';

const OverviewStats = () => {
	const apartmentNo = useGlobalContext().apartment.apartmentNo;
	const apartmentId = useGlobalContext().apartment._id;
	const owner = useGlobalContext().apartment.ownerName;
	const userEmail = useGlobalContext().user.emailAddresses[0].emailAddress;
	const readings = useGlobalContext().readings;
	const filteredSortedReadings = readingsFilterSorter(readings, apartmentId);
	const lastIndex = filteredSortedReadings[0].reading;
	const consumption = filteredSortedReadings[0].reading - filteredSortedReadings[1].reading;
	const overDueReadings = filteredSortedReadings.filter(reading => reading.paid === false);
	const priceCubicMeter = import.meta.env.VITE_PRICE_MC;

	let totalDue = 0;

	overDueReadings.map((reading, index) => {
		const prevReading = index + 1 < filteredSortedReadings.length ? filteredSortedReadings[index + 1] : 0;
		const cubicMeters = reading.reading - prevReading.reading;
		totalDue += Math.ceil(cubicMeters * priceCubicMeter);

		return totalDue;
	});

	return (
		<div className="flex flex-col w-2/5 gap-16 mb-8 items-start">
			<div className="flex flex-row-reverse pb-10 lg:pb-0 w-full justify-between md:justify-start md:flex-row items-start gap-5">
				<BuildingOfficeIcon className="h-11 w-11 stroke-wom-primary fill-wom-primary stroke-1"/>
				<div>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap">Apartment {apartmentNo}</h2>
					<p className="font-medium uppercase pt-8 leading-relaxed">
						{owner}<br/>
						<a
							className="lowercase text-wom-primary hover:underline" 
							href={`mailto:${userEmail}`}>{userEmail}
						</a>
					</p>
				</div>
			</div>
			<div className="flex flex-wrap md:flex-nowrap justify-between w-full lg:w-1/2 gap-x-5 gap-y-5 sm:gap-y-0 md:gap-x-16">
				<div className="whitespace-nowrap">
					<p className="text-sm pb-2 sm:pb-3 leading-1">
						Last index reading
					</p>
					<h3 className="text-3xl lg:text-4xl font-semibold">{lastIndex}</h3>
				</div>
				<div className="lg:pl-8 lg:border-l border-gray-200 whitespace-nowrap">
					<p className="text-sm pb-2 sm:pb-3 leading-1">
						Last consumption
					</p>
					<h3 className="text-3xl lg:text-4xl whitespace-nowrap font-bold">
						{consumption}
						<span className="text-base font-normal"> mc</span>
					</h3>
				</div>
				<div className="lg:pl-8 lg:border-l border-gray-200 whitespace-nowrap">
					<p className="text-sm pb-2 sm:pb-3 leading-1">
						Total due
					</p>
					<h3
						className={`text-3xl lg:text-4xl whitespace-nowrap font-semibold ${
							totalDue > 0 ? 'text-red-600' : ''
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
