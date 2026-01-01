import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  getSavedFacilities,
  isSaved,
  saveFacility,
  removeFacility,
} from "../utils/bookmarks";

const SearchResults = ({ results, onRemove, onSelect }) => {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    setSavedIds(getSavedFacilities().map((f) => String(f.id)));
  }, [results]);

  const toggleSave = (item) => {
    if (isSaved(item.id)) {
      removeFacility(item.id);
    } else {
      saveFacility(item);
    }
    setSavedIds(getSavedFacilities().map((f) => String(f.id)));
  };

  if (!results || results.length === 0) {
    return (
      <div className="text-center">
        <p className="text-gray-600 mb-4">
          No results found. Try a different search.
        </p>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result) => (
        <div
          key={result.id}
          onClick={() => onSelect && onSelect(result.id)}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
        >
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                  <Link
                    to={`/facility/${result.id}`}
                    className="hover:underline"
                  >
                    {result.name}
                  </Link>
                </h3>
                <div className="text-sm text-gray-600">{result.address}</div>
                {/* optional extra info if available */}
                {result.city && (
                  <div className="text-sm text-gray-500 mt-1">
                    {result.city}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end">
                <button
                  onClick={() => toggleSave(result)}
                  className={`${
                    savedIds.includes(String(result.id))
                      ? "text-yellow-500"
                      : "text-gray-400"
                  } hover:text-yellow-500 p-2 rounded-full`}
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
                {onRemove && (
                  <button
                    onClick={() => onRemove(result.id)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded-md bg-red-50"
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" /> Remove
                  </button>
                )}
                {result.type && (
                  <span className="mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {result.type}
                  </span>
                )}
              </div>
            </div>

            {/* distance if provided by caller */}
            {result.distanceKm != null && (
              <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-2 text-gray-400"
                  />
                  <span>{result.address}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {result.distanceKm < 1
                    ? `${Math.round(result.distanceKm * 1000)} m`
                    : `${result.distanceKm.toFixed(1)} km`}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
