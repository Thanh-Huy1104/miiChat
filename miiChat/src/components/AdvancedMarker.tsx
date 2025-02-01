import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface AdvancedMarkerProps {
  position: google.maps.LatLngLiteral;
  imageSrc: string;
  onClick: () => void;
}

export default function AdvancedMarkerComponent({
  position,
  imageSrc,
  onClick,
}: AdvancedMarkerProps) {
  return (
    <AdvancedMarker position={position} onClick={onClick}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        <img
          className="w-12 h-12 rounded-full border-4 border-white shadow-md"
          src={imageSrc}
          alt="Marker"
        />
      </div>
    </AdvancedMarker>
  );
}