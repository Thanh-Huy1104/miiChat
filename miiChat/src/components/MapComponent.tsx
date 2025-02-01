import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MapStyle from "../../src/assets/mapstyles/mapStyle.json";
const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 45.497406,
  lng: -73.577102,
};

const spots = [
  { id: 1, name: "Spot A", lat: 45.497406, lng: -73.577102, votes: 0 },
];

export default function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBGruP6k6Ypxn3TuP0JgUKPuahFwjuzSDI">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={{
          styles: MapStyle,
          disableDefaultUI: true,
          draggingCursor: "pointer",
        }}
      >
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            onClick={() => {}}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
