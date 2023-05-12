const LocationNav = ({ selectedPosition, setSelectedPosition, handleSearchSubmit, navLocations, handleLocationClick, isViewerCreator, mapData }) => {
    return (
        <div className="fixed z-[1000] flex flex-col bg-slate-50 font-semibold list-none px-5 py-5 h-[90vh] w-80 overflow-auto min-w-0">
            <form onSubmit={handleSearchSubmit}>
                <h3 className="text-4xl">Map {mapData?.title}</h3>
                {isViewerCreator && <>
                    <h3 className="text-2xl">Search:</h3>
                    <div className="w-full flex my-2">
                        <input
                            className="search_input peer h-10 mr-3 hover:bg-neutral-50 ease-in-out duration-300"
                            placeholder="Search for locations"
                            type="text"
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-neutral-100 hover:bg-neutral-200 ease-in-out duration-300 p-2 rounded-md h-10"
                        >
                            Search
                        </button>
                    </div>
                </>}
            </form>
            <h3 className="text-2xl">Locations:</h3>
            <ul>
                {navLocations?.map((location, index)=>(
                    <li
                        key={location._id}
                        className="truncate cursor-pointer hover:bg-neutral-100 ease-in-out duration-300"
                        onClick={() => handleLocationClick({
                            title: location.title,
                            description: location.description,
                            image: location.image,
                            id: location._id,
                            lat: location.lat,
                            lng: location.lng
                        })}
                    >
                        {index+1}) {location.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LocationNav