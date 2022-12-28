import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "./mapFromAdd.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

interface dataFromMapProps {
  setDataFromMap: React.Dispatch<any>;
}

const SearchControl = (props: any) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = GeoSearchControl({
      notFoundMessage: "Sorry, that address could not be found.",
      style: "bar",
      provider: props.provider,
      // resultFormat: (result: any) => result.label,
      ...props,
    });
    map.addControl(searchControl);
    return function cleanup() {
      map.removeControl(searchControl);
    };
  }, [map, props.provider, props]);
  return null;
};

const MapFromAdd = ({ setDataFromMap }: dataFromMapProps) => {
  const prov = new OpenStreetMapProvider(
    {
      params: {
        countrycodes: "pl",
        amenity:"village",
        limit:5,
               // 'accept-language': 'pl',
        // addressdetails: 1,
        type:'administrative'
      },
    }
  );

  return (
    <MapContainer center={[ 52.232222, 21.008333]} zoom={7}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <SearchControl
        provider={prov}
        showMarker={true}
        showPopup={false}
        popupFormat={({ query, result }: { query: any; result: any }) => {
          console.log(query, result);
          console.log(prov);
          setDataFromMap(result);
          return `${result.label}`;
        }}

        maxMarkers={3}
        retainZoomLevel={false}
        animateZoom={true}
        autoClose={false}
        searchLabel={"Enter address, please"}
        keepResult={true}
      />
    </MapContainer>
  );
};

export default MapFromAdd;
