import { CheckCircleIcon } from '@heroicons/react/24/outline';

const ModalSuccess = ({ content, onClose }) => {
	return (
		<>
			<div className="text-green-500 text-xl text-center">
				<CheckCircleIcon className="w-20 h-20 align-top mb-5 mx-auto" />
				<p>{content}</p>
			</div>
			<div className="flex justify-center gap-4 mt-8">
				<button className="btn btn-outline" onClick={onClose}>
					Close
				</button>
			</div>
		</>
	);
};

export default ModalSuccess;
