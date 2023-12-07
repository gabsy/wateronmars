import './Loader.css';

const Loader = () => {
	return (
		<div className="flex flex-col bg-wom-bgGlobal fixed justify-center top-0 bottom-0 left-0 right-0 items-center">
			<div className="loader">
				<label>●</label>
				<label>●</label>
				<label>●</label>
				<label>●</label>
				<label>●</label>
				<label>●</label>
			</div>
			<p className=" pt-2 text-md block">Fetching data...</p>
		</div>
	);
};

export default Loader;
