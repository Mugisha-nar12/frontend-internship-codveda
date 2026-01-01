import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getFacilitiesByDistrict } from "../api/healthService";
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

const DistrictPage = () => {
  const { district } = useParams();
  const [grouped, setGrouped] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getFacilitiesByDistrict(decodeURIComponent(district));
      setGrouped(data);
    })();
  }, [district]);

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
          <h2 className="text-2xl font-bold">{decodeURIComponent(district)}</h2>
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

export default DistrictPage;
