import './Modal.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Modal = ({ content, isOpen, onClose }) => {
	return (
		<>
			{isOpen && (
				<div className="modal">
					<div
						onClick={onClose}
						className="fixed inset-0 bg-slate-900/75 backdrop-blur"
					></div>
					<motion.div
						className="modal-content w-full rounded-lg p-6 md:p-12"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						{content}
						<button className="close-modal" onClick={onClose}>
							<XMarkIcon className="h-8 w-8 inline-block align-top transition-all stroke-gray-500 hover:rotate-90 p-2 bg-slate-100 rounded-full" />
							<span className="sr-only">Close modal</span>
						</button>
					</motion.div>
				</div>
			)}
		</>
	);
};

export default Modal;
