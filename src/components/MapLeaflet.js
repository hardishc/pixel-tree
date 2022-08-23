import {Circle, MapContainer, Marker, Popup, TileLayer, LayersControl, Tooltip} from 'react-leaflet'
import {useEffect, useState} from "react";
import axios from "axios";
import customMarker from './assets/tree-color-icon.svg';
import L from 'leaflet';
import {Button} from "@mui/material";
const {MainLayer} = LayersControl

const iconPerson = new L.Icon({
    iconUrl: customMarker,
    iconRetinaUrl: customMarker,
    popupAnchor:  [-0, -0],
    iconSize: [20],
});

function MapLeaflet () {
    const defaultCenter = [51.041394, -114.063579];
    const [trees, setTrees] = useState();
    const [day, setDay] = useState(true)

    const NightMap = () => (
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url=" 	https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
    )

    const DayMap = () => (
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
    )

    useEffect(() => {
        axios.get(`https://data.calgary.ca/resource/tfs4-3wwa.json?$where=heritage_trees='Y'&$limit=50000`)
            .then(res => {
                const data = res.data
                setTrees(data);
            })
    }, []);

    return (
        <>
            <Button onClick={()=>setDay(!day)}>Change mode</Button>
            <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true}>
                {day ?
                    <DayMap/>
                    :
                    <NightMap/>
                }
                {trees &&
                    <>
                        {trees.map((marker) => {
                            const lat = marker.point.coordinates[1]
                            const lng = marker.point.coordinates[0]
                            return (
                                <Marker position={[lat,lng]} key={marker.wam_id} icon={iconPerson} autoPanOnFocus={false}>
                                    <Tooltip>
                                        {marker.common_name}
                                    </Tooltip>
                                    <Popup>
                                        {marker.common_name}
                                    </Popup>
                                </Marker>
                            )})}
                    </>
                }
            </MapContainer>
        </>
    )
}

export default MapLeaflet