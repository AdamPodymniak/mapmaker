import Image from 'next/image';

const LocationEditor = ({ location, setLocation, locationId, handleOnEditorCreate, handleOnEditorDelete, handleOnEditorUpdate, handleCloseEditor, isEditingType, isImgValid, isUrlValid }) => {
    return (
        <div className="fixed right-0 z-[1000] flex flex-col bg-slate-50 font-semibold list-none px-5 py-5 h-[90vh] w-96 overflow-auto min-w-0">
            <form onSubmit={isEditingType ? (e)=>handleOnEditorUpdate(e, locationId) : handleOnEditorCreate}>
                <h3 className="text-2xl text-center">Edit location</h3>
                <label className="mt-2">
                    <h3 className="text-lg text-center">Title</h3>
                    <input
                        className="search_input peer h-10 mr-3 hover:bg-neutral-50 ease-in-out duration-300"
                        placeholder="Write your title here"
                        type="text"
                        value={location.title}
                        onChange={(e)=>setLocation(prevLocation=>({
                            ...prevLocation,
                            title: e.target.value
                        }))}
                    />
                </label>
                <label className="mt-2">
                    <h3 className="text-lg text-center">Description</h3>
                    <textarea
                        className="form_textarea peer h-10 mr-3 hover:bg-neutral-50 ease-in-out duration-300 shadow-md"
                        placeholder="Write your description here"
                        type="text"
                        value={location.description}
                        onChange={(e)=>setLocation(prevLocation=>({
                            ...prevLocation,
                            description: e.target.value
                        }))}
                    />
                </label>
                <label className="mt-2">
                    <h3 className="text-lg text-center">Image</h3>
                    <input
                        className="search_input peer h-10 mr-3 hover:bg-neutral-50 ease-in-out duration-300"
                        placeholder="Write your image URL here (optional)"
                        type="text"
                        value={location.image}
                        onChange={(e)=>{setLocation(prevLocation=>({
                            ...prevLocation,
                            image: e.target.value
                        }));
                        isImgValid(e.target.value);
                        }}
                    />
                </label>
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
                    <button
                        type="submit"
                        className="bg-neutral-100 hover:bg-neutral-200 ease-in-out duration-300 p-2 rounded-md h-12 w-28"
                    >
                        {isEditingType ? (<span>Update</span>) : (<span>Add</span>)}
                    </button>
                </div>
            </form>
            {isEditingType && (
                <div className="w-full text-center mt-2 flex justify-around">
                    <button
                        onClick={() => handleOnEditorDelete(locationId)}
                        className="bg-neutral-100 hover:bg-neutral-200 ease-in-out duration-300 p-2 rounded-md h-12 w-28"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default LocationEditor