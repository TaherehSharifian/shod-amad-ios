// ProfileUserLocation.tsx
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  AttributionControl,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";

interface ProfileUserLocationProps {
  center: LatLngTuple;
  zoom?: number;
  onLocationChange?: (coords: LatLngTuple) => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapController: React.FC<{ center: LatLngTuple; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    const t = setTimeout(() => {
      try {
        map.invalidateSize();
      } catch {}
    }, 100);
    return () => clearTimeout(t);
  }, [center, zoom, map]);
  return null;
};

const LocationPicker: React.FC<{
  onSelect: (coords: LatLngTuple) => void;
}> = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      const coords: LatLngTuple = [e.latlng.lat, e.latlng.lng];
      onSelect(coords);
    },
  });
  return null;
};

const ProfileUserLocation: React.FC<ProfileUserLocationProps> = ({
  center,
  zoom = 15,
  onLocationChange,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [selectedCoords, setSelectedCoords] = useState<LatLngTuple>(center);

  useEffect(() => {
    setSelectedCoords(center);
  }, [center]);

  const handleSelectNewCoords = (coords: LatLngTuple) => {
    setSelectedCoords(coords);
  };

  const handleConfirm = () => {
    if (onLocationChange) onLocationChange(selectedCoords);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`w-full h-60 rounded-2xl overflow-hidden shadow-sm border border-gray-200 cursor-pointer ${
          isModalOpen ? "invisible pointer-events-none" : ""
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        <MapContainer
          className="w-full h-full"
          zoomControl={false}
          attributionControl={true}
        >
          <MapController center={selectedCoords} zoom={zoom} />
          <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
          <Marker position={selectedCoords} icon={customIcon} />
          <AttributionControl
            position="bottomright"
            prefix='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          />
          <ZoomControl position="topright" />
        </MapContainer>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={{ zIndex: 99999 }}
            className="fixed inset-0 bg-white flex flex-col h-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* هدر */}
            <div className="flex gap-4 items-center p-4 border-b">
              <button onClick={() => setIsModalOpen(false)}>
                <ArrowForward />
              </button>
              <h2 className="text-lg font-semibold">ویرایش محل سکونت</h2>
            </div>

            {/* Map */}
            <div className="flex-1 relative w-full h-full">
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] 
                bg-white/80 text-gray-800 text-xs px-3 py-1 rounded-lg backdrop-blur 
                inline-flex whitespace-nowrap"
              >
                نقشه را برای انتخاب محل جدید جا به جا کنید.
              </div>

              <MapContainer
                className="w-full h-full"
                center={selectedCoords}
                zoom={zoom}
              >
                <MapController center={selectedCoords} zoom={zoom} />
                <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
                <Marker position={selectedCoords} icon={customIcon} />
                <LocationPicker onSelect={handleSelectNewCoords} />
                <ZoomControl position="topright" />
              </MapContainer>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-secondary-main text-white rounded-lg transition hover:bg-secondary-dark w-full md:w-auto"
              >
                تایید موقعیت
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileUserLocation;
