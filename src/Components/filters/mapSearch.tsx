import { useCallback, useEffect, useMemo, useState } from "react";
import "../map/map.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";

const markerIcon = new Leaflet.Icon({
  iconUrl: "https://icon-library.com/images/marker-icon/marker-icon-16.jpg",
  iconSize: [45, 45],
});

const center: [number, number] = [52.232222, 21.008333];
const zoom = 13;

const DisplayPosition = ({ map, setPositionToDisplay }: any) => {
  const [position, setPosition] = useState(() => map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
    setPositionToDisplay(map.getCenter());
  }, [map, setPositionToDisplay]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <div className="flex-butt">
      <button className="button-reset" onClick={onClick}>
        reset
      </button>
    </div>
  );
}

const MapSearch = ({ setLatLng }: any) => {
  const [map, setMap] = useState<any>(null);
  const [positionToDisplay, setPositionToDisplay] = useState(center);

  const propMap = {
    center: center,
    zoom: 13,
    scrollWheelZoom: true,
  };

  const displayMap = useMemo(
    () => (
      <MapContainer {...propMap} ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionToDisplay} icon={markerIcon}></Marker>
      </MapContainer>
    ),
    [positionToDisplay, setLatLng(positionToDisplay)]
  );

  return (
    <div>
      {map ? (
        <DisplayPosition
          map={map}
          setPositionToDisplay={setPositionToDisplay}
        />
      ) : null}
      <div className="map-in-modal">{displayMap}</div>
    </div>
  );
}

export default MapSearch;
