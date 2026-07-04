import { RouteNavigator } from "@/features/shipping/components/map/route-navigator";
import { MapContainer, TileLayer } from "react-leaflet";

export const VehicleMap = () => {
  const paucarpata = [-16.4215, -71.5065];
  const cayma = [-16.3824, -71.5435];

  return (
    <MapContainer center={[-16.4, -71.52]} zoom={13} className="w-full h-full">
      <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"/>
      <RouteNavigator start={paucarpata} end={cayma} speed={1500} />
    </MapContainer>
  );
};
