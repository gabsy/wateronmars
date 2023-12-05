const Container = ({children, title}) => {
	return (
		<div className="max-w-screen-2xl mx-auto">
			{ title && (
				<h1 className="text-4xl font-bold mb-12">{title}</h1>
			)}
			
			{children}
		</div>
	)
}

export default Container
