import "./map.css";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import Leaflet  from "leaflet";
import { enterprise } from "../../config/types";


const markerIcon =new Leaflet.Icon({
  iconUrl:"https://icon-library.com/images/marker-icon/marker-icon-16.jpg",
  iconSize:[45,45]
})

const Map= (props:{enterprise:enterprise}) => {

  let latlngs: [number, number] = [
    52.232222, 21.008333
  ]
  if(props.enterprise.longitude&&props.enterprise.latitude){
    latlngs=[props.enterprise.longitude, props.enterprise.latitude]
  }


// const [latlngs, setLatlngs] = useState<[number, number]>([props.enterprise.longitude, props.enterprise.latitude]);

  const propMap={
    center:latlngs,
    zoom:13 ,
    scrollWheelZoom:true
  }
  return (
    <MapContainer {...propMap} >
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={latlngs} icon={markerIcon}>
        <Popup>

          {props.enterprise.name}
          {props.enterprise.city}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;


// var latlngs: [number, number][] = [
//   [45.51, -122.68],
//   [37.77, -122.43],
//   [34.04, -118.2]
// ]; to many
