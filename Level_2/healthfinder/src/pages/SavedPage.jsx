import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchResults from "../components/SearchResults";
import { getSavedFacilities, removeFacility } from "../utils/bookmarks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const SavedPage = () => {
  const [saved, setSaved] = useState(getSavedFacilities());
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFacility(id);
    setSaved(getSavedFacilities());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-black" />
              Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-3 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2 text-blue-600" />
              Home
            </button>
            <button
              onClick={() =>
                navigate("/search", {
                  state: { results: saved, query: "Saved", showMap: false },
                })
              }
              className="px-3 py-2 bg-white border rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
            >
              <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-950" />
              View on Map
            </button>
          </div>
          <h2 className="text-2xl font-bold text-blue-800">Saved Facilities</h2>
        </div>

        {saved.length === 0 ? (
          <div className="text-gray-600">No saved facilities yet.</div>
        ) : (
          <div className="space-y-6">
            <SearchResults results={saved} onRemove={handleRemove} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SavedPage;
