import {
	BuildingOfficeIcon,
	EnvelopeIcon,
	UserIcon,
	PhoneIcon,
} from '@heroicons/react/24/outline';
import useGlobalContext from '../../hooks/useGlobalContext';
import { readingsFilterSorter } from '../../utils/readingsUtils';
import ApartmentDropdown from './ApartmentDropdown';

const OverviewStats = ({ apartmentId }) => {
	const { state } = useGlobalContext();
	const userRole = state.userRole;
	const apartment = state.apartments.find(
		(apartment) => apartment._id === apartmentId,
	);
	const apartmentNo = apartment.apartmentNo;
	const owner = apartment.ownerName;
	const userEmail = apartmentId
		? apartment.ownerEmail
		: state.user.emailAddresses[0].emailAddress;
	const ownerPhoneNo = apartment.ownerPhoneNo;
	const readings = state.readings;
	const filteredSortedReadings = readingsFilterSorter(readings, apartmentId);
	const lastIndex = filteredSortedReadings[0].reading;
	const lastConsumption =
		filteredSortedReadings[0].reading - filteredSortedReadings[1].reading;
	const priceCubicMeter = import.meta.env.VITE_PRICE_MC;

	// Calculate total due
	let totalDue = 0;
	const overDueReadings = filteredSortedReadings.filter(
		(reading) => reading.paid === false,
	);

	overDueReadings.map((reading, index) => {
		const prevReading =
			index + 1 < filteredSortedReadings.length
				? filteredSortedReadings[index + 1]
				: 0;
		const cubicMeters = reading.reading - prevReading.reading;
		totalDue += Math.ceil(cubicMeters * priceCubicMeter) + 15;

		return totalDue;
	});

	return (
		<div className="flex flex-col w-full lg:w-2/5 gap-10 lg:gap-16 items-start">
			<div className="flex flex-row sm:flex-row md:justify-start items-start gap-5 w-full">
				<div className="leading-10">
					<h2 className="text-3xl md:text-4xl font-semibold whitespace-nowrap mb-8 flex">
						Apartment {apartmentNo}
						{userRole === 'admin' && <ApartmentDropdown />}
					</h2>
					<UserIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
					{owner}
					<br />
					<EnvelopeIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
					<a
						className="lowercase text-wom-primary hover:underline break-all"
						href={`mailto:${userEmail}`}
					>
						{userEmail}
					</a>
					<br />
					<PhoneIcon className="h-5 w-5 inline-block mr-3 stroke-wom-primary" />
					{ownerPhoneNo}
				</div>
				<BuildingOfficeIcon className="h-11 w-11 hidden md:block stroke-wom-primary fill-wom-primary stroke-1.5" />
			</div>
			<div className="flex flex-wrap lg:flex-nowrap justify-between w-full lg:w-auto gap-4 lg:gap-16">
				{/* Create stand alone component for these items */}
				<div className="whitespace-nowrap">
					<p className="text-xs pb-2 sm:pb-3 leading-1 text-slate-400 uppercase">
						Last reading
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
						{lastConsumption}
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
