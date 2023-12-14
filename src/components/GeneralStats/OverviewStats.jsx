import {
	BuildingOfficeIcon,
	EnvelopeIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import useGlobalContext from '../../hooks/useGlobalContext';
import { readingsFilterSorter } from '../../utils/readingsUtils';

const OverviewStats = () => {
	const { state } = useGlobalContext();
	const apartmentNo = state.apartment.apartmentNo;
	const apartmentId = state.apartment._id;
	const owner = state.apartment.ownerName;
	const userEmail = state.user.emailAddresses[0].emailAddress;
	const readings = state.readings;
	const filteredSortedReadings = readingsFilterSorter(readings, apartmentId);
	const lastIndex = filteredSortedReadings[0].reading;
	const consumption =
		filteredSortedReadings[0].reading - filteredSortedReadings[1].reading;
	const overDueReadings = filteredSortedReadings.filter(
		(reading) => reading.paid === false,
	);
	const priceCubicMeter = import.meta.env.VITE_PRICE_MC;

	// Calculate total due
	let totalDue = 0;

	overDueReadings.map((reading, index) => {
		const prevReading =
			index + 1 < filteredSortedReadings.length
				? filteredSortedReadings[index + 1]
				: 0;
		const cubicMeters = reading.reading - prevReading.reading;
		totalDue += Math.ceil(cubicMeters * priceCubicMeter);

		return totalDue;
	});

	return (
		<div className="flex flex-col w-full lg:w-2/5 gap-16 lg:gap-20 items-start">
			<div className="flex md:justify-start items-start gap-5">
				<BuildingOfficeIcon className="h-11 w-11 stroke-wom-primary fill-wom-primary stroke-1.5" />
				<div className="leading-8">
					<h2 className="text-3xl md:text-4xl font-bold whitespace-nowrap mb-8">
						Apartment {apartmentNo}
					</h2>
					<UserIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
					{owner}
					<br />
					<EnvelopeIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
					<a
						className="lowercase text-wom-primary hover:underline"
						href={`mailto:${userEmail}`}
					>
						{userEmail}
					</a>
				</div>
			</div>
			<div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:w-auto gap-4 lg:gap-10">
				<div className="whitespace-nowrap">
					<p className="text-xs pb-2 sm:pb-3 leading-1 text-slate-400 uppercase">
						Last index reading
					</p>
					<h3 className="text-3xl lg:text-3xl font-semibold">
						{lastIndex}
					</h3>
				</div>
				<div className="lg:pl-8 lg:border-l border-gray-200 whitespace-nowrap">
					<p className="text-xs pb-2 sm:pb-3 leading-1 text-slate-400 uppercase">
						Last consumption
					</p>
					<h3 className="text-3xl lg:text-3xl whitespace-nowrap font-semibold">
						{consumption}
						<span className="text-base font-normal"> mc</span>
					</h3>
				</div>
				<div className="lg:pl-8 lg:border-l border-gray-200 whitespace-nowrap">
					<p className="text-xs pb-2 sm:pb-3 leading-1 text-slate-400 uppercase">
						Total due
					</p>
					<h3
						className={`text-3xl lg:text-3xl whitespace-nowrap font-semibold ${
							totalDue > 0 ? 'text-red-600' : ''
						}`}
					>
						{totalDue}
						<span className="text-base font-normal"> RON</span>
					</h3>
				</div>
			</div>
		</div>
	);
};

export default OverviewStats;
