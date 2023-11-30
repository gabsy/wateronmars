import "./Modal.css";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const Modal = ({ content, title, isOpen, onClose }) => {
	if(isOpen) {
		document.body.classList.add('active-modal');
	} else {
		document.body.classList.remove('active-modal');
	}

	return (
		<>
			{isOpen && (
				<div className="modal">
					<div onClick={onClose} className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"></div>
					<motion.div
						className="modal-content w-full rounded-lg p-6 md:p-12 shadow-lg shadow-gray-400"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<h2 className="text-3xl font-bold pb-10">{title}</h2>
						{content}
						<button className="close-modal" onClick={onClose}>
							<XMarkIcon className="h-8 w-8 inline-block align-top transition-all stroke-gray-500 hover:rotate-90"/>
							<span className="sr-only">Close modal</span>
						</button>
					</motion.div>
				</div>
			)}
		</>
	);
}

export default Modal
