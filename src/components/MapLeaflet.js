import {Circle, MapContainer, Marker, Popup, TileLayer, Tooltip} from 'react-leaflet'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import customMarker from './assets/tree-color-icon.svg';
import L from 'leaflet';
import {Button, Typography, TypographyVariants} from "@mui/material";
import MarkerClusterGroup from "react-leaflet-cluster";

// Custom Icon
const iconTree = new L.Icon({
    iconUrl: customMarker,
    iconRetinaUrl: customMarker,
    popupAnchor:  [-0, -0],
    iconSize: [20],
});

// Dark Map
const NightMap = () => (
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url=" 	https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
    />
)

// Light Map
const DayMap = () => (
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
    />
)

function MapLeaflet () {
    const defaultCenter = [51.041394, -114.063579];
    const [trees, setTrees] = useState();
    const [day, setDay] = useState(true)

    useEffect(() => {
        axios.get(`https://data.calgary.ca/resource/tfs4-3wwa.json?$where=heritage_trees='Y'&$limit=50000`)
            .then(res => {
                const data = res.data
                setTrees(data);
            })
    }, []);


    // Default markers
    const DefaultCustomMarkers=(()=>
            <>
                <MarkerClusterGroup
                    chunkedLoading
                    maxClusterRadius={100}
                >
                {trees.map((marker) => {
                    const lat = marker.point.coordinates[1]
                    const lng = marker.point.coordinates[0]
                    const name = marker.common_name

                    return (
                        <Marker position={[lat,lng]} key={marker.wam_id} icon={iconTree} autoPanOnFocus={false}>
                            <Tooltip>
                                {name} <br/>
                                <Typography variant="p" sx={{color:'blue'}}>Click for more info</Typography>
                            </Tooltip>
                            <Popup>
                                {name}
                            </Popup>
                        </Marker>
                    )})}
                </MarkerClusterGroup>
            </>

    )


    return (
        <>
            <Button onClick={()=>setDay(!day)}>Change mode</Button>
            <MapContainer center={defaultCenter} scrollWheelZoom={true} zoom={14}>
                {day ?
                    <DayMap/>
                    :
                    <NightMap/>
                }
                {trees &&
                        <DefaultCustomMarkers/>
                }
            </MapContainer>
        </>
    )
}

export default MapLeaflet