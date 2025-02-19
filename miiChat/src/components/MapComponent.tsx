import { APIProvider, Map } from "@vis.gl/react-google-maps";
import DefaultAvatar from "../../src/assets/images/default-notion.png";
import AdvancedMarkerComponent from "./AdvancedMarker";
import ChatModal from "./ChatModal";
import { useEffect, useState } from "react";
import {
  deactivateHotspot,
  getActiveHotspots,
  IHotspot,
} from "../services/hotspot.service";
import { useAuth } from "../context/authContext";

const center = {
  lat: 45.497406,
  lng: -73.577102,
};

export default function MapComponent() {
  const [activeHotspots, setActiveHotspots] = useState<IHotspot[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentActiveHotspot, setCurrentActiveHotspot] =
    useState<IHotspot | null>(null);
  const onClose = () => {
    setIsOpen(false);
  };
  const { user } = useAuth();

  const handleMarkerClick = (hotspot: IHotspot) => {
    if (!user) return;
    setIsOpen(true);
    setCurrentActiveHotspot(hotspot);
    console.log(hotspot);
  };

  useEffect(() => {
    const fetchHotspots = async () => {
      const hotspots = await getActiveHotspots();
      console.log("Fetched Active Hotspots:", hotspots);
      setActiveHotspots(hotspots);

      hotspots.forEach((hotspot) => {
        const expiryDate = new Date(hotspot.expiryDate); // Convert to Date object
        const now = new Date();

        if (expiryDate < now) {
          console.log("Deactivating expired hotspot:", hotspot.hotSpotID);
          deactivateHotspot(hotspot.hotSpotID);
        }
      });
    };

    fetchHotspots();
    const interval = setInterval(fetchHotspots, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <APIProvider apiKey={"AIzaSyBGruP6k6Ypxn3TuP0JgUKPuahFwjuzSDI"}>
        <Map
          mapId="bd0a5137f1023dfc"
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={center}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {activeHotspots.map((hotspot) => (
            <AdvancedMarkerComponent
              key={hotspot.hotSpotID}
              position={{
                lat: hotspot.coordinates[0],
                lng: hotspot.coordinates[1],
              }}
              imageSrc={hotspot.backgroundImg || DefaultAvatar}
              onClick={() => handleMarkerClick(hotspot)}
            />
          ))}
        </Map>
      </APIProvider>
      {currentActiveHotspot && (
        <ChatModal
          isOpen={isOpen}
          onClose={onClose}
          currentHotspot={currentActiveHotspot}
        />
      )}
    </div>
  );
}
