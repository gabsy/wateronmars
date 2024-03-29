import './Modal.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Modal = ({ content, isOpen, onClose }) => {
	const screenSize = window.innerWidth > 768;

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
						initial={{
							opacity: 0,
							scale: 0.94,
							translateX: '-50%',
							translateY: screenSize ? '-50%' : '0',
						}}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.5,
							ease: [0, 0.71, 0.2, 1.01],
						}}
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
