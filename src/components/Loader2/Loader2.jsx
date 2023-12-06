import './Loader2.css'

const Loader2 = () => {
  return (
	<div className="flex flex-col bg-wom-bgGlobal fixed justify-center top-0 bottom-0 left-0 right-0 items-center">
        <div className="loader2 mb-8">
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
			<div className="particle"></div>
		</div>
        <p className=" pt-2 text-md block">Fetching data ...</p>
    </div>
  )
}

export default Loader2
