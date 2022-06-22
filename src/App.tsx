import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet";
import "leaflet-editable";
import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [map, setMap] = useState<any>(null);
  const [geometry, setGeometry] = useState();
  useEffect(() => {
    if (geometry) console.log(geometry);
  }, [geometry]);

  return (
    <MapContainer
      id="map"
      center={[55, -122]}
      zoom={5}
      scrollWheelZoom={false}
      editable={true}
      zoomControl={false}
      whenCreated={setMap}
    >
      <ZoomControl position="bottomleft" />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/*map && <DrawControl map={map} setGeometry={setGeometry} />*/}
      {geometry && <GeoJSON data={geometry[0]} key={Math.random()} />}
    </MapContainer>
  );
}
