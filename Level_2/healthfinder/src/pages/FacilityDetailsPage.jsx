import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapView from "../components/MapView";
import { getFacilityById } from "../api/healthService";
import {
  getSavedFacilities,
  isSaved,
  saveFacility,
  removeFacility,
} from "../utils/bookmarks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";

const FacilityDetailsPage = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getFacilityById(id).then((f) => setFacility(f));
    setSaved(isSaved(id));
  }, [id]);

  const toggleSave = () => {
    if (!facility) return;
    if (isSaved(facility.id)) {
      removeFacility(facility.id);
      setSaved(false);
    } else {
      saveFacility(facility);
      setSaved(true);
    }
  };

  if (!facility) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-12">Loading...</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Link
          to="/search"
          className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to
          results
        </Link>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{facility.name}</h2>
              <div className="text-sm text-gray-600 mb-1">{facility.type}</div>
              <div className="text-sm text-gray-600">
                {facility.address}, {facility.city}
              </div>
            </div>
            <div>
              <button
                onClick={toggleSave}
                className={`px-3 py-2 rounded-md ${
                  saved
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faStar} className="mr-2" />{" "}
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <MapView facilities={[facility]} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FacilityDetailsPage;
