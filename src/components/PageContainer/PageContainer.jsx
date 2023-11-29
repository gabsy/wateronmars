const Container = ({children, title}) => {
	return (
		<div className="max-w-screen-2xl bg-white mx-auto px-6 sm:px-12 py-8 md:pt-16 md:pb-20 rounded-xl main-bg shadow-gray-250 shadow-xl">
			{ title && (
				<h1 className="text-4xl font-bold mb-12">{title}</h1>
			)}
			
			{children}
		</div>
	)
}

export default Container
