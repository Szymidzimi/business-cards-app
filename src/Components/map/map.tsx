import "./map.css";
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import Leaflet  from "leaflet";

// type Props = {

//     _id: number;
//     name: string;
//     city: string;

// };

const markerIcon =new Leaflet.Icon({
  iconUrl:"https://icon-library.com/images/marker-icon/marker-icon-16.jpg",
  iconSize:[45,45]
})

const Map= (props:any) => {

//   const latlngs: [number, number] = [
//     props.lon, props.lat
// ];

const [latlngs, setLatlngs] = useState<[number, number]>([50.901111, 19.028889]);

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
      <Marker position={[50.901111, 19.028889]} icon={markerIcon}>
        <Popup>
          {props.lon}
          {props.lat}
          {props.name}
          {props.city}
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
