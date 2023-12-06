import "./Hexagon.css";

const Hexagon = ({ children, ...props }) => {
  return (
		<div className={`hexagon ${props.customClasses}`}>
			<div className="absolute z-50 h-full w-full flex flex-col items-center justify-center">
				{children}
			</div>
		</div>
	)
}

export default Hexagon

