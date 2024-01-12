import './Hexagon.css';

const Hexagon = ({ children, customClasses }) => {
	return (
		<div className={`hexagon ${customClasses}`}>
			<div className="absolute h-full w-full flex flex-col items-center justify-center">
				{children}
			</div>
		</div>
	);
};

export default Hexagon;
