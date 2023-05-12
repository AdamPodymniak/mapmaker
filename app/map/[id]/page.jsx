'use client'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import LocationNav from '@components/LocationNav';
import LocationEditor from '@components/LocationEditor';
import LocationVisitor from '@components/LocationVisitor';

const EditMap = ({ params }) => {

    const LeafIcon = L.Icon.extend({
        options: {}
    });
    
    const blueIcon = new LeafIcon({
        iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
        }),
        greenIcon = new LeafIcon({
          iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    });

    const { data: session } = useSession();

    const mapRef = useRef(null);

    const [mapData, setMapData] = useState();
    const [navLocations, setNavLocations] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState("");
    const [isEditorActive, setIsEditorActive] = useState(false);
    const [isEditingType, setIsEditingType] = useState(false);
    const [isUrlValid, setIsUrlValid] = useState(false);
    const [locationId, setLocationId] = useState();
    const [isViewerCreator, setIsViewerCreator] = useState(false);
    const [location, setLocation] = useState({
        mapId: params.id,
        title: '',
        description: '',
        image: '',
        layer: 'default'
    });

    useEffect(()=>{
        const fetchLocations = async() => {
            const response = await fetch(`/api/location/${params.id}`);
            const data = await response.json();
            setNavLocations(data);
        }
        fetchLocations();
        const fetchMap = async() => {
            const response = await fetch(`/api/map/${params.id}`);
            const data = await response.json();
            setMapData(data);
        }
        fetchMap();
    }, []);

    useEffect(()=>{
        if(mapData?.creator._id === session?.user.id && mapData !== undefined) setIsViewerCreator(true);
        else setIsViewerCreator(false)
    })
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const map = mapRef.current;
        if(selectedPosition.split(",").length === 2
        && parseFloat(selectedPosition.split(",")[0]) >= -90 && parseFloat(selectedPosition.split(",")[0]) <= 90
        && parseFloat(selectedPosition.split(",")[1]) >= -180 && parseFloat(selectedPosition.split(",")[1]) <= 180) {
            map.setView(selectedPosition.split(","), 15);
            setLocation(prevLocation=>({
                ...prevLocation,
                title: '',
                description: '',
                image: '',
            }))
            setIsEditorActive(true);
            setIsEditingType(false);
            setLocationId();
        }
    }

    const handleLocationClick = ({ title, description, image, id, lat, lng }) => {
        const map = mapRef.current;
        map.setView([lat, lng], 15);
        setLocation(prevLocation => ({
            ...prevLocation,
            title,
            description,
            image
        }));
        setIsEditorActive(true);
        setIsEditingType(true);
        setLocationId(id);
        isImgValid(image);
    }

    const handleCloseEditor = () => {
        setIsEditorActive(false);
        setSelectedPosition("");
    }

    const handleOnEditorCreate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/location/new", {
                method: "POST",
                body : JSON.stringify({
                    ...location,
                    lat: selectedPosition.split(",")[0],
                    lng: selectedPosition.split(",")[1],
                })
            });
            setIsEditorActive(false);
            let data = await response.json();
            setNavLocations(prevNavLocations=>([
                ...prevNavLocations,
                data
            ]));
            setSelectedPosition("");
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnEditorDelete = async (locationId) => {
        try {
            const response = await fetch(`/api/location/${locationId}`, { method: 'DELETE' });
            setNavLocations(navLocations.filter(l => l._id !== locationId));
            setIsEditorActive(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnEditorUpdate = async (e, locationId) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/location/${locationId}`, {
                method: 'PATCH',
                body: JSON.stringify(location)
            });
            let data = await response.json();
            setNavLocations(navLocations.filter(l => l._id !== locationId));
            setNavLocations(prevNavLocations => ([
                ...prevNavLocations,
                data
            ]));
            setIsEditorActive(false);
        } catch (error) {
            console.log(error);
        }
    }

    const isImgValid = (url) => {
        const img = new Image();
        img.src = url;
        img.onload = () => setIsUrlValid(true);
        img.onerror = () => setIsUrlValid(false);
    }

    return (
        <div>
            <LocationNav
                selectedPosition={selectedPosition}
                setSelectedPosition={setSelectedPosition}
                handleSearchSubmit={handleSearchSubmit}
                navLocations={navLocations}
                handleLocationClick={handleLocationClick}
                isViewerCreator={isViewerCreator}
                mapData={mapData}
            />
            {isViewerCreator ? <>
                {isEditorActive && (<LocationEditor
                    location={location}
                    setLocation={setLocation}
                    locationId={locationId}
                    handleOnEditorCreate={handleOnEditorCreate}
                    handleOnEditorDelete={handleOnEditorDelete}
                    handleOnEditorUpdate={handleOnEditorUpdate}
                    handleCloseEditor={handleCloseEditor}
                    isEditingType={isEditingType}
                    isImgValid={isImgValid}
                    isUrlValid={isUrlValid}
                />)}
            </> :
                <>
                    {isEditorActive && (<LocationVisitor
                        location={location}
                        isUrlValid={isUrlValid}
                        handleCloseEditor={handleCloseEditor}
                    />)}
                </>
            }
            <MapContainer
                className="w-screen h-[53.4rem]"
                center={[0,0]}
                zoom={2}
                zoomControl={false}
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {selectedPosition.split(",").length === 2
                && parseFloat(selectedPosition.split(",")[0]) >= -90 && parseFloat(selectedPosition.split(",")[0]) <= 90
                && parseFloat(selectedPosition.split(",")[1]) >= -180 && parseFloat(selectedPosition.split(",")[1]) <= 180
                &&(
                    <Marker className="hue-rotate-60" position={selectedPosition.split(",")} icon={greenIcon} />
                )}
                {navLocations?.map((m)=>(
                    <Marker
                        key={m._id}
                        icon={blueIcon}
                        position={[m.lat, m.lng]}
                        eventHandlers={{
                            click: () => {
                                handleLocationClick({
                                    title: m.title,
                                    description: m.description,
                                    image: m.image,
                                    id: m._id,
                                    lat: m.lat,
                                    lng: m.lng
                                })
                            }
                        }}
                    />
                ))}
            </MapContainer>
        </div>
    )
}

export default EditMap