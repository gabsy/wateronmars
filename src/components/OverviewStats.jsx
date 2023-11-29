import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import useGlobalContext from '../hooks/useGlobalContext';

const OverviewStats = () => {
	const aptNumber = useGlobalContext().apartment.apartment_no;
	const owner = useGlobalContext().user.fullName;
	const overdue = true;
	const consumption = 9;
	const totalDue = 126;
	const lastIndex = 1254;
	const userEmail = useGlobalContext().user.emailAddresses[0].emailAddress;


	return (
		<div className="flex flex-col w-2/5 gap-24 mb-8 items-start">
			<div className="flex flex-row-reverse pb-10 lg:pb-0 w-full justify-between md:justify-start md:flex-row items-start gap-5">
				<BuildingOfficeIcon className="h-10 w-10 stroke-black"/>
				<div className="pt-0.5">
					<h2 className="text-4xl font-bold whitespace-nowrap">Apartment {aptNumber}</h2>
					<p className="font-medium text-sm uppercase pt-3 leading-relaxed">{owner}<br/>
						<a 
							className="lowercase text-wom-primary hover:underline" 
							href={`mailto:${userEmail}`}>{userEmail}
						</a>
					</p>
				</div>
			</div>
			<div className="flex flex-wrap md:flex-nowrap justify-between w-full lg:w-1/2 gap-x-5 gap-y-5 sm:gap-y-0 md:gap-x-16">
				<div>
					<p className="text-sm text-gray-500 pb-2 sm:pb-3 leading-1">
						Last index reading
					</p>
					<h3 className="text-2xl md:text-3xl whitespace-nowrap font-semibold">{lastIndex}</h3>
				</div>
				<div className="lg:pl-10 lg:border-l border-gray-200">
					<p className="text-sm text-gray-500 pb-2 sm:pb-3 leading-1">
						Last consumption
					</p>
					<h3 className="text-2xl md:text-3xl whitespace-nowrap font-semibold">
						{consumption}
						<span className="text-base font-normal"> mc</span>
					</h3>
				</div>
				<div className="lg:pl-10 lg:border-l border-gray-200">
					<p className="text-sm text-gray-500 pb-2 sm:pb-3 leading-1">
						Total<br/> due amount
					</p>
					<h3
						className={`text-2xl md:text-3xl whitespace-nowrap font-semibold ${
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
