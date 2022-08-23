import {Circle, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {useEffect, useState} from "react";
import axios from "axios";

function MapLeaflet () {
    const defaultCenter = [51.041394, -114.063579];
 
    return (

        <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            }
        </MapContainer>

    )
}

export default MapLeaflet