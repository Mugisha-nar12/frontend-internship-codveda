import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getFacilitiesByDistrict } from "../api/healthService";

const DistrictsPage = () => {
  const [districts, setDistricts] = useState({});
  const [expandedDistrict, setExpandedDistrict] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getFacilitiesByDistrict();
      setDistricts(data || {});
    })();
  }, []);

  const toggleDistrict = (district) => {
    if (expandedDistrict === district) {
      setExpandedDistrict(null);
    } else {
      setExpandedDistrict(district);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Districts</h2>
        <p className="text-sm text-gray-600 mb-6">
          Select a district to view available facilities grouped by type.
        </p>

        <div className="space-y-4">
          {Object.keys(districts).map((district) => (
            <div
              key={district}
              className="bg-white rounded-lg shadow border border-gray-100"
            >
              <button
                onClick={() => toggleDistrict(district)}
                className="w-full text-left p-4 focus:outline-none"
              >
                <div className="text-lg font-medium text-gray-800">
                  {district}
                </div>
              </button>
              {expandedDistrict === district && (
                <div className="p-4 border-t border-gray-200">
                  <ul>
                    {districts[district].map((facility, index) => (
                      <li key={index} className="mb-2 text-blue-700">
                        <p className="font-semibold">{facility.name}</p>
                        <p className="text-sm text-gray-600">{facility.type}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DistrictsPage;
