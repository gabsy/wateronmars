const Container = ({ children, title }) => {
	return (
		<div className="max-w-screen-2xl mx-auto">
			{title && (
				<h1 className="text-3xl md:text-4xl font-semibold my-8 lg:mb-12 px-2">
					{title}
				</h1>
			)}
			{children}
		</div>
	);
};

export default Container;
