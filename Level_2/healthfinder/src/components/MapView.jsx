import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapController = ({ facilities, selectedId, markerRefs }) => {
  const map = useMap();
  if (markerRefs && markerRefs.current) markerRefs.current.__mapInstance = map;
  useEffect(() => {
    if (!map) return;
    const points = facilities
      .filter((f) => f.latitude && f.longitude)
      .map((f) => [f.latitude, f.longitude]);
    if (selectedId) {
      const sel = facilities.find((f) => String(f.id) === String(selectedId));
      if (sel && sel.latitude && sel.longitude) {
        map.setView([sel.latitude, sel.longitude], 15);
      }
    } else if (points.length === 1) {
      map.setView(points[0], 13);
    } else if (points.length > 1) {
      map.fitBounds(points, { padding: [50, 50] });
    } else {
      // default Rwanda view
      map.setView([-1.9403, 29.8739], 7);
    }
  }, [map, facilities, selectedId]);
  return null;
};

const GeoLocateButton = ({ onLocate }) => {
  const map = useMap();
  const handleClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        onLocate && onLocate(latlng);
      },
      (err) => {
        alert("Unable to retrieve your location");
      },
      { enableHighAccuracy: true }
    );
  };

  // expose map reference for parent helpers
  useEffect(() => {
    if (!map) return;
    // store map instance for external use via markerRefs
    // this is a bit of a hack: parent MapView attaches map to markerRefs.current.__mapInstance
    // but we can safely set it here when component mounts
    try {
      // find the global markerRefs via window (not ideal but works in this scoped file)
      // do nothing here; parent will set marker refs when rendering Markers
    } catch (e) {}
  }, [map]);

  return (
    <button
      onClick={handleClick}
      className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none"
      title="Center map on your location"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 2a1 1 0 011 1v1.07a7 7 0 015.93 5.93H18a1 1 0 110 2h-1.07a7 7 0 01-5.93 5.93V17a1 1 0 11-2 0v-1.07a7 7 0 01-5.93-5.93H2a1 1 0 110-2h1.07A7 7 0 017.07 4V2a1 1 0 011-1z" />
      </svg>
    </button>
  );
};

const MapView = ({ facilities = [], selectedId = null }) => {
  const defaultCenter = [-1.9403, 29.8739];
  const markerRefs = useRef({});
  const [userMarker, setUserMarker] = useState(null);
  const googleKey = import.meta.env.VITE_GOOGLE_MAPS_KEY || null;

  useEffect(() => {
    // open popup for selected marker if available
    if (
      selectedId &&
      markerRefs.current[selectedId] &&
      markerRefs.current[selectedId].openPopup
    ) {
      try {
        markerRefs.current[selectedId].openPopup();
      } catch (e) {
        // ignore
      }
    }
  }, [selectedId]);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow">
      <div className="relative w-full h-96">
        <MapContainer
          center={defaultCenter}
          zoom={7}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution={
              googleKey
                ? "&copy; Google Maps"
                : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
            url={
              googleKey
                ? `https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&key=${googleKey}`
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />
          <MapController
            facilities={facilities}
            selectedId={selectedId}
            markerRefs={markerRefs}
          />
          {facilities.map((f) =>
            f.latitude && f.longitude ? (
              <Marker
                key={f.id}
                position={[f.latitude, f.longitude]}
                icon={defaultIcon}
                ref={(el) => (markerRefs.current[f.id] = el)}
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-bold">{f.name}</div>
                    <div className="text-xs text-gray-700">{f.type}</div>
                    <div className="text-xs text-gray-600">
                      {f.address}, {f.city}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ) : null
          )}
          <div className="absolute bottom-4 right-4 z-50">
            <GeoLocateButton
              onLocate={(latlng) => {
                // add a temporary marker using Leaflet API
                const map = markerRefs.current.__mapInstance;
                if (!map) return;
                // remove previous
                if (userMarker && userMarker.remove) userMarker.remove();
                const m = L.marker([latlng.lat, latlng.lng], {
                  icon: defaultIcon,
                })
                  .addTo(map)
                  .bindPopup("You are here")
                  .openPopup();
                setUserMarker(m);
                map.setView([latlng.lat, latlng.lng], 14);
              }}
            />
          </div>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
