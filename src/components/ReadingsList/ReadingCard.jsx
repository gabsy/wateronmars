import iconFlag from '../../assets/icons/icon-flag.svg';
import iconCheck from '../../assets/icons/icon-check.svg';
import iconDrop from '../../assets/icons/icon-drop.svg';
import { formatDate } from '../../utils/formatDate';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import Modal from '../Modal';
import { EditReadingForm } from '../Forms';
import useModal from '../../hooks/useModal';

const ReadingCard = ({
	readingId,
	month,
	year,
	reading,
	readingDate,
	paid,
	prevReading,
	userRole,
}) => {
	// Set the oldest reading as previous reading
	prevReading = prevReading || reading;

	const { isOpen, openModal, closeModal, selectedModal } = useModal();
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

	const deleteReading = () => {
		// console.log('delete reading');
	};

	return (
		<>
			<div className="flex flex-col bg-white gap-6 lg:gap-8 p-7 rounded-3xl hover:scale-105 hover:shadow-sm hover:shadow-slate-200 transition-all duration-300 relative">
				{/* Reading card Actions */}
				{userRole === 'admin' && (
					<div className="flex justify-end items-center absolute bottom-6 left-7 gap-3">
						{/* Edit reading */}
						<button
							onClick={() => openModal('editReading')}
							className="hover:text-wom-primary hover:border-wom-primary transition-all duration-200 leading-none rounded-full border border-gray-300 p-1.5 text-gray-500"
						>
							<PencilIcon className="h-4 w-4 inline-block align-top" />
						</button>
						{/* Delete reading */}
						<button
							onClick={deleteReading()}
							className=" hover:text-red-600 hover:border-red-600 transition-all duration-200 leading-none rounded-full border border-gray-300 p-1.5 text-gray-500"
						>
							<TrashIcon className="h-4 w-4 inline-block align-top" />
						</button>
					</div>
				)}

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
					<div className="flex text-sm gap-2 items-center rounded-full px-2.5 py-1 mt-2 bg-gray-600 text-white">
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
				<div className="flex items-end justify-end gap-3 pt-5 border-t border-gray-200">
					<div className="uppercase text-xs">Total amount:</div>
					<div
						className={`uppercase leading-none text-2xl font-semibold ${isPaidText}`}
					>
						{totalDue}
						<span className="text-sm font-normal leading-none ml-1">
							RON
						</span>
					</div>
				</div>
			</div>

			{/* Edit reading modal */}
			{userRole === 'admin' && selectedModal === 'editReading' && (
				<Modal
					content={<EditReadingForm readingId={readingId} />}
					isOpen={isOpen}
					onClose={closeModal}
				/>
			)}
		</>
	);
};

export default ReadingCard;
