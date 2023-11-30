import iconFlag from '../assets/icons/icon-flag.svg';
import iconCheck from '../assets/icons/icon-check.svg';
import iconDrop from '../assets/icons/icon-drop.svg';
import { formatDate } from '../utils/formatDate';

const MonthCard = ({month, year, reading, readingDate, paid, prevReading }) => {
	const isPaid = paid;
	// const isPaidBg = isPaid ? 'bg-wom-grayMediumLight' : 'bg-wom-grayLight';
	const isPaidBg = 'bg-wom-grayMediumLight';
	const isPaidIcon = isPaid ? iconCheck : iconFlag;
	const isPaidIconBg = isPaid ? 'bg-wom-primary' : 'bg-red-600';
	const isPaidIconHallow = isPaid ? 'bg-wom-grayMedium' : 'bg-red-100';
	const isPaidText = isPaid ? '' : 'text-red-600';

	const monthShort = month.substring(0, 3);
	const priceCubicMeter = import.meta.env.VITE_PRICE_MC;
	const formatedReadingDate = formatDate(readingDate);
	const cubicMeters = reading - prevReading;
	const totalDue = Math.ceil(cubicMeters * priceCubicMeter);

	return (
		<>
			<div className={`flex flex-col gap-6 p-6 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ${isPaidBg}`}>
				<div className="flex justify-between items-start">
					<div className="flex gap-3 items-center">
						<div className={`rounded-full p-2 ${isPaidIconHallow}`}>
							<img
								src={isPaidIcon}
								alt="icon flag"
								className={`rounded-full p-3 ${isPaidIconBg}`}
							/>
						</div>
						<h3 className="font-semibold text-lg leading-tight whitespace-pre-line">
							{isPaid ? 'Paid.\nThank you!' : 'Payment\nOverdue'}
						</h3>
					</div>
					<div
						className={`flex text-xs gap-2 items-center rounded-full px-3 py-1 mt-2
						${isPaid ? 'bg-black text-white' : 'bg-red-100 text-red-600'}`}
					>
						{monthShort} {year}
					</div>
				</div>
				<div className="flex justify-between items-start">
					<div className="flex flex-col gap-1">
						<p className="text-sm text-gray-500 leading-none">Index</p>
						<p className="text-2xl font-medium">{reading}
							<span className="text-xs font-normal"> / {formatedReadingDate}</span>
						</p>
					</div>

					<div className="flex flex-col gap-1 text-right">
						<p className="text-sm text-gray-500 leading-none">
							<img
								src={iconDrop}
								alt="Consumption"
								className="inline-block mr-2 baseline"
							/>
							Consumption
						</p>
						<p className="text-2xl font-medium">
							{cubicMeters}
							<span className="text-sm font-normal"> mc</span>
						</p>
					</div>
				</div>
				<div className="flex justify-between items-end pt-6 border-t border-gray-200">
					<div className="uppercase leading-none text-xs">Total amount</div>
					<div
						className={`uppercase leading-none text-2xl font-medium ${isPaidText}`}
					>
						{totalDue}
						<span className="text-sm font-normal">.00 RON</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default MonthCard;
