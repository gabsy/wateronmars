import iconFlag from '../assets/icons/icon-flag.svg';
import iconCheck from '../assets/icons/icon-check.svg';
import iconDrop from '../assets/icons/icon-drop.svg';
import { formatDate } from '../utils/formatDate';

const ReadingCard = ({
	month,
	year,
	reading,
	readingDate,
	paid,
	prevReading,
}) => {
	const isPaid = paid;
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
			<div className="flex flex-col bg-white gap-8 px-7 py-7 rounded-3xl hover:scale-105 hover:shadow-md hover:shadow-slate-200 transition-all duration-300">
				<div className="flex justify-between items-start">
					<div className="flex gap-3 items-center">
						<div className={`rounded-full p-2 ${isPaidIconHallow}`}>
							<img
								src={isPaidIcon}
								alt="icon flag"
								className={`rounded-full p-2 ${isPaidIconBg}`}
							/>
						</div>
						<h3
							className={`font-semibold text-md leading-tight whitespace-pre-line ${
								isPaid ? 'text-wom-primary' : ''
							}`}
						>
							{isPaid ? 'Paid.\nThank you!' : 'Payment\nOverdue'}
						</h3>
					</div>
					<div className="flex text-xs gap-2 items-center rounded-full px-2 py-1 mt-2 bg-gray-600 text-white">
						{monthShort} {year}
					</div>
				</div>
				<div className="flex justify-between items-start">
					<div className="flex flex-col gap-1">
						<p className="text-xs text-slate-400 leading-none uppercase">
							Index
						</p>
						<p className="text-2xl font-medium">
							{reading}
							<span className="text-xs font-normal">
								{' '}
								/ {formatedReadingDate}
							</span>
						</p>
					</div>

					<div className="flex flex-col gap-1 text-right">
						<p className="text-xs text-gray-400 leading-none uppercase">
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
				<div className="flex items-end justify-end gap-4 pt-5 border-t border-gray-200">
					<div className="uppercase text-xs mr-1">Total amount:</div>
					<div
						className={`uppercase leading-none text-2xl font-semibold ${isPaidText}`}
					>
						{totalDue}
						<span className="text-sm font-normal leading-none">
							{' '}
							RON
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReadingCard;