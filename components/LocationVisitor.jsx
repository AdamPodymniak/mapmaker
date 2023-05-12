import Image from 'next/image';

const LocationVisitor = ({ location, handleCloseEditor, isUrlValid }) => {
    return (
        <div className="fixed right-0 z-[1000] flex flex-col bg-slate-50 font-semibold list-none px-5 py-5 h-[90vh] w-96 overflow-auto min-w-0">
                <h3 className="text-2xl text-center">View location</h3>
                    <h3 className="text-lg">{location.title}</h3>
                    <h3>{location.description}</h3>
                {location.image && isUrlValid && (
                    <Image
                        src={location.image}
                        alt="map image"
                        width={600}
                        height={600}
                        className="rounded-md my-3"
                    />
                )}
                <div className="w-full text-center mt-2 flex justify-around">
                    <button
                        onClick={handleCloseEditor}
                        className="bg-neutral-100 hover:bg-neutral-200 ease-in-out duration-300 p-2 rounded-md h-12 w-28"
                    >
                        Close
                    </button>
                </div>
        </div>
    )
}

export default LocationVisitor