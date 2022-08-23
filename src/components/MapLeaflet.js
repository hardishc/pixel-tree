import {Circle, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {useEffect, useState} from "react";
import axios from "axios";

function MapLeaflet () {
    const defaultCenter = [51.041394, -114.063579];
    const [trees, setTrees] = useState();

    useEffect(() => {
        axios.get(`https://data.calgary.ca/resource/tfs4-3wwa.json`)
            .then(res => {
                const data = res.data;
                setTrees(data);
            })
    }, []);
    return (

        <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {trees &&
                <>
                    {trees.map((marker) => {
                        const markerPos = marker.point.coordinates
                        return (
                            <Marker position={
                                [
                                    markerPos[1],
                                    markerPos[0]
                                ]} key={marker.wam_id}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        )})}
                </>
            }
        </MapContainer>

    )
}

export default MapLeaflet