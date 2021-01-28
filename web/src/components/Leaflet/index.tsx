import React, { useCallback, useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap, MapConsumer } from "react-leaflet";
import { NumericLiteral } from "typescript";

import "./style.css";

interface Props 
{
    coords: {
        lat: number;
        lng: number;
    }
}

const UserLocation = () => {

    const [locationFound, setLocationFound] = useState(false);

    const map = useMap();

    map.locate();

    useMapEvents({
        locationfound(e) {

            if(!locationFound)
            {
                map.flyTo(e.latlng, 12);

                setLocationFound(true);
            }

        }
    });

    return null;

}

interface SelectedLocation {

    onLocationSelect: (location: Props) => void;

}

const Leaflet: React.FC<SelectedLocation> = ({ onLocationSelect }) => {

    const [markerLocation, setMarkerLocation] = useState<Props>({ coords: { lat: 0, lng: 0 } });

    useEffect(() => {

        onLocationSelect(markerLocation);

    }, [markerLocation.coords.lat, markerLocation.coords.lng])

    return(

        <MapContainer center={ [0, 0] } zoom={ 12 }>
            <TileLayer 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <UserLocation />

            <MapConsumer>
                {
                    function MarkerLocation()
                    {

                        const map = useMapEvents({

                            click(e) {

                                const newMarkerLocation = {
                                    coords: {
                                        lat: e.latlng.lat,
                                        lng: e.latlng.lng
                                    }
                                }
                    
                                setMarkerLocation(newMarkerLocation);
                    
                                map.flyTo([newMarkerLocation.coords.lat, newMarkerLocation.coords.lng], 12);                                

                            }

                        });

                        return markerLocation == null ? null :
                        (
                    
                            <Marker position={ [markerLocation.coords.lat, markerLocation.coords.lng] } />
                    
                        );

                    }
                }
            </MapConsumer>
        </MapContainer>

    );

}

export default Leaflet;
