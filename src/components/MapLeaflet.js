import {MapContainer, Marker, Popup, TileLayer,Tooltip} from 'react-leaflet'
import {useEffect, useState} from "react";
import axios from "axios";
import customMarker from './assets/tree-color-icon.svg';
import L from 'leaflet';
import {Typography, useMediaQuery, useTheme} from "@mui/material";
import MarkerClusterGroup from "react-leaflet-cluster";

// Custom Icon
const iconTree = new L.Icon({
    iconUrl: customMarker,
    iconRetinaUrl: customMarker,
    iconAnchor: [0, 0],
    popupAnchor: [-0, -0],
    iconSize: [30],
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

function MapLeaflet (props) {
    const defaultCenter = [51.041394, -114.063579];
    const [trees, setTrees] = useState();
    const theme = useTheme();
    const display = useMediaQuery(theme.breakpoints.down('sm'));
    const day = props.day

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
                    {trees.map((marker) => (
                        <Marker position={[marker.point.coordinates[1],marker.point.coordinates[0]]} key={marker.wam_id} icon={iconTree} autoPanOnFocus={false}>
                            {!display &&
                                <Tooltip>
                                    {marker.common_name} <br/>
                                    <Typography variant="p" sx={{color:'blue'}}>Click for more info</Typography>
                                </Tooltip>
                            }
                            <Popup>
                                <strong>COMMON NAME:</strong> {marker.common_name}<br/>
                                {marker.species &&
                                    <>
                                        <strong>SPECIES:</strong>  {marker.species}<br/>
                                    </>
                                }
                                <strong>LOCATION:</strong> {marker.location_detail}<br/>
                                <strong>SIZE:</strong> {marker.mature_size}<br/>
                                <strong>RATING:</strong> {marker.rating}<br/>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </>
    )

        return (
            <>
                <MapContainer center={defaultCenter} scrollWheelZoom={true} zoom={14} wheelPxPerZoomLevel={100}>
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