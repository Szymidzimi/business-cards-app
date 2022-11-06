import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import 'leaflet-geosearch/dist/geosearch.css';

const SearchControl = (props: any) => {
  
    const map = useMap();

    useEffect(() => {
        const searchControl = GeoSearchControl({
          style: 'bar',
          provider: props.provider,
          ...props
        });
        map.addControl(searchControl);
        return function cleanup(){ map.removeControl(searchControl)};
      }, [map, props.provider, props]);
  return null;
};
export default SearchControl;
