import { useEffect, useState } from "react";
import { Marker, Polyline } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import { Car, MapPin, Flag } from "lucide-react";
import { renderToString } from "react-dom/server";

const carIcon = L.divIcon({
  html: renderToString(
    <Car size={24} className="text-gray-700 fill-gray-700" />,
  ),
  className: "custom-car-icon",
  iconSize: [24, 24],
});

const startIcon = L.divIcon({
  html: renderToString(
    <div className="bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">
      A
    </div>,
  ),
  className: "start-icon",
  iconSize: [32, 32],
});

const endIcon = L.divIcon({
  html: renderToString(
    <div className="bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-white">
      B
    </div>,
  ),
  className: "end-icon",
  iconSize: [32, 32],
});

export const RouteNavigator = ({ start, end, speed = 500 }) => {
  const [route, setRoute] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRoute = async () => {
      const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
      const res = await axios.get(url);
      setRoute(
        res.data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]),
      );
    };
    fetchRoute();
  }, [start, end]);

  useEffect(() => {
    if (route.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < route.length - 1 ? prev + 1 : 0));
    }, speed);
    return () => clearInterval(interval);
  }, [route, speed]);

  if (route.length === 0) return null;

  return (
    <>
      <Polyline
        positions={route}
        color="#3b82f6"
        weight={5}
        opacity={0.5}
        dashArray="10, 10"
      />
      <Marker position={start} icon={startIcon} />
      <Marker position={end} icon={endIcon} />
      //Carrito
      <Marker position={route[currentIndex]} icon={carIcon} />
    </>
  );
};
