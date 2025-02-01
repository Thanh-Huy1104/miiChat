import { APIProvider, Map } from "@vis.gl/react-google-maps";
import DefaultAvatar from "../../src/assets/images/default-notion.png";
import AdvancedMarkerComponent from "./AdvancedMarker";
import ChatModal from "./ChatModal";
import { useState } from "react";

const center = {
  lat: 45.497406,
  lng: -73.577102,
};

const spots = [
  {
    id: 1,
    name: "Concordia University",
    lat: 45.497406,
    lng: -73.577102,
    votes: 0,
    category: "Education",
    description: "A public research university in downtown Montreal known for its diverse student body and innovative programs.",
  },
  {
    id: 2,
    name: "McGill University",
    lat: 45.5048,
    lng: -73.5772,
    votes: 0,
    category: "Education",
    description: "One of Canada's top universities, located in the heart of Montreal with a rich history and prestigious reputation.",
  },
  {
    id: 3,
    name: "Old Port of Montreal",
    lat: 45.5075,
    lng: -73.5544,
    votes: 0,
    category: "Tourist Attraction",
    description: "A historic waterfront with cobblestone streets, cafes, and scenic views of the St. Lawrence River.",
  },
  {
    id: 4,
    name: "Mount Royal Park",
    lat: 45.5070,
    lng: -73.5878,
    votes: 0,
    category: "Park",
    description: "A large green space designed by Frederick Law Olmsted, offering hiking trails, viewpoints, and outdoor activities.",
  },
  {
    id: 5,
    name: "Notre-Dame Basilica",
    lat: 45.5043,
    lng: -73.5561,
    votes: 0,
    category: "Historic Site",
    description: "A stunning Gothic Revival church in Old Montreal, known for its impressive architecture and light shows.",
  },
  {
    id: 6,
    name: "Biodome",
    lat: 45.5600,
    lng: -73.5512,
    votes: 0,
    category: "Museum",
    description: "An indoor zoo and botanical garden featuring replicas of four distinct ecosystems found in the Americas.",
  },
  {
    id: 7,
    name: "Jean-Talon Market",
    lat: 45.5356,
    lng: -73.6144,
    votes: 0,
    category: "Market",
    description: "A bustling farmers' market offering fresh produce, baked goods, and international foods.",
  },
  {
    id: 8,
    name: "Bell Centre",
    lat: 45.4960,
    lng: -73.5693,
    votes: 0,
    category: "Entertainment",
    description: "The home arena of the Montreal Canadiens, hosting concerts, sports events, and major performances.",
  },
  {
    id: 9,
    name: "La Ronde",
    lat: 45.5219,
    lng: -73.5342,
    votes: 0,
    category: "Amusement Park",
    description: "A Six Flags amusement park featuring roller coasters, family rides, and seasonal events like Fright Fest.",
  },
  {
    id: 10,
    name: "Saint Joseph's Oratory",
    lat: 45.4919,
    lng: -73.6185,
    votes: 0,
    category: "Religious Site",
    description: "One of the largest churches in Canada, offering stunning architecture and a panoramic view of Montreal.",
  },
  {
    id: 11,
    name: "Montreal Museum of Fine Arts",
    lat: 45.4994,
    lng: -73.5792,
    votes: 0,
    category: "Museum",
    description: "A world-class museum featuring fine arts, contemporary works, and rotating exhibitions.",
  },
  {
    id: 12,
    name: "Atwater Market",
    lat: 45.4785,
    lng: -73.5792,
    votes: 0,
    category: "Market",
    description: "A popular public market known for its fresh produce, gourmet shops, and specialty cheese vendors.",
  },
  {
    id: 13,
    name: "Lachine Canal",
    lat: 45.4544,
    lng: -73.5986,
    votes: 0,
    category: "Park",
    description: "A scenic canal with bike paths, picnic areas, and boat rentals for a relaxing outdoor experience.",
  },
  {
    id: 14,
    name: "Montreal Science Centre",
    lat: 45.5034,
    lng: -73.5530,
    votes: 0,
    category: "Museum",
    description: "An interactive science museum with exhibits on technology, space, and innovation.",
  },
  {
    id: 15,
    name: "Quartier des Spectacles",
    lat: 45.5086,
    lng: -73.5658,
    votes: 0,
    category: "Entertainment",
    description: "Montreal’s cultural district, hosting festivals, concerts, and live performances year-round.",
  },
  {
    id: 16,
    name: "Olympic Stadium",
    lat: 45.5590,
    lng: -73.5514,
    votes: 0,
    category: "Historic Site",
    description: "A landmark from the 1976 Olympics, now used for sports events, concerts, and exhibitions.",
  },
  {
    id: 17,
    name: "Plateau Mont-Royal",
    lat: 45.5260,
    lng: -73.5804,
    votes: 0,
    category: "Neighborhood",
    description: "A trendy neighborhood known for its colorful murals, local boutiques, and vibrant nightlife.",
  },
  {
    id: 18,
    name: "Bota Bota Spa",
    lat: 45.5021,
    lng: -73.5549,
    votes: 0,
    category: "Spa",
    description: "A floating spa on the St. Lawrence River, offering relaxation with a view of the city skyline.",
  },
  {
    id: 19,
    name: "Pointe-à-Callière Museum",
    lat: 45.5031,
    lng: -73.5535,
    votes: 0,
    category: "Museum",
    description: "Montreal’s archaeology and history museum, featuring artifacts from the city's early days.",
  },
  {
    id: 20,
    name: "Underground City",
    lat: 45.5017,
    lng: -73.5673,
    votes: 0,
    category: "Shopping",
    description: "A vast network of underground malls, restaurants, and pathways connecting downtown Montreal.",
  },
];

export default function MapComponent({}) {
  const handleMarkerClick = (spot) => {
    setIsOpen(true);
    setCurrentHotspot(spot);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [currentHotspot, setCurrentHotspot] = useState("");
  const onClose = () => {

  }
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
          {spots.map((spot) => (
            <AdvancedMarkerComponent
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              imageSrc={DefaultAvatar}
              onClick={() => handleMarkerClick(spot)}
            />
          ))}
        </Map>
      </APIProvider>
      <ChatModal isOpen={isOpen} onClose={onClose} currentHotspot={currentHotspot} />
    </div>

  );
  
}
