import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchResults from "../components/SearchResults";
import MapView from "../components/MapView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // If there is no navigation state, redirect to home immediately
  if (!location.state) return <Navigate to="/" replace />;

  const results = location.state?.results || [];
  const query = location.state?.query;

  const showMap = location.state?.showMap;
  const [googleAvailable, setGoogleAvailable] = useState(null);
  const googleKey = import.meta.env.VITE_GOOGLE_MAPS_KEY || null;
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    // Only attempt to detect Google Maps if a key is provided and this is a text search
    if (!query || showMap) return;
    if (!googleKey) {
      setGoogleAvailable(false);
      return;
    }

    let timer;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleAvailable(true);
      clearTimeout(timer);
    };
    script.onerror = () => {
      setGoogleAvailable(false);
      clearTimeout(timer);
    };
    document.body.appendChild(script);
    // fallback after 3s
    timer = setTimeout(() => {
      if (googleAvailable === null) setGoogleAvailable(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [query, showMap, googleKey]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </Link>
          <div className="text-gray-600">{results.length} results</div>
        </div>

        {/* If this search used proximity/full data, show the Leaflet map. */}
        {showMap ? (
          <div className="mb-6">
            <MapView facilities={results} />
          </div>
        ) : null}

        {/* If user searched by text (query) and we don't have a Leaflet map, show a Google Maps embed for the query */}
        {!showMap && query ? (
          <div className="mb-6">
            <div className="w-full h-80 rounded-lg overflow-hidden shadow">
              {googleAvailable ? (
                <iframe
                  title="Google Maps Search"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    query
                  )}&z=14&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              ) : (
                // fallback to OpenStreetMap embed which supports query search
                <iframe
                  title="OpenStreetMap Search"
                  src={`https://www.openstreetmap.org/export/embed.html?query=${encodeURIComponent(
                    query
                  )}&layer=mapnik`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              )}
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={showMap ? "lg:col-span-2" : "lg:col-span-3"}>
            <SearchResults
              results={results}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>
          {showMap && (
            <div className="lg:col-span-1">
              <MapView facilities={results} selectedId={selectedId} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
