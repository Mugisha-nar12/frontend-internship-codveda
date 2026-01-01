import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import { getFacilities } from "../api/healthService";
import fallbackFacilities from "../data/facilities";
import { haversineDistance } from "../utils/geo";

const HomePage = () => {
  const navigate = useNavigate();
  const [apiAlive, setApiAlive] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ok = await import("../api/healthService").then((m) =>
          m.pingApi()
        );
        if (mounted) setApiAlive(!!ok);
      } catch (e) {
        if (mounted) setApiAlive(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const handleSearch = async (searchParams) => {
    // Request full records when searching by proximity so we have lat/lon
    const needFull = !!(
      searchParams.near &&
      searchParams.near.lat &&
      searchParams.near.lon
    );
    const results = await getFacilities(
      searchParams.city,
      searchParams.type,
      searchParams.term,
      needFull
    );

    // If proximity search, compute distance and sort by nearest
    let enriched = results;
    if (needFull) {
      enriched = enriched
        .map((r) => ({
          ...r,
          distanceKm:
            r.latitude && r.longitude
              ? haversineDistance(
                  searchParams.near.lat,
                  searchParams.near.lon,
                  r.latitude,
                  r.longitude
                )
              : null,
        }))
        .sort((a, b) => {
          if (a.distanceKm == null) return 1;
          if (b.distanceKm == null) return -1;
          return a.distanceKm - b.distanceKm;
        });
    }

    let resultsToSend = enriched.filter((r) =>
      String(r.name)
        .toLowerCase()
        .includes((searchParams.term || "").toLowerCase())
    );

    // If no results from API, try local fallback dataset
    if (
      (!resultsToSend || resultsToSend.length === 0) &&
      (searchParams.term || "").trim()
    ) {
      const q = (searchParams.term || "").toLowerCase();
      const local = fallbackFacilities.filter(
        (f) =>
          String(f.name).toLowerCase().includes(q) ||
          String(f.address).toLowerCase().includes(q) ||
          String(f.city || "")
            .toLowerCase()
            .includes(q)
      );
      // Map to same shape used by results (keep lat/lon for map when available)
      resultsToSend = local.map((f) => ({ ...f }));
    }

    navigate("/search", {
      state: {
        results: resultsToSend,
        query: searchParams.term || searchParams.type || searchParams.city,
        showMap: needFull,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      {!apiAlive && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <div className="font-medium">Backend unreachable</div>
          <div className="text-sm">
            Using local fallback data; some features may be limited.
          </div>
        </div>
      )}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Find Trusted Health Services Near You
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Easily locate clinics, vaccination centers, and hospitals across
            Rwanda — search by name, type, or location.
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="mt-16">
          <Categories />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
