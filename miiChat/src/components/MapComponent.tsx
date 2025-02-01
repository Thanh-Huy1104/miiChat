import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MapStyle from "../../src/assets/mapstyles/mapStyle.json";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

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
    <APIProvider apiKey={"AIzaSyBGruP6k6Ypxn3TuP0JgUKPuahFwjuzSDI"}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={center}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        styles={MapStyle}
      >
        {spots.map((spot) => (
          <Marker key={spot.id} position={{ lat: spot.lat, lng: spot.lng }} />
        ))}
      </Map>
    </APIProvider>
  );
}
