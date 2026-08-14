// src/pages/NearbyPharmacy.jsx
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./NearbyPharmacy.css";

// Routing machine
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Fix missing marker icons (Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
  iconSize: [35, 35],
});

const pharmacyIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1483/1483336.png",
  iconSize: [32, 32],
});

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function NearbyPharmacy() {
  const [pharmacies, setPharmacies] = useState([]);
  const [userPos, setUserPos] = useState(null);

  const mapRef = useRef(null);
  const routingRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        console.log("Location denied — using fallback.");
        setUserPos({
          lat: 12.9141,
          lng: 74.8560,
        });
      }
    );

    fetch(`${API}/pharmacies`)
      .then((res) => res.json())
      .then((data) => setPharmacies(data || []))
      .catch((err) => {
        console.error("Failed to load pharmacies:", err);
      });
  }, []);

  // Distance calculator
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return (
      R *
      2 *
      Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    );
  }

  // Routing function
  function showRoute(destLat, destLng) {
    if (!mapRef.current || !userPos) return;

    // Remove previous route
    if (routingRef.current) {
      routingRef.current.remove();
    }

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(userPos.lat, userPos.lng),
        L.latLng(destLat, destLng),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 5 }],
      },
      draggableWaypoints: false,
      addWaypoints: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
    }).addTo(mapRef.current);
  }

  if (!userPos) {
    return <p style={{ padding: 20 }}>Loading map…</p>;
  }

  return (
    <div className="nearby-wrapper">
      <h2 className="page-title">Nearest Stores</h2>

      <div className="layout">
        {/* LEFT LIST */}
        <div className="pharmacy-list">
          {pharmacies.map((p) => (
            <div
              key={p._id}
              className="pharmacy-card"
              onClick={() =>
                p.location &&
                showRoute(
                  p.location.lat,
                  p.location.lng
                )
              }
            >
              <h4>{p.name}</h4>

              <p>{p.address}</p>

              <p
                style={{
                  marginTop: 8,
                  fontWeight: 700,
                }}
              >
                Distance:{" "}
                {p.location
                  ? `${getDistance(
                      userPos.lat,
                      userPos.lng,
                      p.location.lat,
                      p.location.lng
                    ).toFixed(2)} km`
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT MAP */}
        <div className="map-box">
          <MapContainer
            center={[
              userPos.lat,
              userPos.lng,
            ]}
            zoom={13}
            style={{
              height: "100%",
              width: "100%",
            }}
            whenCreated={(map) =>
              (mapRef.current = map)
            }
          >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* User marker */}
            <Marker
              position={[
                userPos.lat,
                userPos.lng,
              ]}
              icon={userIcon}
            >
              <Popup>You are here</Popup>
            </Marker>

            {/* Pharmacy markers */}
            {pharmacies.map(
              (p) =>
                p.location && (
                  <Marker
                    key={p._id}
                    position={[
                      p.location.lat,
                      p.location.lng,
                    ]}
                    icon={pharmacyIcon}
                  >
                    <Popup>
                      <b>{p.name}</b>
                      <br />
                      {p.address}
                    </Popup>
                  </Marker>
                )
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}