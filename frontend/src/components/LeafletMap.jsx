import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const LeafletMap = ({ lat, lng, name, city }) => {
  const latitude = Number(lat) || 20.5937;
  const longitude = Number(lng) || 78.9629;

  return (
    <MapContainer center={[latitude, longitude]} zoom={Number(lat) && Number(lng) ? 14 : 5} className="h-80 w-full rounded-lg">
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={icon}>
        <Popup>
          <strong>{name}</strong><br />{city}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
