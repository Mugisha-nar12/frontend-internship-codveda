import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllFacilitiesGrouped } from "../api/healthService";
import SearchResults from "../components/SearchResults";

const order = [
  "District Hospital",
  "Referral Hospital",
  "Private Hospital",
  "Public Hospital",
  "Health Center",
  "Maternity Center",
  "Polyclinic",
  "Vaccination Center",
  "Other",
];

const AllDistrictsPage = () => {
  const [grouped, setGrouped] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await getAllFacilitiesGrouped();
      setGrouped(data);
      let count = 0;
      order.forEach((cat) => {
        count += (data[cat] || []).length;
      });
      setTotalCount(count);
    })();
  }, []);

  if (!grouped) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-8">Loading…</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/districts" className="text-blue-600 hover:underline">
            ← Back to districts
          </Link>
          <h2 className="text-2xl font-bold">All Health Facilities</h2>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-gray-700">
            Showing all <strong>{totalCount}</strong> health facilities across
            Rwanda, organized by type.
          </p>
        </div>

        {order.map((cat) => (
          <section key={cat} className="mb-8">
            <h3 className="text-xl font-semibold mb-3">
              {cat} ({(grouped[cat] || []).length})
            </h3>
            {(grouped[cat] || []).length === 0 ? (
              <div className="text-sm text-gray-500">
                No {cat.toLowerCase()} listed.
              </div>
            ) : (
              <SearchResults results={grouped[cat]} />
            )}
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default AllDistrictsPage;
