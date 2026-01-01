import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getDistricts } from "../api/healthService";

const DistrictsPage = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    (async () => {
      const list = await getDistricts();
      setDistricts(list || []);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Districts</h2>
        <p className="text-sm text-gray-600 mb-6">
          Select a district to view available facilities grouped by type.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {districts.map((d) => (
            <Link
              key={d}
              to={`/district/${encodeURIComponent(d)}`}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md border border-gray-100"
            >
              <div className="text-lg font-medium text-gray-800">{d}</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DistrictsPage;
