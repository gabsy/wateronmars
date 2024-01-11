const ReadingsListFilters = () => {
	return (
		<div className="buttons flex flex-col gap-6 md:flex-row justify-between md:items-center mb-8 px-2">
			<h2 className="text-xl md:text-xl font-semibold">
				Consumptions by month
			</h2>
			<div className="hidden lg:flex gap-3 pointer-events-none opacity-30">
				Filter by year:
				<button className="btn btn-outline btn-smaller">
					All years
				</button>
				<button className="btn btn-outline btn-smaller">2023</button>
				<button className="btn btn-outline btn-smaller">2022</button>
				<button className="btn btn-outline btn-smaller">2021</button>
			</div>
		</div>
	);
};

export default ReadingsListFilters;
