import './Loader.css'

const Loader = () => {
  return (
    <div className="flex flex-col fixed justify-center top-0 bottom-0 left-0 right-0 items-center bg-[url('/bg-image3.jpg')]">
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
  )
}

export default Loader
